import React, {useState} from 'react';
import Grid from "@mui/material/Grid";
import {Container} from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import {CircularProgress} from "@mui/material";
import VirtualizedProjectItemComponent from "../../../common/VirtualizedProjectItemComponent";
import {getAllProjectByUserId, getProjectById, setCurrentPage} from "../../../../redux/project/ProjectAction";
import {useDispatch, useSelector} from "react-redux";
import RemoveProjectDialog from "../../../dialogs/RemoveProjectDialog";
import Box from "@mui/material/Box";

function CabinetProjectList(props) {
    const user = JSON.parse(localStorage.getItem("user"))
    const dispatch = useDispatch()
    const {projects, loadingProjects, currentPage, totalElements} = useSelector(state => state.dataProjects)

    const fetchMoreData = () => {
        let page = currentPage + 1;
        dispatch(setCurrentPage(page))
        dispatch(getAllProjectByUserId(page, 5, user.id))
    };

    const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false)

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

    return (
        <Grid container style={{marginTop: "1%", width: "100%"}}>
            {showModals()}
            {
                projects.length !== 0 ?
                    <>
                        <div><h5><b>Total projects: {totalElements}</b></h5></div>
                        <Container maxwidth={"false"} style={{padding: "0 0 0 0"}}>
                            <InfiniteScroll
                                dataLength={projects.length}
                                next={fetchMoreData}
                                hasMore={projects.length < totalElements}
                                loader={<h4><CircularProgress/></h4>}
                            >
                                {
                                    projects.map((project, index) => (
                                        <Grid item xs={12} md={12} lg={12} key={index}>
                                            <VirtualizedProjectItemComponent
                                                index={index}
                                                project={project}
                                                isCreator={project.creator.id === user.id}
                                                handleRemoveProject={() => handleRemovePost(project.id)}
                                            />
                                        </Grid>
                                    ))
                                }
                            </InfiniteScroll>
                        </Container>
                    </>
                    :
                    <div>
                        {
                            loadingProjects ?
                                <Box display="flex" justifyContent="center">
                                    <CircularProgress style={{marginTop: "15px"}}/>
                                </Box>
                                :
                                <div>Nothing projects here</div>
                        }
                    </div>
            }
        </Grid>

    );
}

export default CabinetProjectList;