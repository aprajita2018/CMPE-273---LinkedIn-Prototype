import React,{Component} from 'react';
import './NavBar.css';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../../actions/user_action';

class NavBar extends Component {
        
    render() {
        return(
            <div>
                <nav className ="navbar navbar-expand-sm" id="mainNav" >
                    <div className="container">
                        <div className="navbar-header">
                            <a className='navbar-brand'><img alt="LinkedIn" className="img-responsive" src="img/navbarLogo.png" height="30px"/></a>
                        </div>
                        <form className="navbar-form navbar-right form-inline">
                            <div className='form-group'>
                                <input type='email'    className='form-control' name='input-email'    placeholder='Email' />
                            </div>
                            <div className='form-group mx-1'>
                                <input type='password' className='form-control' name='input-password' placeholder='Password' />
                            </div>  
                            <button type='submit' className='btn btn-outline-light' onClick={this.props.login}>Sign In</button>
                        </form>
                    </div>                    
                </nav>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    token: state.users.token,
    user: state.users.user,
    name: state.users.name,
    user_type: state.users.user_type
});

export default connect(mapStateToProps, {login})(NavBar);