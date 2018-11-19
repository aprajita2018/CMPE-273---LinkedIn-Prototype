import React,{Component} from 'react';
import './LandingPage.css';
import NavBar from '../NavBar/NavBar';

class LandingPage extends Component{
    constructor(props){
        super(props);

        this.state = {
            fname: '',
            lname: '',
            phone: '',
            email: '',
            password: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        const values = {
            ...this.state
        };
        this.props.signup(values, (res) => {
            if(res.status === "SUCCESS"){
                console.log("Successfully created user!");
                document.getElementById("success_text").innerHTML = "Your account is created!";
                document.getElementById("success_snackbar").style.setProperty('display', 'block'); 
                setTimeout(() => {
                    document.getElementById("success_snackbar").style.setProperty('display', 'none');
                }, 2000);
            }
            else{
                console.log("Err in creating the user profile.");
                document.getElementById("alert_text").innerHTML = "ERROR: Could not create your account.";
                document.getElementById("alert_snackbar").style.setProperty('display', 'block');
                setTimeout(() => {
                    document.getElementById("alert_snackbar").style.setProperty('display', 'none');
                }, 2000);
            }
        });
    }
    render(){
        return(
            <div>
                <NavBar />
                <header className="masthead d-flex">
                    <div className="container my-auto bg-transparent">
                        <div className="row">
                            <div className='col-md-6 offset-md-3 col-lg-4 offset-lg-4 d-flex justify-content-center p-0 bg-white'>
                                <form id='regForm' onSubmit={this.onSubmit} className="w-100">

                                    <h3 className='text-center'>Be great at what you do</h3>
                                    <h4 className='font-weight-light text-center'>Get started - it's free</h4>                                     
                                    
                                    <div className='bg-light mx-0 p-2'>
                                        
                                        <div className='form-group'>
                                            <label for='input-firstname'>First Name</label>
                                            <input type='text' className="form-control" id="input-firstname" name='input-firstname' aria-required='true' />
                                        </div>
                                        
                                        <div className='form-group'>
                                            <label for='input-lastname'>Last Name</label>
                                            <input type='text' className='form-control' id='input-lastname' name='input-lastname' aria-required='true' />
                                        </div>
                                        
                                        <div className='form-group'>
                                            <label for='input-email'>Email</label>
                                            <input type='email' className='form-control' id='input-email' name='input-email' aria-required='true' />
                                        </div>
                                        
                                        <div className='form-group'>
                                            <label for='input-password'>Password(6 or more characters)</label>
                                            <input type='password' className='form-control' id='input-password' name='input-password' aria-required='true' />
                                        </div>
                                        <span className='font-weight-light text-center'>
                                            <small>By clicking Join now, you agree to the LinkedIn <br/> User Agreement, Privacy Policy, and Cookie Policy.</small>
                                        </span>
                                        <div className='my-2'>
                                            <button type='submit' className='btn btn-primary w-100'>Join Now</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-10 mx-auto">
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}
export default LandingPage;