import {NavLink} from "react-router-dom";
import {Nav, Navbar} from "react-bootstrap";
import logo from "../../resources/logo.png";

interface CustomNavbarProps {
    screen: string;
    setScreen: Function;
    user: any;
}

const CustomNavbar = (props: CustomNavbarProps) => {
    return (
        <Navbar fixed="top" bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">
                <img alt="logo" className="navbar-logo" src={logo} width="30" height="30"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink to={k_about_link} className="nav-link" activeClassName="active">About</NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export const k_home_link = "/home";
export const k_about_link = "/about";

export default CustomNavbar;