import React from 'react';
import NavigationBar from "../../common/NavigationBar";
import {Col, Container, Row} from "react-bootstrap";
import Footer from "../../common/Footer";
import image from "../../../image/home-image.jpg"
import kanbanImage from "../../../image/kanban-image.jpg"
import springLogo from "../../../image/spring.png";
import reactLogo from "../../../image/react.png";

function HomePage(props) {

    const SpringAboutComponent = () => {
        return (
            <Row style={{marginTop: "3%"}}>
                <Col lg="3"><img alt="" src={springLogo} height="150px"/></Col>
                <Col style={{textAlign: "justify"}}>
                    <h4 style={{paddingTop: "15px"}}><span
                        style={{color: "#2dd635"}}><b>Spring Boot </b></span>
                        is an open source Java-based framework used to create a micro Service. It is
                        developed by Pivotal Team and is used to build stand-alone and production ready
                        spring applications. This chapter will give you an introduction to Spring Boot and
                        familiarizes you with its basic concepts.
                    </h4>
                </Col>
            </Row>
        )
    }

    const ReactAboutComponent = () => {
        return (
            <Row style={{marginTop: "3%"}}>
                <Col lg="3"><img alt="" src={reactLogo} height="150px"/></Col>
                <Col style={{textAlign: "justify"}}>
                    <h4 style={{paddingTop: "15px"}}><span
                        style={{color: "#01d5fa"}}><b>React JS </b></span>
                        is a JavaScript library used in web development to build interactive elements on
                        websites. But if you’re not familiar with JavaScript or JavaScript libraries, that’s
                        not a helpful definition. So let’s take a step back and deal with those terms first.
                    </h4>
                </Col>
            </Row>
        )
    }

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
                    <SpringAboutComponent/>
                    <ReactAboutComponent/>
                </Container>
            </Container>
            <Footer/>
        </main>
    );
}

export default HomePage;