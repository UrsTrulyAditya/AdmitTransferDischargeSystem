import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CarouselComponent from '../CarouselComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DisplayPatients from '../Admin/DisplayPatients';
import StackedChart from './ChartFile';
import CovidVaccineStatusGraph from '../CovidVaccineChart ';
import { CircularProgress } from '@material-ui/core'
import TodoList from './TodoList'; 

// import PatientList from './PatientsList';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "70vw",
    margin: 'auto',
  },
  media: {
    height: 240,
  },
}));

const Dashboard = () => {
  const [loading, setLoading] = React.useState(true);

  const classes = useStyles();

  React.useEffect(() => {
    spinner();
    window.scrollTo(0, 0);
  }, [])
  
  const spinner = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <>
      <Card className={classes.root}>
        {/* <CarouselComponent /> */}
        <CardMedia
          className={classes.media}
          style={{ height: '70vh' }}
          image="https://res.cloudinary.com/daari0y7l/image/upload/v1682613203/istockphoto-1353357410-612x612_lozlu8.jpg"
          title="HealthSure Hospitals"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            HealthSure Hospital Admin<FontAwesomeIcon icon="fas fa-user-md" size="lg" />
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            HealthSure Hospitals is a world-class medical facility that provides top-quality healthcare services to patients from all over the world. Our team of highly qualified doctors, nurses, and support staff work together to provide personalized care and treatment to each patient.
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet justo vitae orci tincidunt efficitur at vel ipsum. In hac habitasse platea dictumst. Integer vel vestibulum mi. Nulla facilisi. Aliquam erat volutpat. Suspendisse potenti. Proin pellentesque elit ac leo interdum tempor. Cras sagittis tristique metus a efficitur.
          </Typography>
        </CardContent>
      </Card>
      <div style={{marginTop:'55px'}}></div>
      {/* <PatientList /> */}
      {/* <TodoList /> */}
    </>
  );
};

export default Dashboard;
