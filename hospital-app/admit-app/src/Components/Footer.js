import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "#f5f5f5",
    padding: theme.spacing(6),
    height: '155px',
    marginTop: '125px',
    position: 'absolute',
    width: '92vw',
    marginLeft: '5px'
  },
  socialMedia: {
    marginTop: theme.spacing(1),
  },
  socialMediaIcon: {
    marginRight: theme.spacing(2),
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer} style={{ zIndex: 200 }}>
      <Grid container spacing={4} justify="space-evenly">
        <Grid item xs={12} sm={3}>
          <Typography variant="h6" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body2" color="textSecondary">
            HealthSure Hospitals is a leading healthcare provider committed to providing high-quality care to patients. Our hospitals are equipped with the latest medical technology and staffed by experienced and compassionate healthcare professionals.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="h6" gutterBottom>
            Quick Links
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <Link href="#">Home</Link>
            <br />
            <Link href="#">Services</Link>
            <br />
            <Link href="#">About Us</Link>
            <br />
            <Link href="#">Contact Us</Link>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="h6" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body2" color="textSecondary">
            123 Main St, Suite 200
            <br />
            New York, NY 10001
            <br />
            Phone: (123) 456-7890
            <br />
            Email: info@healthcare.com
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="h6" gutterBottom>
            Follow Us
          </Typography>
          <Typography variant="body2" color="textSecondary" className={classes.socialMedia}>
            <IconButton aria-label="Facebook" className={classes.socialMediaIcon}>
              <FacebookIcon />
            </IconButton>
            <IconButton aria-label="Twitter" className={classes.socialMediaIcon}>
              <TwitterIcon />
            </IconButton>
            <IconButton aria-label="LinkedIn" className={classes.socialMediaIcon}>
              <LinkedInIcon />
            </IconButton>
          </Typography>
        </Grid>
      </Grid>
      <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop: '56px' }}>
        © 2023 Healthcare. All rights reserved.
      </Typography>
    </footer>
  );
};

export default Footer;
