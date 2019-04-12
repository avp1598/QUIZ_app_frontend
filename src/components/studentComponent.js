import React, { Component } from 'react';
import axios from 'axios';
import {Button,Form,FormGroup,Label,Input} from "reactstrap";
import {Redirect} from "react-router-dom";
import config from '../shared/config';
const url=config["server-api"];

class Student extends Component{

    constructor(props){
        super(props)

        this.state={
            redirect:false,
            testnum:null
        }
        this.view = this.view.bind(this);
        this.giveTest = this.giveTest.bind(this);
    }

    view(event){
        event.preventDefault();
        const token=localStorage.getItem("token");
        axios
        .get(`${url}/tests/`,{ headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
            alert(JSON.stringify(res.data))
        })
        .catch(err => {
            alert(JSON.stringify(err))
        });
    }
    giveTest(event){
        event.preventDefault();
        this.setState({
            redirect:true,
            testnum:this.test_num.value
        })
    }
    render(){
        let url_app = window.location.pathname;
        if(this.state.redirect){
            return(
                <Redirect to={`${url_app}/${this.state.testnum}`}/>
            )
        }
        return(
            <div>
                <Form onSubmit={this.giveTest}>
                    <FormGroup>
                        <Label for="testnum">Test Number</Label>
                        <Input type="number" name="testnumber" id="testNumber" placeholder="Test number" 
                            innerRef={(input) => this.test_num = input} />
                    </FormGroup>
                    <br/>
                    <Button outline color="info">Give Test</Button>
                </Form>
                <br/>
                <Button outline color="info" onClick={this.view}>View all defined tests</Button>
            </div>
        )
        
    }
    
}
export default Student;