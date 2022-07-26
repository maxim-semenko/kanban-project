import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import ProjectService from "../../../../service/ProjectService";
import NavigationBar from "../../../common/NavigationBar";
import {Col, Container, Row} from "react-bootstrap";
import {Button, ButtonGroup, CircularProgress} from "@mui/material";
import Grid from "@mui/material/Grid";
import Footer from "../../../common/Footer";
import ProjectMembersList from "./ProjectMembersList";
import {getProjectById} from "../../../../redux/project/ProjectAction";
import RemoveProjectDialog from "../../../dialogs/RemoveProjectDialog";
import {useDispatch, useSelector} from "react-redux";
import UserService from "../../../../service/UserService";

function AboutProjectPage(props) {
    const {id} = useParams();
    const [project, setProject] = useState(null);

    const user = JSON.parse(localStorage.getItem("user"))
    const dispatch = useDispatch()

    const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false)

    const [members, setMembers] = useState([])

    useEffect(() => {
        ProjectService.getProjectById(id)
            .then(response => {
                setProject(response.data)
            })

        UserService.getAllUsersByProjectId(id)
            .then(response => {
                setMembers(response.data.content)
                // setTotalElements(response.data.totalElements)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleRemovePost = (id) => {
        dispatch(getProjectById(id))
        setShowDeleteProjectModal(true)
    }

    const showModals = () => {
        if (showDeleteProjectModal) {
            return (
                <RemoveProjectDialog
                    show={showDeleteProjectModal}
                    onHide={() => setShowDeleteProjectModal(false)}
                />
            )
        }
    }

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
                                            <Button size={"large"} color={"secondary"} style={{borderRadius: "0px"}}>
                                                Back to cabinet
                                            </Button>
                                        </Link>
                                        <Link to={`/project/${project.id}/board`} style={{textDecoration: "none"}}>
                                            <Button size={"large"} color={"primary"} style={{borderRadius: "0px"}}>
                                                Project board
                                            </Button>
                                        </Link>
                                        <Link to={`/project/${project.id}/edit`} style={{textDecoration: "none"}}>
                                            <Button size={"large"} color={"success"} style={{borderRadius: "0px"}}>
                                                Edit project
                                            </Button>
                                        </Link>
                                        <Button
                                            size={"large"}
                                            color={"error"}
                                            style={{borderRadius: "0px"}}
                                            onClick={() => handleRemovePost(project.id)}
                                        >
                                            Delete project
                                        </Button>
                                    </ButtonGroup>
                                    <div style={{paddingTop: "10px"}}>
                                        <h3>Project current tasks statistics:</h3>
                                        <hr/>
                                        <h3>Project members:</h3>
                                        <hr/>
                                        <ProjectMembersList project={project} list={members}/>
                                    </div>
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
            {showModals()}
            <NavigationBar/>
            <Content/>
            <Footer/>
        </div>
    );
}

export default AboutProjectPage;