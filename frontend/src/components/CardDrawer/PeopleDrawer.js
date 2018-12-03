import React, { Component } from 'react';
import '../../App.css';
// import '../../drawer.css'
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PeopleSearch from '../Search/PeopleSearch';
import PeopleCard from '../Cards/PeopleCard';
import PersonProfile from '../Jobopen/PersonProfile';
import Navbar from '../NavBar/NavBar';
import { BACKEND_HOST } from '../../store/actions/host_config';

class PeopleDrawer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            personname: '',
            person_list: [],
            tosendpersoncard: '',
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
        const personname = {
            personname: this.state.personname
        }
        console.log("Form Data", personname);
        e.preventDefault();

        axios.defaults.withCredentials = true;
        axios.get(BACKEND_HOST + '/searchpeople', { params: personname })
            //also send counters with axios on a different route 
            .then(response => {
                console.log("Status Code : ", response);
                
                if (response.status === 200) {
                    this.setState({
                        person_list: this.state.person_list.concat(response.data.people),
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
        console.log(this.state.person_list[e])
        this.setState({
            tosendpersoncard: e,
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
            var arr = Object.values(this.state.person_list);
            console.log(arr)

            console.log(this.state.person_list.length)
            var elements = [];
            console.log(arr.length)
            for (var i = 0; i < arr.length; i++) {

                elements.push(<PeopleCard id={i} props={arr[i]} onClick={this.routeTo} />);

            }
        }


        return (

            <div>
                <Navbar/>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">

                    {peoplelist}
                    <div class="col">
                        <input type="text" class="form-control" name="PersonName" placeholder="Person Name"
                            value={this.state.personname}
                            onChange={this.handleChange('personname')}
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
                            <PersonProfile props={this.state.person_list[this.state.tosendpersoncard]} />
                            {/* {elements} */}
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}


export default PeopleDrawer;