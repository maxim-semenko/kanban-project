import React, {useEffect, useState} from 'react';
import NavigationBar from "../../../../common/NavigationBar";
import {Link, useParams} from "react-router-dom";
import {Button, ButtonGroup, CircularProgress, Container} from "@mui/material";
import "../../../../../style/Board.css";
import {useDispatch, useSelector} from "react-redux";
import {getAllTasksByProjectId} from "../../../../../redux/task/TaskAction";
import CreateUpdateTaskDialog from "../../../../dialogs/CreateUpdateTaskDialog";
import {getAllProjectStatusesByProjectId} from "../../../../../redux/project-statuses/ProjectStatusAction";
import CreateUpdateProjectStatusDialog from "../../../../dialogs/CreateUpdateProjectStatusDialog";
import {getProjectById} from "../../../../../redux/project/ProjectAction";
import Box from "@mui/material/Box";
import Board from "./Board";

function ProjectBoardPage(props) {
    const {id} = useParams();
    const currentUser = JSON.parse(localStorage.getItem("user"))
    const {project, loadingProject} = useSelector(state => state.dataProjects)
    const dispatch = useDispatch()
    const {projectStatuses, loadingProjectStatuses} = useSelector(state => state.dataProjectStatuses)

    const [showCreateUpdateTaskDialog, setShowCreateUpdateTaskDialog] = useState(false)
    const [showCreateUpdateProjectStatusDialog, setShowCreateUpdateProjectStatusDialog] = useState(false)

    useEffect(() => {
        if (project === null) {
            dispatch(getProjectById(id))
        }
        dispatch(getAllProjectStatusesByProjectId(id))
        dispatch(getAllTasksByProjectId(id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const showModals = () => {
        if (showCreateUpdateTaskDialog) {
            return (
                <CreateUpdateTaskDialog
                    show={showCreateUpdateTaskDialog}
                    onHide={() => setShowCreateUpdateTaskDialog(false)}
                    method={"create"}
                />
            )
        }
        if (showCreateUpdateProjectStatusDialog) {
            return (
                <CreateUpdateProjectStatusDialog
                    show={showCreateUpdateProjectStatusDialog}
                    onHide={() => setShowCreateUpdateProjectStatusDialog(false)}
                    method={"create"}
                />
            )
        }
    }

    const Content = () => {
        if (!loadingProject) {
            return (
                <div style={{textAlign: "left", marginTop: "15px"}}>
                    <ButtonGroup disableElevation variant="contained">
                        <Link to={`/project/${id}`} style={{textDecoration: "none"}}>
                            <Button size={"large"} color={"error"} style={{borderRadius: "0px"}}>
                                Back to project
                            </Button>
                        </Link>
                        {
                            currentUser.id === project.creator.id ?
                                <>
                                    < Button
                                        size={"large"}
                                        color={"primary"}
                                        style={{borderRadius: "0px"}}
                                        onClick={() => setShowCreateUpdateProjectStatusDialog(true)}
                                        disabled={projectStatuses.length === 10 && !loadingProjectStatuses}
                                    >
                                        Add column
                                    </Button>
                                    <Button
                                        size={"large"}
                                        color={"success"}
                                        style={{borderRadius: "0px"}}
                                        onClick={() => setShowCreateUpdateTaskDialog(true)}
                                        disabled={projectStatuses.length === 0 && !loadingProjectStatuses}
                                    >
                                        Add task
                                    </Button>
                                </>
                                :
                                null
                        }
                    </ButtonGroup>
                </div>
            )
        } else {
            return <Box display="flex" justifyContent="center"><CircularProgress/></Box>
        }

    }

    return (
        <div>
            {showModals()}
            <NavigationBar/>
            <Container maxWidth={false} style={{padding: "0 12px 0 12px"}}>
                <Content/>
                <hr/>
                <Board/>
            </Container>
        </div>
    );
}

export default ProjectBoardPage;