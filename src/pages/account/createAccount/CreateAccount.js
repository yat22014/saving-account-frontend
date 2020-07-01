import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Button, Form, FormControl } from 'react-bootstrap';


class CreateAccount extends Component {

  constructor(props) {
    super(props);

    this.state = {
      accountName: '',
      account: 0,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;

    if (target.type == "number") {
      this.setState({
        [name]: parseFloat(target.value)
      });
    } else {
      this.setState({
        [name]: target.value
      });
    }
    console.log(30, this.state);
  }

  handleKeyUp(event) {
    const target = event.target;
    const name = target.name;
    
    if (target.type == "number") {
      this.setState({
        [name]: parseFloat(target.value)
      });
    } else {
      this.setState({
        [name]: target.value
      });
    }
    console.log(40, this.state);
  }

  handleSubmit(event) {
    console.log(30, this.state, event);
    event.preventDefault();
    if (this.state.accountName !== "") {
      const data = new FormData();
      data.append("submitAccount", JSON.stringify(this.state));

      const headers = new Headers();
        // headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', '');
        headers.append('Origin','http://localhost:3000');

      const response= fetch("http://money-transfer.dev.com/account/create", {
        method: "POST",
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'omit', // include, *same-origin, omit
        headers: headers,
        body: data
      });
      response.then((result) => {
        console.log(77, result);
        if(result.ok) {
          // console.log(91, result.json());
          return result.json();
        }
      }).catch((error1) => {
        console.log(79, error1);
      }).then((resJson) => {
        console.log(87, resJson);
      }).catch((error2) => {
        console.log(89, error2);
      });
      console.log(97, response);
    }
  }


  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Account name</Form.Label>
            <Form.Control ref="enterAccName" type="text" placeholder="Enter account name" name="accountName" value={this.state.accountName} onChange={this.handleChange} onKeyUp={this.handleKeyUp}/>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Accont</Form.Label>
            <Form.Control type="number" placeholder="Account" name="account" value={this.state.account} onChange={this.handleChange} onKeyUp={this.handleKeyUp}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default CreateAccount;
