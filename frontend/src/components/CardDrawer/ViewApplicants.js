import React, { Component } from 'react';
import '../../App.css';
// import '../../drawer.css'
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PeopleSearch from '../Search/PeopleSearch';
import ApplicantCard from '../Cards/ApplicantCard';
import PersonProfile from '../Jobopen/ApplicantProfile';
import Navbar from '../NavBar/NavBar';

class PeopleDrawer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            applicants: '',
            applicants_list: [],
            tosendapplicantcard: '',
            cardsin: false
        }
        this.searchPeople = this.searchPeople.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.routeTo = this.routeTo.bind(this);
    }

    componentWillMount() {
        this.setState({
            authFlag: false
        })

    }

    searchPeople = (e) => {
        const applicants = {
            applicants: this.state.applicants
        }
        console.log("Form Data", applicants);
        e.preventDefault();

        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3001/viewapplicants', { params: applicants })
            //also send counters with axios on a different route 
            .then(response => {
                console.log("Status Code : ", response);
                if (response.status === 200) {
                    this.setState({
                        applicants_list: this.state.applicants_list.concat(response.data.people),
                        authFlag: true
                    });
                    //window.location = '/travellerlogin'
                } else {

                }
            });
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    routeTo = (e) => {
        console.log("in clicked");

        console.log("hello i am e " + e);
        console.log(this.state.applicants_list[e])
        this.setState({
            tosendapplicantcard: e,
            cardsin: true
        })

    };

    handleClick = (evt) => {
        console.log("in clicked out");
        console.log(this.props);
    }

    render() {

        let peoplelist = null;
        if (this.state.authFlag == true) {
            var arr = Object.values(this.state.applicants_list);
            console.log(arr)

            console.log(this.state.applicants_list.length)
            var elements = [];
            console.log(arr.length)
            for (var i = 0; i < arr.length; i++) {

                elements.push(<ApplicantCard id={i} props={arr[i]} onClick={this.routeTo} />);

            }
        }


        return (

            <div>
                <Navbar/>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">

                    {peoplelist}
                    <div class="col">
                        <input type="text" class="form-control" name="applicants" placeholder="Person Name"
                            value={this.state.applicants}
                            onChange={this.handleChange('applicants')}
                        />
                    </div>

                    <button class="btn btn-primary my-2 my-sm-0" type="submit" onClick={this.searchPeople}>Search</button>

                </nav>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-6 listing-block">
                            {elements}
                        </div>
                        <div class="col-md-6 listing-block">
                            <PersonProfile props={this.state.applicants_list[this.state.tosendapplicantcard]} />
                            {/* {elements} */}
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}


export default PeopleDrawer;