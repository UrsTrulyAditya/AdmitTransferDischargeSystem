import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Dashboard from "./Dashboard";
import Header from "../Header";
import Footer from "../Footer";
import DisplayPatients from "./DisplayPatients";
import RoomComponent from "./RoomComponent";
import { CircularProgress } from '@material-ui/core'
import { checkToken, checkUser } from "../../utils/common";
import AdminHeader from "./AdminHeader";
import appStore from "../../Store/store";
import PatientRequests from "./PatientRequestsTable";
import { getAdmissionByEmail } from "../../Api/api";
// import { BiGroup } from "react-icons/bi";
import { MdGroups2 } from "react-icons/md";


const drawerWidth = 240;
const drawerHeight = 70;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "80vh",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    height: '80%',
    marginTop: 65,
    border: '5px solid #f5f5f5'
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: 60,
  },
}));

function AdminDashboard() {
  const classes = useStyles();
  const [activePage, setActivePage] = useState("Home");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();



  React.useEffect(() => {
    spinner();
    const isTokenPresent = checkToken();
    if (!isTokenPresent) {
      navigate('/');
    }
    checkUser("Admin");
  }, [navigate]);

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log('hello')
    navigate('/');
  };
  const renderPage = () => {
    switch (activePage) {
      case "Home":
        return <Dashboard />;
      case "Patient Details":
        return <div><DisplayPatients /></div>;
      case "Patient Requests":
        return <div><PatientRequests /></div>;
      case "Rooms":
        return <div><RoomComponent /></div>;
      default:
        return <div>Invalid Page</div>;
    }
  };

  const spinner = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1100);
  }

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className={classes.root} >
      <AdminHeader />
      <div style={{ width: '90%', display: 'flex', zIndex: 1 }} >
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          style={{ width: '25vw' }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <List>
              <ListItem
                button
                onClick={() => handlePageChange("Home")}
                selected={activePage === "Home"}
              >
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem
                button
                onClick={() => handlePageChange("Patient Details")}
                selected={activePage === "Patient Details"}
              >
                <ListItemIcon>
                  {/* <AssignmentIndIcon /> */}
                  <MdGroups2 fontSize={25} />

                </ListItemIcon>
                <ListItemText primary="Patient Details" />
              </ListItem>
              <ListItem
                button
                onClick={() => handlePageChange("Patient Requests")}
                selected={activePage === "Patient Requests"}
              >
                <ListItemIcon>
                  <AssignmentIndIcon />
                </ListItemIcon>
                <ListItemText primary="Patient Requests" />
              </ListItem>
              <ListItem
                button
                onClick={() => handlePageChange("Rooms")}
                selected={activePage === "Rooms"}
              >
                <ListItemIcon>
                  <MeetingRoomIcon />
                </ListItemIcon>
                <ListItemText primary="Rooms" />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" onClick={handleLogout} />
              </ListItem>
            </List>
          </div>
        </Drawer>
        <main className={classes.content} style={{ width: '75vw' }}>
          {renderPage()}
        </main>
      </div>
      <footer className={classes.footer} >
        {/* <Footer /> */}
      </footer>
    </div>
  );
}

export default AdminDashboard;