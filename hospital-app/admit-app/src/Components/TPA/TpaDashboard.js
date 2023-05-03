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
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
// import Dashboard from "./Dashboard";
import Header from "../Header";
import Footer from "../Footer";
// import DisplayPatients from "./DisplayPatients";
// import RoomComponent from "./RoomComponent";
import { CircularProgress } from '@material-ui/core'
import { checkToken } from "../../utils/common";
import DashboardTPA from "./DashboardTPA";
import AdminHeader from "../Admin/AdminHeader";
import { getAllDischarges } from "../../Api/getApi";
import DischargeTable from "./DashboardTPA";
import TpaComponent from "./TpaComponent";


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

function TpaDashboard() {
  const classes = useStyles();
  const [activePage, setActivePage] = useState("Home");
  const [loading, setLoading] = useState(true);
  const [dischargeData, setDischargeData] = useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    spinner();
    const getDischarges = async () => {
        try {
          const res = await getAllDischarges();
        //   console.log((res),'data');
          if (res) {
            setDischargeData(res.data);
          }
        } catch (error) {
          console.log(error);
        }
      };
  
      getDischarges();
    const isTokenPresent = checkToken();
    if (!isTokenPresent) {
      navigate('/');
    window.scrollTo(0, 0);

    }
  }, [navigate]);

  const handlePageChange = (page) => {
    setActivePage(page);
    console.log(page);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  const renderPage = () => {
    console.log((activePage,'act'));
    switch (activePage) {
      case "Dashboard":
        return <TpaComponent />;
      case "Discharge":
        return <DischargeTable dischargeData={dischargeData} />;
      default:
        return <TpaComponent />;
    }
  };

  const spinner = () => {
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
      <div style={{ width: '90%', display: 'flex',zIndex: 1 }}>
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
                onClick={() => handlePageChange("Dashboard")}
                selected={activePage === "Dashboard"}
              >
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem
                button
                onClick={() => handlePageChange("Discharge")}
                selected={activePage === "Discharge"}
              >
                <ListItemIcon>
                <ContentPasteSearchIcon />
                </ListItemIcon>
                <ListItemText primary="Discharge" />
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
        <main className={classes.content} style={{ width: '75vw', marginTop:'55px' }}>
            {/* <h1>Discharge Table</h1>
          <DischargeTable dischargeData={dischargeData} /> */}
          {renderPage()}
        </main>
      </div>
      {/* <footer className={classes.footer} >
        <Footer />
      </footer> */}
    </div>
  );
}

export default TpaDashboard;