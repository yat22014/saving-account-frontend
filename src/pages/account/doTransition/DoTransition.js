import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Button, Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';


class DoTransition extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {}
    }
    // console.log(17, this);
  }

  componentDidMount() {
    // const { test } = this.props.location.state;

    // console.log(23, this.props.location.state);
    this.setState({user: this.props.location.state.account}, () => {
      // console.log(25, this.state.user);

      const headers = new Headers();
      // headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      headers.append('Authorization', '');
      headers.append('Origin','http://localhost:3000');

      const data = new FormData();
      data.append("userInformation", JSON.stringify(this.state.user));
      // const debtList = fetch("http://money-transfer.dev.com/debt/list", {
      //     method: "POST",
      //     mode: 'cors', // no-cors, *cors, same-origin
      //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      //     credentials: 'omit', // include, *same-origin, omit
      //     headers: headers,
      //     body: data
      //   });

      //   debtList.then((result) => {
      //     console.log(21, result);
      //     if(result.ok) {
      //       // console.log(91, result.json());
      //       return result.json();
      //     }
      //   }).catch((error1) => {
      //     console.log(27, error1);
      //   }).then((resJson) => {
      //     console.log(29, resJson);
      //     this.setState({accountList: resJson});
      //   }).catch((error2) => {
      //     console.log(31, error2);
      //   });
      
    });
    }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-6">
            Name:
          </div>
          <div className="col-6">
            { this.state.user.name }
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            Account:
          </div>
          <div className="col-6">
            { this.state.user.account }
          </div>
        </div>
        <Link to={{pathname:"/debt", state: {account: this.state.user}}}>
          <Button className="btn">Debt</Button>
        </Link>
        <div className="row my-3 bg-primary">
          <div className="col-12">
            <Form>
              <Form.Group>
                <Form.Label>Pay to</Form.Label>
                <Form.Control type="text" placeholder="Pay to who" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Amount</Form.Label>
                <Form.Control type="number" placeholder="transiton amount (negative is to pay, position to gain)" />
              </Form.Group>
              <Button className="btn btn-dark btn-outline-light my-3">
                Submit transition
              </Button>
            </Form>
          </div>
        </div>



      </div>
    );
  }
}

export default DoTransition;
