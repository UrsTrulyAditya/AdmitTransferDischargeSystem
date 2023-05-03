import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function FaqComponent() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Typography style={{fontSize:'35px', marginBottom:'25px', color: '#000000', fontWeight:'bold'}}>Frequently Asked Questions</Typography>
      <Accordion style={{borderRadius:'8px'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>What are the visiting hours of the hospital?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The visiting hours of the hospital are from 10am to 8pm every day.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion style={{borderRadius:'8px'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>What insurance policies does the hospital accept?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The hospital accepts a wide range of insurance policies including ABC, XYZ and PQR. Please check with our billing department for more information.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion style={{borderRadius:'8px'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography className={classes.heading}>What are the payment options available at the hospital?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The hospital accepts cash, credit/debit cards, and online payments. You can also opt for payment plans in case of large bills.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion style={{borderRadius:'8px'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4a-content"
          id="panel4a-header"
        >
          <Typography className={classes.heading}>What are the facilities available at the hospital?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The hospital offers a wide range of facilities including emergency care, surgery, imaging, laboratory tests, and specialized treatments for various conditions.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion style={{borderRadius:'8px'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5a-content"
          id="panel5a-header"
        >
          <Typography className={classes.heading}>What is the process for booking appointments?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You can book appointments by calling our helpline or by visiting our website. You can also walk in for appointments, but we recommend booking in advance to avoid long waiting times.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
