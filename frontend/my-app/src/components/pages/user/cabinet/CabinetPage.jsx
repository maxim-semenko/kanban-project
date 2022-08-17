import React, {useEffect, useState} from 'react';
import NavigationBar from "../../../common/NavigationBar";
import {Col, Container, Row} from "react-bootstrap";
import CreateUpdateProjectModal from "../../../dialogs/CreateUpdateProjectModal";
import AddIcon from "@mui/icons-material/Add";
import {Button} from "@mui/material";
import Grid from "@mui/material/Grid";
import ImageProfile from "./ImageProfile";
import AboutProfile from "./AboutProfile";
import {useDispatch} from "react-redux";
import {getAllProjectByUserId, resetData} from "../../../../redux/project/ProjectAction";
import Footer from "../../../common/Footer";
import CabinetProjectList from "./CabinetProjectList";

function CabinetPage() {
    const user = JSON.parse(localStorage.getItem("user"))
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(resetData())
        dispatch(getAllProjectByUserId(0, 5, user.id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const [showCreateUpdateProjectModal, setShowCreateUpdateProjectModal] = useState(false)

    const showModals = () => {
        if (showCreateUpdateProjectModal) {
            return (
                <CreateUpdateProjectModal
                    show={showCreateUpdateProjectModal}
                    onHide={() => setShowCreateUpdateProjectModal(false)}
                    method={"create"}
                />
            )
        }
    }

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
                <CabinetProjectList/>
            </Container>
            <Footer/>
        </div>
    );
}

export default CabinetPage;