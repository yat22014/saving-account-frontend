import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Button, Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';


class debtIndex extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {},
      debtName: '',
      debtAmount: '',
      debtReason: '',
      debtList: []
    }
    console.log(17, this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentDidMount() {
    // const { test } = this.props.location.state;

    console.log(30, this.props.location.state);
    this.setState({user: this.props.location.state.account}, () => {
      console.log(26, this.state.user);
      const headers = new Headers();
      // headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      headers.append('Authorization', '');
      headers.append('Origin','http://localhost:3000');

      const data = new FormData();
      data.append("userInformation", JSON.stringify(this.state.user));
      console.log(35, data);
      const debtList = fetch("http://money-transfer.dev.com/debt/list", {
          method: "POST",
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'omit', // include, *same-origin, omit
          headers: headers,
          body: data
        });

        debtList.then((result) => {
          console.log(21, result);
          if(result.ok) {
            // console.log(91, result.json());
            return result.json();
          }
        }).catch((error1) => {
          console.log(27, error1);
        }).then((resJson) => {
          console.log(29, resJson);
          this.setState({debtList: resJson});
        }).catch((error2) => {
          console.log(31, error2);
        });
      });

  } 

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    console.log(74, target);
    if (target.type == "number") {
      this.setState({
        [name]: parseFloat(target.value)
      });
    } else {
      this.setState({
        [name]: target.value
      });
    }
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
  }

  handleSubmit(event) {
    console.log(30, this.state, event);
    event.preventDefault();
    if (this.state.debtName !== "" && this.state.debtAmount) {
      const data = new FormData();
      console.log(106, this);
      data.append("debtUser", this.state.user.id);
      data.append("debtName", this.state.debtName);
      data.append("debtAmount", this.state.debtAmount);
      data.append("debtReason", this.state.debtReason);

      const headers = new Headers();
        // headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      headers.append('Authorization', '');
      headers.append('Origin','http://localhost:3000');

      const response= fetch("http://money-transfer.dev.com/debt/new", {
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
        {this.state.debtList && this.state.debtList.length ? <h3>Debt list</h3> : null}
        {this.state.debtList.map((debt, key) => {
          return <div key={key}><Link to={{pathname:"/debt/detail", state: {debt: debt}}}>{debt.name}: ${debt.amount}</Link></div>
          // <Link to={{pathname:"/account/transition", state: {account: account}}}>
        })}
        <div className="row my-3 bg-secondary">
          <div className="col-12">
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label>Debt name</Form.Label>
                <Form.Control type="text" placeholder="Enter debt name" name="debtName" value={this.state.debtName} onChange={this.handleChange} onKeyUp={this.handleKeyUp} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Amount</Form.Label>
                <Form.Control type="number" placeholder="Debt amount" name="debtAmount" value={this.state.debtAmount} onChange={this.handleChange} onKeyUp={this.handleKeyUp} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Reason</Form.Label>
                <Form.Control as="textarea" rows="3" name="debtReason" value={this.state.debtReason} onChange={this.handleChange} onKeyUp={this.handleKeyUp} />
              </Form.Group>
              <Button className="btn btn-dark btn-outline-light my-3"  type="submit">
                Submit debt
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default debtIndex;
