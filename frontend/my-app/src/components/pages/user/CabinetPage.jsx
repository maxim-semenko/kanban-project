import React, {useEffect, useState} from 'react';
import NavigationBar from "../../common/NavigationBar";
import {Col, Container, Row} from "react-bootstrap";
import CreateUpdateProjectModal from "../../dialogs/CreateUpdateProjectModal";
import AddIcon from "@mui/icons-material/Add";
import {Button, CardActions, CardContent, CircularProgress, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import ImageProfile from "./ImageProfile";
import AboutProfile from "./AboutProfile";
import {useDispatch, useSelector} from "react-redux";
import {getAllProjectByUserId, setCurrentPage} from "../../../redux/project/ProjectAction";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "@mui/material/Card";
import Footer from "../../common/Footer";

function CabinetPage() {
    const user = JSON.parse(localStorage.getItem("user"))
    const dispatch = useDispatch()
    const {projects, loadingProjects, currentPage, sizePage, totalElements} = useSelector(state => state.dataProjects)

    useEffect(() => {
        dispatch(getAllProjectByUserId(0, 2, user.id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const [showCreateUpdateProjectModal, setShowCreateUpdateProjectModal] = useState(false)

    const showModals = () => {
        if (showCreateUpdateProjectModal) {
            return (
                <CreateUpdateProjectModal
                    show={showCreateUpdateProjectModal}
                    onHide={() => setShowCreateUpdateProjectModal(false)}
                />
            )
        }
    }

    const fetchMoreData = () => {
        let page = currentPage + 1;
        dispatch(setCurrentPage(page))
        dispatch(getAllProjectByUserId(page, 2, user.id))
    };

    return (
        <div>
            {showModals()}
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
                    <div className="d-grid gap-2" style={{paddingTop: "3%"}}>
                        <Button fullWidth
                                variant="contained"
                                startIcon={<AddIcon/>}
                                style={{marginBottom: "10px"}}
                                onClick={() => setShowCreateUpdateProjectModal(true)}
                                color="success"
                        >
                            Create project
                        </Button>
                    </div>
                </Row>
                <Grid container style={{marginTop: "1%", width: "100%"}}>
                    {
                        projects.length !== 0 ?
                            <>
                                <div><h5><b>Total projects: {totalElements}</b></h5></div>
                                <Container maxWidth={false} style={{padding: "0 0 0 0"}}>
                                    <InfiniteScroll
                                        dataLength={projects.length}
                                        next={fetchMoreData}
                                        hasMore={projects.length < totalElements}
                                        loader={<h4><CircularProgress/></h4>}
                                    >
                                        {
                                            projects.map((project, index) => (
                                                <Grid item xs={12} md={12} lg={12}>
                                                    <Card sx={{minWidth: 275}}
                                                          style={{
                                                              backgroundColor: "#c0bdbd",
                                                              textAlign: "left",
                                                              marginBottom: "20px"
                                                          }}
                                                    >
                                                        <CardContent>
                                                            <Typography sx={{fontSize: 14}} color="text.secondary"
                                                                        gutterBottom>
                                                                <h1><b>{index + 1}. {project.name}</b></h1>
                                                            </Typography>
                                                            <Typography variant="body2">
                                                                <b>Description:</b> {project.description}
                                                            </Typography>
                                                            <Typography variant="body2">
                                                                <b>Creator:</b>{' '}
                                                                {project.creator.firstname} {project.creator.lastname}{' '}
                                                                ({project.creator.email})
                                                            </Typography>
                                                            <Typography variant="body2">
                                                                <b>Created date:</b> {project.createdDate}
                                                            </Typography>
                                                        </CardContent>
                                                        <CardActions>
                                                            <Button size="small" variant={"contained"}>Learn
                                                                More</Button>
                                                        </CardActions>
                                                    </Card>
                                                </Grid>
                                            ))
                                        }
                                    </InfiniteScroll>
                                </Container>
                            </>
                            :
                            <div>
                                nothing
                            </div>
                    }
                </Grid>
            </Container>
            <Footer/>
        </div>
    );
}

export default CabinetPage;