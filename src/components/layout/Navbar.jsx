import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useScrollTrigger,
  Container,
  useTheme,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { title: 'Home', path: '/' },
  { title: 'About', path: '/about' },
  { title: 'Ventures', path: '/ventures' },
  { title: 'Approach', path: '/approach' },
  { title: 'Contact', path: '/contact' }
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navbarStyle = {
    backgroundColor: isScrolled ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 1)',
    backdropFilter: isScrolled ? 'blur(10px)' : 'none',
    boxShadow: isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.2)' : 'none',
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  const logoStyle = {
    height: isScrolled ? '70px' : '80px',
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        height: '100%',
        backgroundColor: 'background.paper',
        padding: '20px'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <IconButton edge="end" onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.title}
            component={RouterLink}
            to={item.path}
            sx={{
              color: location.pathname === item.path ? 'primary.main' : 'text.primary',
              '&:hover': { color: 'primary.main' }
            }}
          >
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="fixed" sx={navbarStyle} elevation={0}>
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: { xs: '70px', md: '80px' } }}>
          <RouterLink to="/">
            <motion.img
              src="https://i.postimg.cc/pT2JMYVx/chiheisen-4x2-light.png"
              alt="Chiheisen Holdings"
              style={logoStyle}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
          </RouterLink>

          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {navItems.map((item) => (
                <Button
                  key={item.title}
                  component={RouterLink}
                  to={item.path}
                  sx={{
                    color: location.pathname === item.path ? 'primary.main' : (isScrolled ? 'text.primary' : 'white'),
                    '&:hover': { 
                      color: 'primary.main',
                      transform: 'translateY(-2px)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    background: 'linear-gradient(to bottom, #cccccc 0%, #ffffff 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  {item.title}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: '100%', maxWidth: '300px' }
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;