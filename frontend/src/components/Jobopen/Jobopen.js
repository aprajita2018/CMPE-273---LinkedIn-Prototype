import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../../drawer.css'
import { TextField, CardActionArea, Icon, Paper, Divider, Grid } from '@material-ui/core';
import SimpleModal from '../SimpleModal/SimpleModal';
import Jobcard from '../Cards/Jobcard';
import EasyApply from '../Apply/EasyApply';
import NormalApply from '../Apply/NormalApply';

const styles = theme => ({
    
    card: {
   
        
        padding:'1%',
        maxWidth:'345',
      
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        
      },
      details: {
       
       
      },
      
      cover: {
        
        height: 150,
        width:150
      },
      controls: {
      
       
       
      },
      title:{
        
          color:' #0077B5',
      },
  });


class Jobopen
 extends Component {
    constructor(){
        super();
        this.state = {
              easy_apply: "false",  
              text:"Description of the job title of the comapy andthe job in general ",
              showModal: false,
              jobtitle:'Test',
              company:'',
              address:'',
              poststatus:'',
              jobdes:'',
              senlevel:'',


        }
       
    }
   
componentDidMount(){
  
  console.log("card in search")
  console.log(this.props)
 

 // console.log(this.props)

}

componentDidUpdate() {
  // Typical usage (don't forget to compare props):
  if(this.props.props!==undefined)
  {
 
    this.state.jobtitle=this.props.props.jobtitle;
    this.state.company=this.props.props.company;
    this.state.address=this.props.props.address;
    this.state.poststatus=this.props.props.poststatus;
    this.state.jobdes=this.props.props.jobdes;
    this.state.easy_apply=this.props.props.easyapply;
    this.state.senlevel=this.props.props.senlevel;
   
    
}

}



handleToggleModal() {
    this.setState({ showModal: !this.state.showModal });
    console.log("in toggle")
}

  

 
         
  

    render(){
      
     console.log(this.state.easy_apply)
  const { classes, theme } = this.props;
  const { showModal } = this.state;
 
  let link = null;
  if(this.state.easy_apply=="true"){
    link=  <button
    type="button"
  className={classes.modalButton}
  
    onClick={() => this.handleToggleModal()}><i class="fa fa-linkedin-square" aria-hidden="true"></i>Easy Apply</button>

  }
  else
  {
    link=<Route render={({ history}) => (
          <button    type="button"    className={classes.modalButton}    onClick={() => { history.push('/normal') }}> <i class="fa fa-linkedin-square" aria-hidden="true"></i> Apply</button>
      )} />
  }

  return (
    <div>
      <Paper className={classes.card} elevation={1}>
      
      
     
      <div className={classes.details}>
      <Grid container spacing={24}>
        <Grid item xs>
        <CardMedia
        className={classes.cover}
        image="https://www.arabianbusiness.com/sites/default/files/styles/full_img/public/images/2017/01/17/apple-logo-rainbow.jpg"
        title="Property"

      />
      </Grid>
      <Grid xs={8}>
          <Typography gutterBottom component="h1" variant="h2" className={classes.title} placement="top">
          {/* {this.props.props.jobtitle} */}
          {this.state.jobtitle}
          {/* <i class="fa fa-thumbs-up" aria-hidden="true" style={{justifyContent: 'flex-end'}}></i> */}
          </Typography>

          <Typography component="h1"   variant="h3" color="black" >
          {this.state.company}
         
          </Typography>
        
       
          <Typography gutterBottom variant="h4" color="textSecondary" >
          {this.state.address}
          </Typography>
         
         
          <Typography  variant="h5" gutterBottom>
          {this.state.poststatus} &nbsp;
           {/* {easyapply} */}
          </Typography>
          <div class="save-button">
            <button>Save</button>
            {/* <button>Apply</button> */}
          {link}
          {showModal &&
          <SimpleModal onCloseRequest={() => this.handleToggleModal()}>
              <EasyApply></EasyApply>
          </SimpleModal>}
                 
            </div>
           <br/>
            </Grid>
          </Grid>
          <br/>
          <hr/>
         
            </div>
            
            <div >
            <Typography gutterBottom variant="h4" color="Primary" >
           Job Description
          </Typography>
            <Typography  variant="h5"  >
            {this.state.jobdes}
          </Typography> 
          <hr/>
          <Typography gutterBottom variant="h4" color="Primary" >
           Job Skills
          </Typography>
            <Typography  variant="h5"  >
            
          </Typography> 
  
         </div>
    
    
      </Paper>
      
    </div>
    
  );

}
}

Jobopen
.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Jobopen
);