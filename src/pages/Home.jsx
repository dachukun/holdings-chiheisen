import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { Parallax } from 'react-parallax';
import CodeIcon from '@mui/icons-material/Code';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const Home = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const taglines = [
    'Building the Future,\nOne Vision at a Time',
    'Innovating Tomorrow,\nToday',
    'Transforming Ideas,\nInto Reality',
    'Empowering Innovation,\nEnabling Growth',
    'Shaping Technology,\nDefining Progress',
    'Innovating Tomorrow,\nEmpowering Today.',
    'Where Vision Meets\nInnovation.',
    'Pioneering the Next Era\nof Tech.',
    'Shaping Ideas,\nDefining Success.',
    'Limitless Possibilities,\nOne Vision.'
  ];

  useEffect(() => {
    let timer;
    const currentTagline = taglines[currentTaglineIndex];
    const typeSpeed = 100;
    const eraseSpeed = 50;
    const pauseDuration = 2000;
    const dotDuration = 800; // Duration for dot animation

    if (displayText === '' && !isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(currentTagline.substring(0, displayText.length + 1));
      }, dotDuration); // Wait for dot animation before starting to type
    } else if (!isDeleting && displayText !== currentTagline) {
      timer = setTimeout(() => {
        setDisplayText(currentTagline.substring(0, displayText.length + 1));
      }, typeSpeed);
    } else if (isDeleting && displayText !== '') {
      timer = setTimeout(() => {
        setDisplayText(currentTagline.substring(0, displayText.length - 1));
      }, eraseSpeed);
    } else if (!isDeleting && displayText === currentTagline) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentTaglineIndex((prevIndex) => (prevIndex + 1) % taglines.length);
    }

    return () => clearTimeout(timer);
  }, [currentTaglineIndex, displayText, isDeleting, taglines]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const services = [
    {
      title: 'Innovative Ventures',
      description: 'Pioneering breakthrough solutions that shape the future of technology.',
      icon: RocketLaunchIcon
    },
    {
      title: 'Scalable Solutions',
      description: 'Building robust platforms that grow with your business needs.',
      icon: TrendingUpIcon
    },
    {
      title: 'Future-Focused Development',
      description: "Creating tomorrow's technology with cutting-edge development practices.",
      icon: CodeIcon
    }
  ];

  return (
    <Box>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          background: '#000000',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '50%',
            height: '100%',
            opacity: 0.1
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M0,50 Q25,0 50,50 T100,50"
              stroke="#ffffff"
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: 1,
                pathOffset: [0, 1],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear'
                }
              }}
            />
            <motion.path
              d="M0,30 Q35,80 70,30 T100,30"
              stroke="#ffffff"
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: 1,
                pathOffset: [0, 1],
                transition: {
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear'
                }
              }}
            />
            <motion.path
              d="M0,70 Q45,20 90,70 T100,70"
              stroke="#ffffff"
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: 1,
                pathOffset: [0, 1],
                transition: {
                  duration: 5,
                  repeat: Infinity,
                  ease: 'linear'
                }
              }}
            />
          </svg>
        </Box>
        <Container maxWidth="lg">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h1"
              sx={{
                color: 'white',
                textAlign: 'center',
                mb: 8,
                fontWeight: 700
              }}
            >
              <motion.div
                key={currentTaglineIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                sx={{
                  position: 'relative',
                  display: 'inline-block'
                }}
              >
                {displayText === '' && !isDeleting && (
                  <Box
                    component="span"
                    sx={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      display: 'inline-block',
                      marginRight: '4px',
                      animation: 'blink 0.8s step-end 1'
                    }}
                  />
                )}
                {displayText}
                <Box
                  component="span"
                  sx={{
                    position: 'absolute',
                    right: '-4px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    height: '80%',
                    width: '2px',
                    backgroundColor: 'white',
                    animation: 'blink 0.5s step-end infinite'
                  }}
                />
              </motion.div>
              <style>
                {`
                  @keyframes blink {
                    from, to { opacity: 1; }
                    50% { opacity: 0; }
                  }
                `}
              </style>
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Box sx={{ py: 12, backgroundColor: 'background.paper' }} ref={ref}>
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '100%',
            height: '100vh',
            opacity: 0.1,
            pointerEvents: 'none',
            zIndex: 0
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M0,0 Q25,50 50,0 T100,0 M0,100 Q25,50 50,100 T100,100"
              stroke="#ffffff"
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: 1,
                pathOffset: [0, 1],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear'
                }
              }}
            />
          </svg>
        </Box>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Grid item xs={12} md={4} key={service.title}>
                  <motion.div
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    variants={fadeInUp}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <Box
                      sx={{
                        textAlign: 'center',
                        p: 3,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                      }}
                    >
                      <Icon
                        sx={{
                          fontSize: 48,
                          color: 'primary.main',
                          mb: 2
                        }}
                      />
                      <Typography variant="h4" gutterBottom sx={{ background: 'linear-gradient(to bottom, #ffffff 0%, #cccccc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {service.title}
                      </Typography>
                      <Typography variant="body1" sx={{ background: 'linear-gradient(to bottom, #ffffff 0%, #cccccc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {service.description}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: 12, backgroundColor: 'background.paper' }}>
        <Container maxWidth="lg">
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h2"
              sx={{
                background: 'linear-gradient(to bottom, #ffffff 0%, #cccccc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textAlign: 'center',
                mb: 4,
                fontWeight: 700
              }}
            >
              About Us
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center', maxWidth: '800px', mx: 'auto', mb: 8, background: 'linear-gradient(to bottom, #ffffff 0%, #cccccc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              At Chiheisen Holdings, we are dedicated to pioneering breakthrough solutions that shape the future of technology. Our commitment to innovation and excellence drives us to invest in transformative ideas and exceptional teams that are poised to make a lasting impact on the world.
            </Typography>

            <Typography
              variant="h2"
              sx={{
                background: 'linear-gradient(to bottom, #ffffff 0%, #cccccc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textAlign: 'center',
                mb: 4,
                mt: 12,
                fontWeight: 700
              }}
            >
              Our Ventures
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} md={4}>
                <Box sx={{ p: 3, height: '100%', textAlign: 'center' }}>
                  <Typography variant="h4" gutterBottom sx={{ background: 'linear-gradient(to bottom, #ffffff 0%, #cccccc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Nomora
                  </Typography>
                  <Typography variant="body1" sx={{ background: 'linear-gradient(to bottom, #ffffff 0%, #cccccc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    An AI powered travelling app to suggest the best destinations along with best deals and automated trip planner
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>

      <Box sx={{ py: 12, backgroundColor: 'background.paper' }}>
        <Container maxWidth="lg">
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h2"
              sx={{
                background: 'linear-gradient(to bottom, #ffffff 0%, #cccccc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textAlign: 'center',
                mb: 4,
                fontWeight: 700
              }}
            >
              Contact Us
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: 'center',
                maxWidth: '800px',
                mx: 'auto',
                mb: 8,
                background: 'linear-gradient(to bottom, #ffffff 0%, #cccccc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Get in touch with us to learn more about our ventures and explore potential collaborations.
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 8 }}>
              <Button
                variant="outlined"
                size="large"
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/contact'}
                sx={{
                  borderColor: '#ffffff',
                  color: '#ffffff',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease-in-out',
                  background: 'linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                  '&:hover': {
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
                    borderColor: '#ffffff',
                    cursor: 'pointer'
                  }
                }}
              >
                Contact Us
              </Button>
            </Box>

            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} md={8}>
                <Box sx={{ height: '445px', width: '100%' }}>
                  <div className="mapouter">
                    <div className="gmap_canvas">
                      <iframe
                        className="gmap_iframe"
                        width="100%"
                        frameBorder="0"
                        scrolling="no"
                        marginHeight="0"
                        marginWidth="0"
                        src="https://maps.google.com/maps?width=403&amp;height=445&amp;hl=en&amp;q=coimbatore&amp;t=&amp;z=4&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                        style={{ filter: 'grayscale(100%)' }}
                      />
                    </div>
                    <style>
                      {`
                        .mapouter {
                          position: relative;
                          text-align: right;
                          width: 100%;
                          height: 445px;
                        }
                        .gmap_canvas {
                          overflow: hidden;
                          background: none!important;
                          width: 100%;
                          height: 445px;
                        }
                        .gmap_iframe {
                          height: 445px!important;
                        }
                      `}
                    </style>
                  </div>
                </Box>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;