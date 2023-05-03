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
// import Dashboard from "./Dashboard";
import Header from "../Header";
import Footer from "../Footer";
// import DisplayPatients from "./DisplayPatients";
// import RoomComponent from "./RoomComponent";
import { CircularProgress } from '@material-ui/core'
import { checkToken, checkUser } from "../../utils/common";
import PatientAdmissionForm from "./PaientAdmissionForm";
import RoomTransfer from "./RoomTransfer";
import DischargeNotification from "./DischargeNotification";
import AdminHeader from "../Admin/AdminHeader";
import patientStore from "../../Store/patientStore";
import appStore from "../../Store/store";
import NotificationPopup from "./Alert.Notification";
import axios from 'axios';

const drawerWidth = 240;
const drawerHeight = 70;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    // justifyContent:"center",
    // alignItems:"center",
    minHeight: "80vh", 
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    height: '95%',
    marginTop: 60,
    border: '5px solid #f5f5f5'
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    margin:'auto'
  },
}));

function PatientDashboard() {
  const classes = useStyles();
  const [activePage, setActivePage] = useState("Home");
  const [loading, setLoading] = useState(true);
  const [dischargeModal, setDischargeModal] = useState(false);

  const navigate = useNavigate();
 
 
  React.useEffect(() => {
    checkDischarge();
    spinner();
    const isTokenPresent = checkToken();
    if (!isTokenPresent) {
      navigate('/');
    }
    checkUser("Patient");
    window.scrollTo(0, 0);
  }, [navigate]);

  const checkDischarge = async() => {
    // const status= patientStore.globalStatus;
    const user = await axios.get(`http://localhost:8563/admission/${appStore.account.email}`);
  
    // console.log(user.data.status,'11111111111');
    if(user.data.status=="Discharge"){
      setDischargeModal(true);
    }
  }
  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  const renderPage = () => {
    const status = patientStore.globalStatus;

    switch (activePage) {
      case "Home":
        return <PatientAdmissionForm startSpin={()=>setLoading(true)} stopSpin={()=>setLoading(false)} />;
      case "Room":
        return <div> {status!=="Pending" && status!=="Denied" ? <RoomTransfer /> : status =="Denied" ? 'Admission request denied' : <span style={{fontSize:'30px',fontWeight:'bold'}}>Admission still in progress...</span> } </div>;
      case "Discharge":
        return <div> { <DischargeNotification />   } </div>;
      default:
        return <div>Invalid Page</div>;
    }
  };

  const spinner = () => {
    setTimeout(() => {
      setLoading(false);
    }, 1100);
  }

  const dischargeMsg = "Congratulations on your discharge! We hope you feel better soon and have a speedy recovery."

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </div>
    );
  }
  // if(dischargeModal){
  //   return alert(dischargeMsg);
  //   // return <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}><NotificationPopup open={dischargeModal} message={dischargeMsg} severity={"info"} handleClose={()=>setDischargeModal(false)} /></div>
  // }
  return (
    <div className={classes.root} >
      <AdminHeader />
      {dischargeModal && <NotificationPopup open={dischargeModal} message={dischargeMsg} severity={"info"} handleClose={()=>setDischargeModal(false)} />}
          {dischargeModal && setTimeout(() => {
            // alert(dischargeMsg);
            setDischargeModal(false);
          }, 5000)}
            
      <div style={{ width: '90%', display: 'flex',marginTop:'100px',zIndex: 1 }}>
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
                onClick={() => handlePageChange("Room")}
                selected={activePage === "Room"}
              >
                <ListItemIcon>
                  <AssignmentIndIcon />
                </ListItemIcon>
                <ListItemText primary="Room Transfer" />
              </ListItem>
              <ListItem
                button
                onClick={() => handlePageChange("Discharge")}
                selected={activePage === "Discharge"}
              >
                <ListItemIcon>
                  <MeetingRoomIcon />
                </ListItemIcon>
                <ListItemText primary="Discharge Info" />
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

export default PatientDashboard;