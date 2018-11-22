import React,{Component} from 'react';
import './NavBar.css';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../../store/actions/useraction';

class NavBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn  : false,
            email       : '',
            password    : ''
        }
        this.onChange   = this.onChange.bind(this);
        this.onSubmit   = this.onSubmit.bind(this); 
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e){
        e.preventDefault();
        
        const values = {
            email   : this.state.email,
            password: this.state.password
        }

        this.props.login(values, (res) => {
            console.log(res);
            if(res.status === "SUCCESS"){
                window.location = "/profile";          
            }
            else{
                console.log("Err in login.");
                document.getElementById("alert_text").innerHTML = "ERROR: " + res.message;
                document.getElementById("alert_snackbar").style.setProperty('display', 'block');
                setTimeout(() => {
                    document.getElementById("alert_snackbar").style.setProperty('display', 'none');
                }, 2000)
            }
        })

    }
        
    render() {
        return(
            <div>
                <nav className ="navbar navbar-expand-sm" id="mainNav" >
                    <div className="container d-flex">
                        {/* Landing Page Navbar */}
                        <div className="navbar-header align-middle" style={{display: this.state.isLoggedIn? 'none': 'flex'}}>
                            <a className='navbar-brand'><img alt="LinkedIn" src="img/navbarLogo.png" height="25px"/></a>
                        </div>

                        <form className="navbar-form navbar-right form-inline" style={{display: this.state.isLoggedIn? 'none': 'flex'}} onSubmit={this.onSubmit}>
                            <div className='input-group input-group-sm'>
                                <input type='email'    className='form-control' name='email'    placeholder='Email' value={this.state.email} onChange={this.onChange}/>
                            </div>
                            <div className='input-group input-group-sm mx-2'>
                                <input type='password' className='form-control input-sm' name='password' placeholder='Password' value={this.state.password} onChange={this.onChange} />
                            </div>  
                            <button type='submit' className='btn btn-outline-light btn-sm'>Sign In</button>
                        </form>
                        
                        {/* Logged In Navbar */}
                        <div className="navbar-header" style={{display: this.state.isLoggedIn? 'flex': 'none'}}>
                            <a className='navbar-brand'><img alt="LinkedIn" src="img/loggedinLogo.png" height="30px"/></a>
                        </div>
                        <div className='d-flex justify-content-center' style={{display: this.state.isLoggedIn? 'flex': 'none'}}>
                            <ul className='navbar-nav ml-auto' style={{display: this.state.isLoggedIn? 'flex': 'none'}}>
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
                                            <Link to="/profile"><span className='text-info'>View Profile</span></Link>                                 

                                        </div>
                                        <Link to="/"><span className='dropdown-item text-secondary'>Sign Out</span></Link>                             
                                    </div>
                                </li>
                                <li className='nav-item  mx-4'>
                                    <Link to="/jobpost"><span className='icon-text'><i className="fas fa-file-alt fa-2x"></i><br/>Post Jobs</span></Link>                                 
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

export default connect(null, {login})(NavBar);
