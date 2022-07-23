import React from 'react';
import NavigationBar from "../../common/NavigationBar";
import {Container} from "react-bootstrap";
import Footer from "../../common/Footer";

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
                </Container>
            </Container>
            <Footer/>
        </main>
    );
}

export default HomePage;