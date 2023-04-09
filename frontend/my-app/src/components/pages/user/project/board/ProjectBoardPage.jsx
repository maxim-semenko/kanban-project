import React, {useEffect, useState} from 'react';
import NavigationBar from "../../../../common/NavigationBar";
import {Link, useParams} from "react-router-dom";
import {Button, CircularProgress, Container, Stack} from "@mui/material";
import "../../../../../style/Board.css";
import {useDispatch, useSelector} from "react-redux";
import {getAllTicketsByProjectId} from "../../../../../redux/tickets/TicketAction";
import CreateUpdateTicketDialog from "../../../../dialogs/create-update/CreateUpdateTicketDialog";
import {getAllProjectStatusesByProjectId} from "../../../../../redux/project-statuses/ProjectStatusAction";
import CreateUpdateProjectStatusDialog from "../../../../dialogs/create-update/CreateUpdateProjectStatusDialog";
import {getProjectById} from "../../../../../redux/projects/ProjectAction";
import Box from "@mui/material/Box";
import Board from "./Board";
import CreateUpdateLogTimeDialog from "../../../../dialogs/create-update/CreateUpdateLogTimeDialog";
import {setOpenCreateUpdateLogTimeDialog, setOpenRemoveLogTimeDialog} from "../../../../../redux/dialogs/DialogAction";
import RemoveLogTimeDialog from "../../../../dialogs/remove/RemoveLogTimeDialog";

function ProjectBoardPage(props) {
    const {id} = useParams();
    const currentUser = JSON.parse(localStorage.getItem("user"))
    const {project, loadingProject} = useSelector(state => state.dataProjects)
    const dispatch = useDispatch()
    const {projectStatuses, loadingProjectStatuses} = useSelector(state => state.dataProjectStatuses)

    const {
        openCreateUpdateLogTimeDialog,
        openRemoveLogTimeDialog,
        methodCreateUpdateLogTimeDialog
    } = useSelector(state => state.dataDialogs)

    const [showCreateUpdateTicketDialog, setShowCreateUpdateTicketDialog] = useState(false)
    const [showCreateUpdateProjectStatusDialog, setShowCreateUpdateProjectStatusDialog] = useState(false)

    useEffect(() => {
        if (project === null) {
            dispatch(getProjectById(id))
        }
        dispatch(getAllProjectStatusesByProjectId(id))
        dispatch(getAllTicketsByProjectId(id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const showModals = () => {
        if (showCreateUpdateTicketDialog) {
            return (
                <CreateUpdateTicketDialog
                    show={showCreateUpdateTicketDialog}
                    onHide={() => setShowCreateUpdateTicketDialog(false)}
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
        // if (openCreateUpdateLogTimeDialog) {
        //     return (
        //         <CreateUpdateLogTimeDialog
        //             show={openCreateUpdateLogTimeDialog}
        //             onHide={() => dispatch(setOpenCreateUpdateLogTimeDialog(false))}
        //             method={methodCreateUpdateLogTimeDialog}
        //         />
        //     )
        // }
        // if (openRemoveLogTimeDialog) {
        //     return (
        //         <RemoveLogTimeDialog
        //             show={openRemoveLogTimeDialog}
        //             onHide={() => dispatch(setOpenRemoveLogTimeDialog(false))}
        //         />
        //     )
        // }
    }

    const Content = () => {
        if (loadingProject) {
            return <Box display="flex" justifyContent="center"><CircularProgress/></Box>
        } else if (project !== null) {
            return (
                <div style={{textAlign: "left", marginTop: "15px"}}>
                    <Stack direction="row" spacing={1}>
                        <Link to={`/projects/${id}`} style={{textDecoration: "none"}}>
                            <Button size={"large"}
                                    color={"primary"}
                                    variant={"contained"}
                            >
                                Back to project
                            </Button>
                        </Link>
                        <Link to={`/projects/${id}/log-times`} style={{textDecoration: "none"}}>
                            < Button
                                size={"large"}
                                color={"primary"}
                                variant={"contained"}

                            >
                                Full log time history
                            </Button>
                        </Link>
                        <Button
                            size={"large"}
                            color={"success"}
                            variant={"contained"}
                            onClick={() => setShowCreateUpdateTicketDialog(true)}
                            disabled={projectStatuses.length === 0 || loadingProjectStatuses}
                        >
                            {loadingProjectStatuses ? "Loading..." : "Add ticket"}
                        </Button>
                        {
                            currentUser.id === project.creator.id ?
                                <>
                                    < Button
                                        size={"large"}
                                        color={"success"}
                                        variant={"contained"}
                                        onClick={() => setShowCreateUpdateProjectStatusDialog(true)}
                                        disabled={projectStatuses.length === 10 || loadingProjectStatuses}
                                    >
                                        {loadingProjectStatuses ? "Loading..." : "Add column"}
                                    </Button>
                                </>
                                :
                                null
                        }
                    </Stack>
                </div>
            )
        } else {
            return <h1>Project not found!</h1>
        }

    }

    return (
        <div>
            {showModals()}
            <NavigationBar/>
            <Container maxWidth={false} style={{padding: "0 12px 0 12px"}}>
                <Content/>
                {
                    project !== null ?
                        <div>
                            <hr/>
                            <Board/>
                        </div>
                        :
                        null
                }
            </Container>
        </div>
    );
}

export default ProjectBoardPage;