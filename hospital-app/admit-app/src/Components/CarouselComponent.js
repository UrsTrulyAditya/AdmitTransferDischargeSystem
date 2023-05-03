import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import { Paper } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faDoctor } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
  arrow: {
    cursor: 'pointer',
  },
  carousel: {
    display: 'flex',
    width: '100%',
    overflowX: 'scroll',
    scrollBehavior: 'smooth',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  paper: {
    minWidth: '300px',
    margin: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
  },
}));
const items = [
  {
    image: 'https://www.narayanahealth.org/sites/all/themes/nh_default_theme/images/resize-image/international-patient-services-india-min.jpg',
    title: 'Image 1',
    id: 1
  },
  {
    image: 'image2',
    title: 'Image 2',
    id: 2

  },
  {
    image: 'image3',
    title: 'Image 3',
    id: 3

  },
  {
    image: 'image1',
    title: 'Image 1',
    id: 4

  },
  {
    image: 'image2',
    title: 'Image 2',
    id: 5

  },
  {
    image: 'image3',
    title: 'Image 3',
    id: 6

  },
];

const CarouselComponent = () => {
  const classes = useStyles();
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (scrollAmount) => {
    const carousel = document.getElementById('carousel');
    carousel.scrollBy(scrollAmount, 0);
    setScrollPosition(carousel.scrollLeft);
  };

  const navigate = useNavigate();

  const gotoExtraInfo = (id) => {
    navigate('/moreinfo');
  }

  return (
    <div className={classes.root}>
      <ArrowBackIos
        className={classes.arrow}
        onClick={() => handleScroll(-300)}
        disabled={scrollPosition === 0}
      />
      <div id="carousel" className={classes.carousel}>
        <FontAwesomeIcon icon="fas fa-user-md" size="lg" />
        {items.map(item => (
          <Paper key={item.id} className={classes.paper} onClick={()=>{gotoExtraInfo(item.id)}} style={{ backgroundImage: `url(${item.image})`, }}>
            {item.content}
          </Paper>
        ))}
      </div>
      <ArrowForwardIos
        className={classes.arrow}
        onClick={() => handleScroll(300)}
        disabled={scrollPosition >= ((items.length - 3) * 300)}
      />
    </div>
  );
};

export default CarouselComponent;
