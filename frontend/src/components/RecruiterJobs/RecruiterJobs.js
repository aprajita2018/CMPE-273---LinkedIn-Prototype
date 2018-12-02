import React, {Component} from 'react';
import JobCard from '../JobCard/JobCard';
import NavBar from '../NavBar/NavBar';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import './RecruiterJobs.css';
import {getAllJobs} from '../../store/actions/useraction';

class RecruiterJobs extends Component{

    constructor(props){
        super(props);

        this.state = {
            jobs: [],
            currentjob: {},
        };

        this.handleGetAllJobs = this.handleGetAllJobs.bind(this);
    }

    componentDidMount(){
        this.handleGetAllJobs();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.jobs){
            this.setState({
                jobs: nextProps.jobs
            });
        }
        if(nextProps.currentjob){
            this.setState({
                currentjob: nextProps.currentjob
            });
        }
    }

    handleGetAllJobs(){
        const values = {
            username: this.props.user.email
        };
        this.props.getAllJobs(values, (res) => {

        });
    }


    render(){
        let jobs = this.state.jobs.map((job) => {
            return <JobCard job={job} />
        });
        return(
            <div>
                <NavBar />
                <div className="container search-result-page">
                    <div className="row">
                        <div className="col-sm-6 d-flex flex-column flex-nowrap searched-results border-right">
                            {jobs.length === 0 ? "You have not posted any jobs yet" : jobs}
                        </div>
                        <div className="col-sm-6" id="job_details">
                            <strong>Job Details</strong>
                            {/* //TODO: add details from props */}
                            <div className="job_title text-success my-2">
                                {this.state.currentjob.jobtitle}
                            </div>
                            <div className="d-flex-inline flex-row align-items-left">
                                <Link to="/"><button className="btn btn-info m-2">Edit</button></Link> {/* TODO: This needs to redirect to JobPost after setting poststatus=draft*/}
                            </div>
                            <div className="job_desc">
                                {this.state.currentjob.jobdes}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        token: state.user.token,
        user: state.user.user,
        name: state.user.name,
        user_type: state.user.user_type,
        jobs: state.user.jobs,
        currentjob: state.user.currentjob,
    }    
};

export default connect(mapStateToProps, {getAllJobs})(RecruiterJobs);