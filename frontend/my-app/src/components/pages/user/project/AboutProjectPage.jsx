import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import NavigationBar from "../../../common/NavigationBar";
import {Col, Container, Row} from "react-bootstrap";
import {Button, CircularProgress, Stack} from "@mui/material";
import Grid from "@mui/material/Grid";
import Footer from "../../../common/Footer";
import ProjectMembersList from "./ProjectMembersList";
import {getProjectById} from "../../../../redux/projects/ProjectAction";
import RemoveProjectDialog from "../../../dialogs/remove/RemoveProjectDialog";
import {useDispatch, useSelector} from "react-redux";
import AddMemberProjectDialog from "../../../dialogs/AddMemberProjectDialog";
import RemoveMemberProjectDialog from "../../../dialogs/remove/RemoveMemberProjectDialog";
import {getUsersByProjectId, resetData} from "../../../../redux/user/UserAction";
import dayjs from "dayjs";
import CreateUpdateProjectModal from "../../../dialogs/create-update/CreateUpdateProjectModal";
import Box from "@mui/material/Box";

function AboutProjectPage(props) {
    const {id} = useParams();
    const currentUser = JSON.parse(localStorage.getItem("user"))
    const dispatch = useDispatch()
    const {users, loadingUsers} = useSelector(state => state.dataUsers)
    const {project, loadingProject} = useSelector(state => state.dataProjects)


    const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false)
    const [showAddMemberModal, setShowAddMemberModal] = useState(false)
    const [showRemoveMemberModal, setShowRemoveMemberModal] = useState(false)
    const [showCreateUpdateProjectModal, setShowCreateUpdateProjectModal] = useState(false)

    useEffect(() => {
        dispatch(resetData())
        dispatch(getProjectById(id))
        dispatch(getUsersByProjectId(id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleRemoveProject = (id) => {
        setShowDeleteProjectModal(true)
    }

    const handleEditProject = (id) => {
        setShowCreateUpdateProjectModal(true)
    }

    const showModals = () => {
        if (showCreateUpdateProjectModal) {
            return (
                <CreateUpdateProjectModal
                    show={showCreateUpdateProjectModal}
                    onHide={() => setShowCreateUpdateProjectModal(false)}
                    method={"update"}
                />
            )
        }
        if (showDeleteProjectModal) {
            return (
                <RemoveProjectDialog
                    show={showDeleteProjectModal}
                    onHide={() => setShowDeleteProjectModal(false)}
                />
            )
        }
        if (showAddMemberModal) {
            return (
                <AddMemberProjectDialog
                    show={showAddMemberModal}
                    onHide={() => setShowAddMemberModal(false)}
                />
            )
        }
        if (showRemoveMemberModal) {
            return (
                <RemoveMemberProjectDialog
                    show={showRemoveMemberModal}
                    onHide={() => setShowRemoveMemberModal(false)}
                />
            )
        }
    }

    const ProjectButtons = () => {
        return (
            <div>
                <Stack direction="row" spacing={1}>
                    <Link to={"/projects"} style={{textDecoration: "none"}}>
                        <Button size={"large"} color={"primary"} variant={"contained"}>
                            Back to projects
                        </Button>
                    </Link>
                    <Link to={`/projects/${project.id}/board`} style={{textDecoration: "none"}}>
                        <Button size={"large"} color={"primary"} variant={"contained"}>
                            Project board
                        </Button>
                    </Link>
                    <ExtraButtonsForCreator/>
                </Stack>

            </div>
        )
    }

    const ProjectInfo = () => {
        return (
            <div style={{paddingBottom: "15px"}}>
                <b>Name: </b>{project.name}
                <br/>
                <b>Description: </b><span
                style={{whiteSpace: "pre-wrap"}}>{project.description}</span>
                <br/>
                <b>Creator: </b>
                {project.creator.firstname}{' '}{project.creator.lastname}{' '}
                ({project.creator.email})
                <br/>
                <b>Created:</b> {dayjs(project.createdDate).format('MMMM D YYYY, h:mm A')}
            </div>
        )
    }

    const ExtraButtonsForCreator = () => {
        if (currentUser.id === project.creator.id) {
            return (
                <Stack direction="row" spacing={1}>
                    <Button size={"large"} color={"success"}
                            onClick={() => handleEditProject(project.id)} variant={"contained"}
                    >
                        Edit project
                    </Button>
                    <Button
                        size={"large"}
                        color={"error"}
                        variant={"contained"}
                        onClick={() => handleRemoveProject(project.id)}
                    >
                        Delete project
                    </Button>
                </Stack>
            )
        } else {
            return null
        }
    }

    const Content = () => {
        if (loadingProject) {
            return <Box display="flex" justifyContent="center"><CircularProgress style={{marginTop: "15px"}}/></Box>
        } else if (project !== null) {
            return (
                <Container className="main-container" style={{paddingBottom: "5%"}}>
                    <h1 style={{textAlign: "center", marginTop: "15px"}}><b>Project «{project.name}»</b></h1>
                    <hr/>
                    <Row style={{textAlign: "left", marginTop: "15px"}}>
                        <Col>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={12} lg={12}>
                                    <ProjectButtons/>
                                    <div style={{paddingTop: "15px"}}>
                                        <h3>Project info about:</h3>
                                        <hr style={{margin: "0px 0px 0px 0px"}}/>
                                        <ProjectInfo/>
                                        <h3>Project members:</h3>
                                        <hr style={{margin: "0px 0px 10px 0px"}}/>
                                        {
                                            currentUser.id === project.creator.id ?
                                                <Button color={"success"}
                                                        variant={"contained"}
                                                        style={{marginBottom: "10px"}}
                                                        onClick={() => setShowAddMemberModal(true)}
                                                >
                                                    Add member
                                                </Button>
                                                :
                                                null
                                        }
                                        {
                                            users.length !== 0 ?
                                                <ProjectMembersList
                                                    project={project}
                                                    list={users}
                                                    openRemoveDialog={() => setShowRemoveMemberModal(true)}
                                                />
                                                :
                                                null
                                        }
                                    </div>
                                </Grid>
                            </Grid>
                        </Col>
                    </Row>
                </Container>
            )
        } else {
            return <h1>Project not found!</h1>
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