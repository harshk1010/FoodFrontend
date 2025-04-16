// import React from 'react';
// import {
//   Box,
//   Container,
//   Typography,
//   Link,
//   Grid,
//   IconButton,
// } from '@mui/material';
// import { Facebook, Instagram, Twitter, LinkedIn } from '@mui/icons-material';

// const Footer = () => {
//   return (
//     <Box
//       component="footer"
//       sx={{
//         backgroundColor: '#f5f5f5',
//         py: 4,
//         mt: 5,
//         borderTop: '1px solid #ddd',
//       }}
//     >
//       <Container maxWidth="lg">
//         <Grid container spacing={4} justifyContent="space-between">
//           {/* Logo & Info */}
//           <Grid item xs={12} sm={6} md={4}>
//             <Typography variant="h6" fontWeight="bold" gutterBottom>
//               FoodiesApp
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Explore your favorite restaurants. Share your taste, love your food!
//             </Typography>
//           </Grid>

//           {/* Quick Links */}
//           <Grid item xs={12} sm={6} md={4}>
//             <Typography variant="h6" fontWeight="bold" gutterBottom>
//               Quick Links
//             </Typography>
//             <Box>
//               <Link href="/about" color="text.secondary" underline="hover" display="block" mb={0.5}>
//                 About
//               </Link>
//               <Link href="/contact" color="text.secondary" underline="hover" display="block" mb={0.5}>
//                 Contact
//               </Link>
//               <Link href="/terms" color="text.secondary" underline="hover" display="block" mb={0.5}>
//                 Terms of Service
//               </Link>
//               <Link href="/privacy" color="text.secondary" underline="hover" display="block">
//                 Privacy Policy
//               </Link>
//             </Box>
//           </Grid>

//           {/* Social Media */}
//           <Grid item xs={12} sm={12} md={4}>
//             <Typography variant="h6" fontWeight="bold" gutterBottom>
//               Follow Us
//             </Typography>
//             <Box>
//               <IconButton href="https://facebook.com" target="_blank" color="inherit">
//                 <Facebook />
//               </IconButton>
//               <IconButton href="https://instagram.com" target="_blank" color="inherit">
//                 <Instagram />
//               </IconButton>
//               <IconButton href="https://twitter.com" target="_blank" color="inherit">
//                 <Twitter />
//               </IconButton>
//               <IconButton href="https://linkedin.com" target="_blank" color="inherit">
//                 <LinkedIn />
//               </IconButton>
//             </Box>
//           </Grid>
//         </Grid>

//         {/* Bottom Line */}
//         <Box mt={4} textAlign="center">
//           <Typography variant="body2" color="text.secondary">
//             © {new Date().getFullYear()} FoodiesApp. All rights reserved.
//           </Typography>
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default Footer;

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  Grid,
  IconButton,
} from '@mui/material';
import { Facebook, Instagram, Twitter, LinkedIn } from '@mui/icons-material';
import { Button } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#0d1117",
        color: "#e6edf3",
        py: 4,
        mt: 5,
        borderTop: "1px solid #161b22",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Logo & Info */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{ color: "#ff7f50" }}
            >
              H.K. FOOD
            </Typography>
            <Typography variant="body2" sx={{ color: "#8b949e" }}>
              Explore your favorite restaurants. Share your taste, love your
              food!
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Quick Links
            </Typography>
            <Box>
              {/* <Link href="/about" underline="hover" display="block" mb={0.5} sx={{ color: '#8b949e' }}>
                About
              </Link>
              <Link href="/contact" underline="hover" display="block" mb={0.5} sx={{ color: '#8b949e' }}>
                Contact
              </Link>
              <Link href="/terms" underline="hover" display="block" mb={0.5} sx={{ color: '#8b949e' }}>
                Terms of Service
              </Link>
              <Link href="/privacy" underline="hover" display="block" sx={{ color: '#8b949e' }}>
                Privacy Policy
              </Link> */}
              <Button
                disableRipple
                variant="text"
                sx={{
                  color: "#8b949e",
                  textTransform: "none",
                  padding: 0,
                  justifyContent: "flex-start",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "#e6edf3",
                  },
                  display: "block",
                  mb: 0.5,
                }}
              >
                About
              </Button>

              <Button
                disableRipple
                variant="text"
                sx={{
                  color: "#8b949e",
                  textTransform: "none",
                  padding: 0,
                  justifyContent: "flex-start",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "#e6edf3",
                  },
                  display: "block",
                  mb: 0.5,
                }}
              >
                Contact
              </Button>

              <Button
                disableRipple
                variant="text"
                sx={{
                  color: "#8b949e",
                  textTransform: "none",
                  padding: 0,
                  justifyContent: "flex-start",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "#e6edf3",
                  },
                  display: "block",
                  mb: 0.5,
                }}
              >
                Terms of Service
              </Button>

              <Button
                disableRipple
                variant="text"
                sx={{
                  color: "#8b949e",
                  textTransform: "none",
                  padding: 0,
                  justifyContent: "flex-start",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "#e6edf3",
                  },
                  display: "block",
                }}
              >
                Privacy Policy
              </Button>
            </Box>
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} sm={12} md={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <IconButton
                href="https://facebook.com"
                target="_blank"
                sx={{ color: "#e6edf3" }}
              >
                <Facebook />
              </IconButton>
              <IconButton
                href="https://instagram.com"
                target="_blank"
                sx={{ color: "#e6edf3" }}
              >
                <Instagram />
              </IconButton>
              <IconButton
                href="https://twitter.com"
                target="_blank"
                sx={{ color: "#e6edf3" }}
              >
                <Twitter />
              </IconButton>
              <IconButton
                href="https://linkedin.com"
                target="_blank"
                sx={{ color: "#e6edf3" }}
              >
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Line */}
        <Box mt={4} textAlign="center">
          <Typography variant="body2" sx={{ color: "#8b949e" }}>
            © {new Date().getFullYear()} H.K. FOOD. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
