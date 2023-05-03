import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import MenuIcon from "@material-ui/core/IconButton";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AdminDashboard from './AdminDashboard';

function AdminHeader() {
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMyAccountClick = () => {
    const prop =
      history('/myaccount');
    handleMenuClose();
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('account');
    history('/');
    handleMenuClose();
  };

  const handleChangePasswordClick = () => {
    history('/changepassword');
    handleMenuClose();
  };

  return (
    <>
      <AppBar position="fixed" color="#ffffff" >
        <Toolbar variant="dense">
          {/* <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton> */}
          {/* <LocalHospitalIcon fontSize="large" /> */}
          {/* <Typography variant="h5" color="inherit" component="div"  >
            <Link to='/admin' style={{ textDecoration: 'none', color: 'inherit' }}>

              <div style={{ fontWeight: 'bold', width: '88vw' }}>
                Health Sure Hospitals
              </div>
            </Link>
          </Typography> */}
          <img style={{marginLeft:'15px'}} width={'60px'} src='http://res.cloudinary.com/daari0y7l/image/upload/v1682171410/IMG_20230422_175501_182_yim1qw.png' />
          <Typography
            variant="h5"
            color="inherit"
            component="div"
            style={{ fontWeight: 'bold', color: '#3d7ba2' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
              <span style={{ fontSize: '22px', color: '#000000', fontWeight: 'bolder' }}>AdmitSure</span>
              {/* <span style={{ fontSize: '15px' }}>Hospitals</span> */}
            </div>
          </Typography>
          <div style={{ marginLeft: 'auto' }}>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <AccountCircle fontSize='large' />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              style={{ marginTop: '35px' }}
            >
              <MenuItem onClick={handleMyAccountClick}>My Account</MenuItem>
              <MenuItem onClick={handleChangePasswordClick}>Change Password</MenuItem>
              <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>


      {/* <AppBar position="fixed" color="#ffffff">
    <Toolbar variant="dense">
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
        </IconButton>
        <LocalHospitalIcon fontSize="large" />
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Typography variant="h5" color="inherit" component="div" style={{ fontWeight: 'bold' }} >
            <span>Health Sure Hospitals</span>
        </Typography>
        </Link>
        <div>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircle />
          </IconButton>
        </div>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMyAccountClick}>My Account</MenuItem>
            <MenuItem onClick={handleChangePasswordClick}>Change Password</MenuItem>
            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
          </Menu>
    </Toolbar>
    </AppBar> */}
    </>
  );
}

export default AdminHeader;
