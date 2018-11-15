import React,{Component} from 'react';
import './NavBar.css';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../actions/users_action';
//import {LOGOUT_USER} from '../../actions/types';

class NavBar extends Component {
    constructor(props){
        super(props);
        this.state={
            theme: "lightPage",
        }
    }
    render() {
        return(
            <div>
            <nav className ={(this.props.location === "landingPage") ? "navbar navbar-expand-sm fixed-top navbar-dark": "navbar navbar-expand-sm fixed-top navbar-light"} id="mainNav" >
                <div className="container">
                    <span className="site-header-logo__link flex-item">
                    <Link to="/">
                        <img alt="LinkedIn logo" className="img-responsive" role="presentation" src={this.state.theme === "darkPage" ? "" : ""} />
                    </Link>
                    </span>
                    <NavBarLoggedIn location={this.props.location} name={this.props.name}  logout={this.props.logout}/>
                </div>
            </nav>
            </div>
        );
    }
}

class NavBarLoggedIn extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: false,
            name: this.props.name,
        }
        const  mapDispatchtoProps = {
            logout
        };

        connect({}, mapDispatchtoProps)(NavBarLoggedIn);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount(){
        if(this.state.name !== ""){
            this.setState({
                isLoggedIn: true,
            });
        }
    }


    componentWillReceiveProps(nextProps){
        if(nextProps.user){
            this.setState({
                user: nextProps.user
            })
        }

        if(nextProps.name){
            this.setState({
                name: nextProps.name
            })
        }
    }

     handleLogout(){
        this.props.logout( () => {
            window.location = "/";
        });
    }

    render(){
        if(this.props.location === 'LandingPage'){
            return null;
        }
        return(
            <div className="float-right">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        {/* <li className="nav-item">
                        <a className="nav-link js-scroll-trigger" href="#about">Trip Boards</a>
                        </li> //TODO: Will implement later */} 
                        {this.state.isLoggedIn === false ?
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="#">Login</a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link to="/travellerLogin"><span className="dropdown-item">Traveller Login</span></Link>
                                <Link to="/ownerLogin"><span className="dropdown-item">Owner Login</span></Link>
                            </div>
                        </li>
                        : 
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="#">{this.state.name}</a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link to="/inbox"><span className="dropdown-item">My Inbox</span></Link>
                                {this.state.user_type === 'owner' ?
                                <Link to="/OwnerProperties"><span className="dropdown-item">My Properties</span></Link>
                                :
                                <Link to="/TravelerTrips"><span className="dropdown-item">My Trips</span></Link>
                                }
                                <Link to="/userProfile"><span className="dropdown-item">Profile</span></Link>
                                <a className="dropdown-item" onClick={this.handleLogout}>Log Out</a>
                            </div>
                        </li>
                        }
                        <li className="nav-item">
                        <a className="nav-link js-scroll-trigger" href="#portfolio">Help</a>
                        </li>
                        <li className="nav-item">
                            <Link to="/pob">
                                <span className={this.props.location === "landingPage" ? "btn btn-info" : "btn btn-outline-info"}>
                                    List your property
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    token: state.users.token,
    user: state.users.user,
    name: state.users.name,
});

export default connect(mapStateToProps, {logout})(NavBar);