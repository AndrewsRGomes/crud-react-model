import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'rgb(51, 151, 225)',
    '&:hover': {
        background: "rgb(102, 162, 202)",
     },
    hoverBackgroundColor: 'royalblue',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    
  }
  
});

export default function Btn(props) {
  const classes = useStyles();
  return <Button size={props.size} className={classes.root}> { props.texto }</Button>;
}