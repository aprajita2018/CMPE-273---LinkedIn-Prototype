import React,{Component} from 'react';
import './NavBar.css';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
//import {login} from '../../actions/user_action';
import * as actions from '../../store/actions/index';

class NavBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: false,
        }
    }
        
    render() {
        return(
            <div>
                <nav className ="navbar navbar-expand-sm" id="mainNav" >
                    <div className="container">
                        {/* Landing Page Navbar */}
                        <div className="navbar-header" style={{display: this.state.isLoggedIn? 'none': 'flex'}}>
                            <a className='navbar-brand'><img alt="LinkedIn" className="img-responsive" src="img/navbarLogo.png" height="25px"/></a>
                        </div>

                        <form className="navbar-form navbar-right form-inline" style={{display: this.state.isLoggedIn? 'none': 'flex'}}>
                            <div className='input-group input-group-sm'>
                                <input type='email'    className='form-control' name='input-email'    placeholder='Email' />
                            </div>
                            <div className='input-group input-group-sm mx-2'>
                                <input type='password' className='form-control input-sm' name='input-password' placeholder='Password' />
                            </div>  
                            <button type='submit' className='btn btn-outline-light btn-sm' onClick={this.props.login}>Sign In</button>
                        </form>
                        
                        {/* Logged In Navbar */}
                        <div className="navbar-header" style={{display: this.state.isLoggedIn? 'flex': 'none'}}>
                            <a className='navbar-brand'><img alt="LinkedIn" className="img-responsive" src="img/loggedinLogo.png" height="30px"/></a>
                        </div>
                        <div className='d-flex justify-content-center' style={{display: this.state.isLoggedIn? 'flex': 'none'}}>
                            <ul className='navbar-nav ml-auto'>
                                <li className='nav-item mx-4'>
                                    <Link to="/"><span className='icon-text'><i className="fas fa-user-friends fa-2x"></i><br/>My Network</span></Link>                                 
                                </li>
                                <li className='nav-item mx-4'>
                                    <Link to="/"><span className='icon-text'><i className="fas fa-briefcase fa-2x"></i><br/>Jobs</span></Link>                                 
                                </li>
                                <li className='nav-item mx-4'>
                                    <Link to="/"><span className='icon-text'><i className="fas fa-envelope fa-2x"></i><br/>Messaging</span></Link>                                 
                                </li>
                                <li className="nav-item mx-4 dropdown">
                                    <a className="dropdown-toggle text-white" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="#">
                                        <img src='img/JaneDoe.png' alt='Profile Pic' height='30' width='30' />
                                        <br/><span className='icon-text '>Me</span> 
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                        <div className='dropdown-item' >
                                            <span><img src='img/JaneDoe.png' alt='profile pic' height='60' width='60' /></span>
                                            <div className='navbar-profile-name'>Profile Name</div>
                                            <div className='navbar-profile-title'>Title</div>
                                            <br/>
                                            <Link to="/"><span className='text-info'>View Profile</span></Link>                                 

                                        </div>
                                        <Link to="/"><span className='dropdown-item text-secondary'>Sign Out</span></Link>                             
                                    </div>
                                </li>
                                <li className='nav-item  mx-4'>
                                    <Link to="/"><span className='icon-text'><i className="fas fa-file-alt fa-2x"></i><br/>Post Jobs</span></Link>                                 
                                </li>

                            </ul>
                        </div>
                    </div>                    
                </nav>
            </div>
        );
    }
}


// const mapStateToProps = state => {
//     return{
//         token: state.login.token,
//         user: state.login.user,
//         name: state.login.name,
//         user_type: state.login.user_type

//     }
    
// };

//export default connect(mapStateToProps, null)(NavBar);
export default NavBar;