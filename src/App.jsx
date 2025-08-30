import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Products from './components/Products';

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container fluid>
          <Navbar.Brand href="#home">
             Product Management
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#products">Products</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="main-content">
        <Container fluid>
          <div className="text-center mb-4">
            <h1>Welcome to Perlisyhl's Shop</h1>
            <p className="lead">Beauty is the price we have to pay for brands</p>
          </div>
          
          <Products />
        </Container>
      </div>
    </div>
  );
}

export default App;
