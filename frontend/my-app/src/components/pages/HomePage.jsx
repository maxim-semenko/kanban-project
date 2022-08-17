import React from 'react';
import NavigationBar from "../common/NavigationBar";
import {Col, Container, Row} from "react-bootstrap";
import Footer from "../common/Footer";
import image from "../../image/home-image.jpg"
import kanbanImage from "../../image/kanban-image.jpg"

function HomePage(props) {

    return (
        <main>
            <NavigationBar/>
            <Container className="main-container">
                <h1 style={{textAlign: "center", marginTop: "15px"}}><b>Home</b></h1>
                <hr/>
                <Container>
                    <div style={{marginLeft: "0%", textAlign: "justify"}}>
                        <h3><b>Kanban-System</b> - Kanban is a popular Lean workflow management method for
                            defining, managing, and improving services that deliver knowledge work. It helps
                            you visualize work, maximize efficiency, and improve continuously.</h3>
                    </div>
                    <hr/>
                    <Row style={{paddingBottom: "3%"}}>
                        <Col><img alt="" src={kanbanImage} width="100%"/></Col>
                        <Col>
                            <div style={{fontSize: "3vw", textAlign: "left"}}>
                                <ul>
                                    <li><b><u>Improvement in workflow.</u></b></li>
                                    <li><b><u>Limiting Work-In-Progress.</u></b></li>
                                    <li><b><u>Continuous Delivery.</u></b></li>
                                    <li><b><u>Pull Approach.</u></b></li>
                                    <li><b><u>Visual metrics.</u></b></li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{paddingBottom: "3%"}}>
                        <Col><img alt="" src={image} width="100%"/></Col>
                        <Col>
                            <div style={{fontSize: "2.1vw", textAlign: "justify"}}>
                                <h2> Every day our company does its best to make our product more better. Our
                                    development team is constantly implementing useful functionality in order to enable
                                    our clients to manage the development of their project efficiently and conveniently.
                                </h2>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
            <Footer/>
        </main>
    );
}

export default HomePage;