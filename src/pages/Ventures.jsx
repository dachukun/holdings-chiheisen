import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Ventures = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const ventures = [
    {
      title: 'Tech Innovation',
      description: 'Investing in breakthrough technologies that shape the future of digital transformation.',
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
      width: 1260,
      height: 750
    },
    {
      title: 'Sustainable Solutions',
      description: 'Supporting ventures that drive environmental sustainability and clean technology.',
      image: 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
      width: 1260,
      height: 750
    },
    {
      title: 'AI & Machine Learning',
      description: 'Developing cutting-edge AI solutions and machine learning systems for enterprise applications.',
      image: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
      width: 1260,
      height: 750
    }
  ];

  return (
    <Box sx={{ py: 12 }} component="section" aria-label="Our Ventures">
      <Container maxWidth="lg">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h1"
            gutterBottom
            sx={{ mb: 6, textAlign: 'center', background: 'linear-gradient(to bottom, #ffffff 0%, #cccccc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            Our Ventures
          </Typography>
        </motion.div>

        <Grid container spacing={4} ref={ref}>
          {ventures.map((venture, index) => (
            <Grid item xs={12} md={4} key={venture.title}>
              <motion.div
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  role="article"
                  aria-label={`${venture.title} venture`}
                >
                  <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
                    <LazyLoadImage
                      src={venture.image}
                      alt={`${venture.title} illustration`}
                      effect="blur"
                      width={venture.width}
                      height={venture.height}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h4" gutterBottom component="h2">
                      {venture.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      color="text.secondary" 
                      sx={{ background: 'linear-gradient(to bottom, #ffffff 0%, #cccccc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                    >
                      {venture.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Ventures;