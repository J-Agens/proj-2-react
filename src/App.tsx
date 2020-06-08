import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { NavbarComponent } from './components/NavbarComponent';
import { User } from './models/User';
import { LoginComponent } from './components/default/LoginComponent';
import Welcome from './components/default/Welcome';
import {Logout} from './components/default/Logout';
import Home from './components/default/Home';
import NoMatch from './components/default/NoMatch';
import Reimbursement from './components/reimbursementComponenet';
import Users from './components/usersComponenet';




interface IAppState {
  loggedInUser: User | null;
  id:number|any;
  // members: User | null;
}

export class App extends React.Component<any, IAppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      loggedInUser: null,
      id: '',
      // members :null,
    }
  }

  updateUser = (user:User) => {
    this.setState({
      loggedInUser: user,
    })
    const cooid = this.state.loggedInUser?.id;
    this.setState({
      id: cooid,
    })
  }

  // emptyMembers = (m:any) => {
  //   this.setState({
  //     members: null,
  //   })
  // }

  removeUser = (u: any) => {
    this.setState({
      loggedInUser: null,
    })
  }

  render() {
    const G = this.state.loggedInUser;
    return (
    <>
    <Router>
      <div className="fixed">
    <Welcome role={G?.role || 'visitor'} username={G?.firstname || 'Guest'}/>
    <NavbarComponent User = {this.state.loggedInUser}/>
     </div>
     <div className="wrap">
      <Switch>
      <Route path="/hello" exact>
          <Home />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>  
        { <Route exact path="/login">
          <LoginComponent  updateUser={this.updateUser} />
        </Route>}
        { G && <Route exact path="/logout">
          <Logout updateUser={this.removeUser}/>
        </Route>}
        { G && <Route path='/reimbursements' exact >
          <Reimbursement userRole={G.role} id={this.state.id}  />
          </Route>}
      { G && <Route path='/employees'  exact >
        <Users userRole={G?.role} userId={G?.id} />
        </Route>}
        <Route><NoMatch updateUser={this.updateUser} /></Route>
      </Switch>
      </div>
    </Router>
    </>
    );
  }

}