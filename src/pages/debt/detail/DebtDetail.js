import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Button, Navbar, Nav, NavDropdown, Form, FormControl, Table } from 'react-bootstrap';


class debtDetail extends Component {
	constructor(props) {
    	super(props);
    	console.log(13, this);
      this.state = {
        transactionAmount: 0,
        payTo: "",
        title: "",
        transactionList: [],
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleKeyUp = this.handleKeyUp.bind(this);
    }

  componentDidMount() {

    console.log(19, this.props.location.state);
    this.setState({debt: this.props.location.state.debt}, () => {
      const headers = new Headers();
      // headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      headers.append('Authorization', '');
      headers.append('Origin','http://localhost:3000');

      const data = new FormData();
      data.append("debtId", this.state.debt.id);
      const transition = fetch("http://money-transfer.dev.com/debt/detail", {
          method: "POST",
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'omit', // include, *same-origin, omit
          headers: headers,
          body: data
        });

        transition.then((result) => {
          console.log(21, result);
          if(result.ok) {
            // console.log(91, result.json());
            return result.json();
          }
        }).catch((error1) => {
          console.log(27, error1);
        }).then((resJson) => {
          console.log(29, resJson);
          this.setState({transactionList: resJson});
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
    if (this.state.transactionAmount) {
      const data = new FormData();
      console.log(106, this);
      data.append("transactionAmount", this.state.transactionAmount);
      data.append("debtId", this.state.debt.id);
      data.append("payTo", this.state.payTo);
      data.append("title", this.state.title);

      const headers = new Headers();
        // headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      headers.append('Authorization', '');
      headers.append('Origin','http://localhost:3000');

      const response= fetch("http://money-transfer.dev.com/transaction/new", {
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
        if(resJson.success) {
          let transactionList = JSON.parse(resJson.transactionList);
          this.setState({transactionList: transactionList});
          console.log(131, transactionList);
        }
      }).catch((error2) => {
        console.log(89, error2);
      });
    }
  }

  	render() {
    	return (
    		<div>
          {this.state.debt && this.state.debt.debtAccount ? 
            <div>
              <div className="row">
                <div className="col-6">Name:</div>
                <div className="col-6">{this.state.debt.debtAccount.name}</div>
              </div> 
              <div className="row">
                <div className="col-6">Account money:</div>
                <div className="col-6">${this.state.debt.debtAccount.account}</div>
              </div>
              <div className="row">
                <div className="col-6">Debt name:</div>
                <div className="col-6">{this.state.debt.name}</div>
              </div>
              <div className="row">
                <div className="col-6">Debt reason:</div>
                <div className="col-6">{this.state.debt.reason}</div>
              </div>
              <div className="row">
                  <div className="col-6">Debt origianl amount:</div>
                  <div className="col-6">{this.state.debt.originalAmount}</div>
              </div>
              <div className="row my-3 bg-secondary">
                <div className="col-12">
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                      <Form.Label>Pay To</Form.Label>
                      <Form.Control type="text" placeholder="Pay to" name="payTo" value={this.state.payTo} onChange={this.handleChange} onKeyUp={this.handleKeyUp} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Title</Form.Label>
                      <Form.Control type="text" placeholder="Title" name="title" value={this.state.title} onChange={this.handleChange} onKeyUp={this.handleKeyUp} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Amount</Form.Label>
                      <Form.Control type="number" placeholder="Debt amount" name="transactionAmount" value={this.state.transactionAmount} onChange={this.handleChange} onKeyUp={this.handleKeyUp} />
                    </Form.Group>         
                    <Button className="btn btn-dark btn-outline-light my-3"  type="submit">
                      Submit transaction
                    </Button>
                  </Form>
                </div>
              </div>
              {this.state.transactionList && this.state.transactionList.length ? 
                <div>
                  <h3>Transaction list</h3> 
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Pay to</th>
                        <th>title</th>
                        <th>Amount</th>
                        <th>Current amount</th>
                      </tr>
                    </thead>
                    <tbody>
                        {this.state.transactionList.map((transaction, key) => { 
                          return <tr>
                            <td>{transaction.payTo}</td>
                            <td>{transaction.title}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.currentAmountMark}</td>
                          </tr>
                        })}
                    </tbody>
                  </Table>
                </div>
                : null}

            </div>
            : null}
        </div>
		);
	}
}

export default debtDetail;
