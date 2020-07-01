import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import DoTransition from '../doTransition/DoTransition';


class ManageAccount extends Component {

  constructor(props) {
    super(props);

    this.state = {
      accountList: []
    }
    
  }

  componentDidMount() {

    const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', '');
    headers.append('Origin','http://localhost:3000');
    
    const accountList = fetch("http://money-transfer.dev.com/account/list", {
        method: "GET",
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'omit', // include, *same-origin, omit
        headers: headers,
      });

      accountList.then((result) => {
        console.log(21, result);
        if(result.ok) {
          // console.log(91, result.json());
          return result.json();
        }
      }).catch((error1) => {
        console.log(27, error1);
      }).then((resJson) => {
        console.log(29, resJson);
        if (resJson) {
          this.setState({accountList: resJson});
        }
      }).catch((error2) => {
        console.log(31, error2);
      });
    }

  render() {
    return (
      <div>
        <Link to="/account/create-account">Go to create account</Link>
        {this.state.accountList.map((account, key) => {
          return <div key={key}><Link to={{pathname:"/account/transition", state: {account: account}}}>{account.name}</Link></div>;
          // return <div key={key}><Route exact path="/account/transition" render={(props) => <DoTransition {...props} title={`hello`} user={account} />} /></div>;
        })}

      </div>
    );
  }
}

export default ManageAccount;
