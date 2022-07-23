import React, {useEffect, useState} from 'react';
import NavigationBar from "../../common/NavigationBar";
import {Button, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

function CabinetPage() {
    const user = JSON.parse(localStorage.getItem("user"))

    return (
        <div>
            <NavigationBar/>
            <Container className="main-container">
                <h1 style={{textAlign: "center", marginTop: "15px"}}><b>Cabinet</b></h1>
                <hr/>
                <Row style={{textAlign: "left", marginTop: "15px"}}>
                    <Col>
                        <p><b>Username: </b>{user.username}</p>
                        <p><b>Email: </b>{user.email}</p>
                        <Link to="/cabinet/edit">
                            <Button variant="outline-primary" size="lg"><b>Edit account</b></Button>
                        </Link>
                    </Col>
                    <div className="d-grid gap-2" style={{paddingTop: "3%"}}>
                        {/*<Link to="/cabinet/appointment-doctor">*/}
                            <Button variant="success" size="lg" style={{width: "100%"}}>Create project</Button>
                        {/*</Link>*/}
                    </div>
                </Row>
                <Container>
                    <Link to={"/board"}>
                        Go board
                    </Link>
                </Container>
            </Container>
            {/*<Footer/>*/}
        </div>
    );
}

export default CabinetPage;