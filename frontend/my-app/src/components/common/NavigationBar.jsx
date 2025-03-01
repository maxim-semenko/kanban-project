import React, {useState} from 'react'
import {Button, Container, Nav, Navbar} from "react-bootstrap"

import {Cookies} from "react-cookie"
import {Link} from "react-router-dom";
import AuthService from "../../api/AuthService";
import SignInModal from "../dialogs/auth/SignInModal";
import SignUpModal from "../dialogs/auth/SignUpModal";

// import Person2Icon from '@mui/icons-material/Person2';

function NavigationBar() {
    const cookies = new Cookies()
    const [showSignInModal, setShowSignInModal] = useState(false)
    const [showSignUpModal, setShowSignUpModal] = useState(false)
    const token = cookies.get("token");

    const isLogin = () => {
        if (token != null && localStorage.getItem("user") !== null) {
            const user = JSON.parse(localStorage.getItem("user"))
            // const isAdmin = user.roles.includes("ROLE_ADMIN")
            return (
                <div>
                    {/*<Link to={isAdmin ? "/administrator" : "/cabinet"}>*/}
                    {/*    /!*<Person2Icon/>*!/*/}
                    {/*    <Button variant="outline-primary">*/}
                    {/*        <b>{isAdmin ? "Administrator" : "Cabinet"} [{user.email}]</b>*/}
                    {/*    </Button>*/}
                    {/*</Link>*/}
                    {' '}
                    <Button variant="outline-danger" href={"/"}
                            onClick={() => AuthService.logout(cookies)}><b>Logout</b></Button>
                </div>
            )
        } else {
            cookies.remove("token", {path: "/"})
            localStorage.removeItem("user")
            return (
                <div>
                    <Button variant="outline-primary" onClick={() => setShowSignInModal(true)}>
                        <b>Sign In</b>
                    </Button>
                    {' '}
                    <Button variant="outline-success" onClick={() => setShowSignUpModal(true)}>
                        <b>Sign Up</b>
                    </Button>
                </div>
            )
        }
    }

    const showModals = () => {
        if (showSignUpModal) {
            return (
                <SignUpModal
                    show={showSignUpModal}
                    onHide={() => setShowSignUpModal(false)}
                />
            )
        }
        if (showSignInModal) {
            return (
                <SignInModal
                    show={showSignInModal}
                    onHide={() => setShowSignInModal(false)}
                />
            )
        }
    }

    return (
        <div>
            {showModals()}
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{fontSize: "18px"}}>
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        {/*<img alt="" src={imgLogo} width="41" height="41" className="d-inline-block align-top"/>{' '}*/}
                        <strong style={{fontSize: "24px"}}>Kanban-System</strong>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/"><b>Cabinet</b></Nav.Link>
                            <Nav.Link as={Link} to="/projects"><b>Projects</b></Nav.Link>
                            <Nav.Link as={Link} to="/tickets"><b>Tickets</b></Nav.Link>
                            {/*<Nav.Link as={Link} to="/logs"><b>Logs</b></Nav.Link>*/}
                            <Nav.Link as={Link} to="/about"><b>About</b></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        {isLogin()}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavigationBar