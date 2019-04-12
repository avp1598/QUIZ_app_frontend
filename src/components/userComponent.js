import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import {Button} from "reactstrap";
import Test from './testComponent';
import TestForm from './testFormComponent';
import config from '../shared/config';
import Student from './studentComponent';
const url=config["server-api"];

class User extends Component {
    _isMounted = false;

    constructor(props){
        super(props)

        this.state={
            isAuthenticated:null,
            user:null
        }
        this.logout=this.logout.bind(this);
    }

    componentWillMount(){
        this._isMounted = true;
        const token=localStorage.getItem("token");
        //alert(token);
        axios
        .get(`${url}/users/${this.props.user}`,{ headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
            if (this._isMounted){
            this.setState(() => ({
                isAuthenticated:1,
                user:res.data[0]
              }));
            }
        })
        .catch(err => {
            this.setState(() => ({
                isAuthenticated:0
              }));
        });
    }
    componentWillUnmount() {
        this._isMounted = false;
      }

    logout(){
        localStorage.setItem("token","");
        localStorage.setItem("user","");
        this.setState(() => ({
            isAuthenticated:2
          }));
    }
    render() {
        if(this.state.isAuthenticated===0 || this.state.isAuthenticated===2) return(<Redirect to={{
            pathname:'/home',
            state: {auth:this.state.isAuthenticated}
        }}/>)
        return(
            <div className ="row">
                <div className="col-sm-6">
                    Hello {this.props.user}<br/>
                    {this.state.user ? this.state.user.teacher ? <Test/>:<Student/> : null}
                    <Button outline color="danger" onClick={this.logout}>Log-out</Button>
                </div>
                <div className="col-sm-6">
                    {this.state.user ? this.state.user.teacher ? <TestForm/>:<div></div> : null}
                </div>
            </div>
        );
    }
}

export default User;