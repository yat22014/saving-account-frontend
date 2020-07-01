import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import { Button, Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Landing from './pages/landing/Landing';
import CreateAccount from './pages/account/createAccount/CreateAccount';
import ManageAccount from './pages/account/manageAccount/ManageAccount';
import DoTransition from './pages/account/doTransition/DoTransition';
import DebtIndex from './pages/debt/index/DebtIndex';
import DebtDetail from './pages/debt/detail/DebtDetail';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <Router>
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/account">Account</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/account/" component={ManageAccount} />
            <Route exact path="/account/manage-account" component={ManageAccount} />
            <Route exact path="/account/create-account" component={CreateAccount} />
            <Route exact path="/account/transition" component={DoTransition} />
            <Route exact path="/debt/" component={DebtIndex} />
            <Route exact path="/debt/detail" component={DebtDetail} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
