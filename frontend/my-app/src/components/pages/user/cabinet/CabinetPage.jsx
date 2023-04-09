import React from 'react';
import NavigationBar from "../../../common/NavigationBar";
import {Col, Container, Row} from "react-bootstrap";
import Grid from "@mui/material/Grid";
import ImageProfile from "./ImageProfile";
import AboutProfile from "./AboutProfile";
import Footer from "../../../common/Footer";

function CabinetPage() {
    const user = JSON.parse(localStorage.getItem("user"))

    return (
        <div>
            <NavigationBar/>
            <Container className="main-container" style={{paddingBottom: "5%"}}>
                <h1 style={{textAlign: "center", marginTop: "15px"}}><b>Cabinet</b></h1>
                <hr/>
                <Row style={{textAlign: "left", marginTop: "15px"}}>
                    <Col>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12} lg={12}>
                                <Grid container spacing={3}>
                                    <ImageProfile user={user}/>
                                    <AboutProfile user={user}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    );
}

export default CabinetPage;