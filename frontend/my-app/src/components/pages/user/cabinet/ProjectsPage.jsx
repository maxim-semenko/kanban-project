import React, {useEffect, useState} from 'react';
import CabinetProjectList from "./CabinetProjectList";
import NavigationBar from "../../../common/NavigationBar";
import {Col, Container, Row} from "react-bootstrap";
import Grid from "@mui/material/Grid";
import ImageProfile from "./ImageProfile";
import AboutProfile from "./AboutProfile";
import {Button} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Footer from "../../../common/Footer";
import {useDispatch} from "react-redux";
import {getAllProjectsByUserId, resetData} from "../../../../redux/projects/ProjectAction";
import CreateUpdateProjectModal from "../../../dialogs/create-update/CreateUpdateProjectModal";

const ProjectsPage = () => {

    const user = JSON.parse(localStorage.getItem("user"))
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(resetData())
        dispatch(getAllProjectsByUserId(0, 5, user.id))
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
                <h1 style={{textAlign: "center", marginTop: "15px"}}><b>Projects</b></h1>
                <hr/>
                <Row style={{textAlign: "left", marginTop: "15px"}}>
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
};

export default ProjectsPage;