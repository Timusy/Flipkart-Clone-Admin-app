import React from "react";
import {Nav,Navbar,NavDropdown,Container} from "react-bootstrap";
import {NavLink,Link} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import {signout} from "../../actions";

const Header=function(props){

  const auth=useSelector(function(state){
    return state.auth;
  });
  const dispatch=useDispatch();

  const logout=function(){
     dispatch(signout());
  }

  const renderLoggedInLinks=function(){
    return (
      <Nav>
      {/*  <Nav.Link href="#deets">SignIn</Nav.Link>*/}

      <li className="nav-item">
         <span className="nav-link" onClick={logout} >Signout</span>
      </li>
      </Nav>
    );
  }

  const renderNonLoggedInLinks=function(){
    return (
      <Nav>
      {/*  <Nav.Link href="#deets">SignIn</Nav.Link>*/}
      <li className="nav-item">
         <NavLink to="signin" className="nav-link" >Signin</NavLink>
      </li>
      <li className="nav-item">
         <NavLink to="signup" className="nav-link" >Signup</NavLink>
      </li>
      </Nav>
    );
  }
  return (

    <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark" style={{zIndex:1}}>
      <Container fluid>
  {  //  <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand >
  }
      <Link  to="/" className="navbar-brand ">Admin Dashboard </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
         {/*  <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>*/}
        </Nav>
        {auth.authenticate?renderLoggedInLinks():renderNonLoggedInLinks()}

      </Navbar.Collapse>

</Container>
</Navbar>

  );
}

export default Header;
