import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Box sx={{ py: 12 }}>
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
            About Chiheisen Holdings
          </Typography>
        </motion.div>

        <Grid container spacing={6} ref={ref}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <Typography variant="h4" gutterBottom sx={{ background: 'linear-gradient(to bottom, #ffffff 0%, #cccccc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Our Vision
              </Typography>
              <Typography variant="body1" paragraph sx={{ background: 'linear-gradient(to bottom, #ffffff 0%, #cccccc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                At Chiheisen Holdings, we envision a future where technology and innovation converge to create meaningful impact. Our name, derived from the Japanese word for horizon, represents our commitment to pushing boundaries and exploring new frontiers.
              </Typography>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Typography variant="h4" gutterBottom sx={{ background: 'linear-gradient(to bottom, #ffffff 0%, #cccccc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Our Mission
              </Typography>
              <Typography variant="body1" paragraph sx={{ background: 'linear-gradient(to bottom, #ffffff 0%, #cccccc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                We are dedicated to identifying, nurturing, and scaling transformative technologies that address global challenges. Through strategic investments and partnerships, we aim to build a portfolio of ventures that drive positive change while delivering sustainable growth.
              </Typography>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;