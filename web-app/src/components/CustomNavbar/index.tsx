import React from "react";
import {NavLink} from "react-router-dom";
import {Container, Nav, Navbar} from "react-bootstrap";
import logo from "../../resources/logo.png";

interface CustomNavbarProps {
    screen: string;
    setScreen: Function;
    user: any;
}

const CustomNavbar: React.FC<CustomNavbarProps> = (props: CustomNavbarProps) => {
    return (
        <Navbar fixed="top" bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href={`/#${k_home_link}`}>
                    <img alt="logo" className="navbar-logo" src={logo} width="30" height="30"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink to={k_create_seating_chart_link} className="nav-link"
                                 activeClassName="active">Create</NavLink>
                    </Nav>
                    <Nav className="mr-auto">
                        <NavLink to={k_about_link} className="nav-link" activeClassName="active">About</NavLink>
                    </Nav>
                    <Nav className="mr-auto">
                        <NavLink to={k_contact_link} className="nav-link" activeClassName="active">Contact</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export const k_home_link = "/home";
export const k_create_seating_chart_link = "/create_seating_chart";
export const k_about_link = "/about";
export const k_contact_link = "/contact";
export const k_create_roster_link = "/create_roster"

export default CustomNavbar;