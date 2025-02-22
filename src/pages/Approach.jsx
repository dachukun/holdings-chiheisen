import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Approach = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const approaches = [
    {
      title: 'Strategic Investment',
      description: 'We take a long-term view in our investments, focusing on ventures that have the potential to transform industries and create lasting impact.'
    },
    {
      title: 'Active Partnership',
      description: 'Beyond capital, we provide strategic guidance, operational expertise, and access to our global network of industry leaders.'
    },
    {
      title: 'Innovation Focus',
      description: 'We seek out disruptive technologies and innovative business models that can scale globally and create sustainable competitive advantages.'
    },
    {
      title: 'Value Creation',
      description: 'Our hands-on approach helps portfolio companies accelerate growth, optimize operations, and maximize long-term value creation.'
    }
  ];

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
            Our Approach
          </Typography>
        </motion.div>

        <Grid container spacing={4} ref={ref}>
          {approaches.map((approach, index) => (
            <Grid item xs={12} md={6} key={approach.title}>
              <motion.div
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    backgroundColor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider'
                  }}
                >
                  <Typography variant="h4" gutterBottom sx={{ background: 'linear-gradient(to bottom, #ffffff 0%, #cccccc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {approach.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ background: 'linear-gradient(to bottom, #ffffff 0%, #cccccc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {approach.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Approach;