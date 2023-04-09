import React from 'react';
import NavigationBar from "../../../common/NavigationBar";
import {Container} from "react-bootstrap";
import Footer from "../../../common/Footer";

const LogTimesPage = () => {
    return (
        <div>
            <NavigationBar/>
            <Container className="main-container" style={{paddingBottom: "5%"}}>
                <h1 style={{textAlign: "center", marginTop: "15px"}}><b>Logs</b></h1>
                <hr/>
                {/*<CabinetProjectList/>*/}
            </Container>
            <Footer/>
        </div>
    );
};

export default LogTimesPage;