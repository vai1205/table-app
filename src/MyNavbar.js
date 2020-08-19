import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Button
} from 'reactstrap';
import { FiLogOut } from 'react-icons/fi';

const MyNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const updateTime = () => {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000);
  }
  updateTime();
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div style={{ marginBottom: "3rem" }}>
      <Navbar dark expand="md" style={{backgroundColor:"#2B3735"}}>
        <NavbarBrand href="/">
          <div className="burger">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Button style={{margin:"10px"}} color="danger">Cancel All Buy<br /></Button>
            </NavItem>
            <NavItem> 
              <Button color="danger" style={{margin:"10px"}}>Cancel All Sell<br /></Button>
            </NavItem>
          </Nav>
          <div className="logout-group">
            <NavbarText>{time}</NavbarText>
            <Button color="primary"><FiLogOut />&nbsp; Logout<br /></Button>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default MyNavbar;
