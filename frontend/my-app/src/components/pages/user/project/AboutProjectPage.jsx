import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import ProjectService from "../../../../service/ProjectService";
import NavigationBar from "../../../common/NavigationBar";
import {Col, Container, Row} from "react-bootstrap";
import {Button, ButtonGroup, CircularProgress} from "@mui/material";
import Grid from "@mui/material/Grid";
import ImageProfile from "../cabinet/ImageProfile";
import AboutProfile from "../cabinet/AboutProfile";
import AddIcon from "@mui/icons-material/Add";

function AboutProjectPage(props) {
    const {id} = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
        ProjectService.getProjectById(id)
            .then(response => {
                setProject(response.data)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const Content = () => {
        if (project !== null) {
            return (
                <Container className="main-container" style={{paddingBottom: "5%"}}>
                    <h1 style={{textAlign: "center", marginTop: "15px"}}><b>Project «{project.name}»</b></h1>
                    <hr/>
                    <Row style={{textAlign: "left", marginTop: "15px"}}>
                        <Col>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={12} lg={12}>
                                    <ButtonGroup disableElevation variant="contained">
                                        <Link to={"/cabinet"} style={{textDecoration: "none"}}>
                                            <Button size={"large"} color={"error"} style={{borderRadius: "0px"}}>
                                                Back to cabinet
                                            </Button>
                                        </Link>
                                        <Link to={`/project${project.id}/board`} style={{textDecoration: "none"}}>
                                            <Button size={"large"} color={"primary"} style={{borderRadius: "0px"}}>
                                                Project board
                                            </Button>
                                        </Link>
                                        <Link to={`/project${project.id}/edit`} style={{textDecoration: "none"}}>
                                            <Button size={"large"} color={"success"} style={{borderRadius: "0px"}}>
                                                Edit project
                                            </Button>
                                        </Link>
                                    </ButtonGroup>
                                </Grid>
                            </Grid>
                        </Col>
                    </Row>
                </Container>
            )
        } else {
            return (
                <CircularProgress style={{marginTop: "15px"}}/>
            )
        }
    }

    return (
        <div>
            <NavigationBar/>
            <Content/>
            {/*{*/}
            {/*    project !== null ?*/}
            {/*        <div>*/}
            {/*            <h1>{project.id}</h1>*/}
            {/*            <h1>{project.name}</h1>*/}
            {/*        </div>*/}
            {/*        :*/}
            {/*        <div>loading...</div>*/}
            {/*}*/}
        </div>
    );
}

export default AboutProjectPage;