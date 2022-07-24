import React from 'react'
import {Col, Container, Row} from "react-bootstrap"
import NavigationBar from "../../components/common/NavigationBar"
import Footer from "../../components/common/Footer"
import springLogo from "../../image/spring.png"
import reactLogo from "../../image/react.png"

function AboutPage() {

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
                <h1 style={{textAlign: "center", marginTop: "15px"}}><b>About</b></h1>
                <hr/>
                    <Container>
                        <div style={{marginLeft: "0%", textAlign: "justify"}}>
                            <h3><b>Kanban-System</b> - Kanban is a popular Lean workflow management method for
                                defining, managing, and improving services that deliver knowledge work. It helps
                                you visualize work, maximize efficiency, and improve continuously.</h3>
                        </div>
                        <SpringAboutComponent/>
                        <ReactAboutComponent/>
                    </Container>
                {/*</Jumbotron>*/}
            </Container>
            <Footer/>
        </main>
    );

}

export default AboutPage