import React from 'react';
import { Box, Container, Typography, Grid, TextField, Button, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const Contact = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [formState, setFormState] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const [formErrors, setFormErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState(null);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const contactInfo = [
    {
      icon: LocationOnIcon,
      title: 'Visit Us',
      details: 'Coimbatore, Tamil Nadu, India'
    },
    {
      icon: EmailIcon,
      title: 'Email Us',
      details: 'darshanlgkrish124@gmail.com'
    }
  ];

  const validateForm = () => {
    const errors = {};
    if (!formState.firstName.trim()) errors.firstName = 'First name is required';
    if (!formState.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formState.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formState.email)) {
      errors.email = 'Invalid email address';
    }
    if (!formState.message.trim()) errors.message = 'Message is required';
    return errors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Here you would typically make an API call to your backend
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus('success');
      setFormState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
      });
      setFormErrors({});
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ py: 12 }} component="section" aria-label="Contact section">
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
            sx={{ mb: 6, textAlign: 'center' }}
          >
            Contact Us
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
              <Typography variant="h4" gutterBottom>
                Get in Touch
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 4 }}>
                We're here to help and answer any questions you might have. We look forward to hearing from you.
              </Typography>

              <Grid container spacing={4}>
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <Grid item xs={12} key={info.title}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Icon color="primary" sx={{ fontSize: 32 }} aria-hidden="true" />
                        <Box>
                          <Typography variant="h6">{info.title}</Typography>
                          <Typography variant="body1" color="text.secondary">
                            {info.details}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Paper elevation={0} sx={{ p: 4, border: '1px solid', borderColor: 'divider' }}>
                <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name="firstName"
                        label="First Name"
                        value={formState.firstName}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        disabled={isSubmitting}
                        error={!!formErrors.firstName}
                        helperText={formErrors.firstName}
                        aria-describedby={formErrors.firstName ? 'firstName-error' : undefined}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name="lastName"
                        label="Last Name"
                        value={formState.lastName}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        disabled={isSubmitting}
                        error={!!formErrors.lastName}
                        helperText={formErrors.lastName}
                        aria-describedby={formErrors.lastName ? 'lastName-error' : undefined}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="email"
                        label="Email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        type="email"
                        variant="outlined"
                        disabled={isSubmitting}
                        error={!!formErrors.email}
                        helperText={formErrors.email}
                        aria-describedby={formErrors.email ? 'email-error' : undefined}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="message"
                        label="Message"
                        value={formState.message}
                        onChange={handleChange}
                        required
                        multiline
                        rows={4}
                        variant="outlined"
                        disabled={isSubmitting}
                        error={!!formErrors.message}
                        helperText={formErrors.message}
                        aria-describedby={formErrors.message ? 'message-error' : undefined}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        disabled={isSubmitting}
                        aria-label={isSubmitting ? 'Sending message...' : 'Send message'}
                        sx={{
                          mt: 2,
                          position: 'relative',
                          '&.Mui-disabled': {
                            backgroundColor: 'primary.main',
                            opacity: 0.7
                          }
                        }}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                      {submitStatus === 'success' && (
                        <Typography color="success.main" sx={{ mt: 2, textAlign: 'center' }} role="alert">
                          Message sent successfully!
                        </Typography>
                      )}
                      {submitStatus === 'error' && (
                        <Typography color="error.main" sx={{ mt: 2, textAlign: 'center' }} role="alert">
                          Failed to send message. Please try again.
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;