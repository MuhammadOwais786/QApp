import React, { useState, useEffect } from 'react';
import './App.css';
import Router from './config/router';
import { firebase } from './config/firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Nav, Navbar} from "react-bootstrap";
import store from './Store/index';
import { Provider } from 'react-redux';


function App() {
  const [isLoggedIn, setLoggedIn] = useState(true)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    listenAuthentication()
  }, [])

  const listenAuthentication = () => {
    firebase.auth().onAuthStateChanged(function (user) {
      setLoading(false)
      setLoggedIn(user ? { email: user.email, uid: user.uid } : false)
    })
  }

  return (
    <Provider store={store} >
      <div>

        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="" className="Logo">Q App</Navbar.Brand>
          {isLoggedIn && !isLoading &&
                    <Nav className="mr-auto">
                    <Nav.Link href="/Home" className="headging">Home</Nav.Link>
                    <Nav.Link href="/CompanyDetails" className="headging">Company Details(Admin)</Nav.Link>
                    <Nav.Link href="NormalUser" className="headging">Show All Companies</Nav.Link>
                  </Nav>
          }
          <Form inline>
            {isLoggedIn && !isLoading && <h3 className="userName">Welcome {isLoggedIn.email}</h3>}
            {isLoggedIn && !isLoading &&
          <Button onClick={() => firebase.auth().signOut()} className="logout"
            // variant="outline-primary" size="lg" style={{ marginRight: '-50%', width: '100px' }}
            >Logout</Button>}
          </Form>
        </Navbar>
        <br />
        {/* {isLoggedIn && !isLoading && <h3>{isLoggedIn.email}</h3>} */}
        <Router isLoggedIn={isLoggedIn} isLoading={isLoading} />
      </div>
    </Provider>
  );
}

export default App;
