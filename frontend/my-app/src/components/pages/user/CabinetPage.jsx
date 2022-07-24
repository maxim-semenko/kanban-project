import React, {useState} from 'react';
import NavigationBar from "../../common/NavigationBar";
import {Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import CreateUpdateProjectModal from "../../dialogs/CreateUpdateProjectModal";
import AddIcon from "@mui/icons-material/Add";
import {Button} from "@mui/material";
import {styled} from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import ImageProfile from "./ImageProfile";
import AboutProfile from "./AboutProfile";

function CabinetPage() {
    const user = JSON.parse(localStorage.getItem("user"))

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

    const Item = styled(Button)(({theme}) => ({
        padding: theme.spacing(1),
        textAlign: 'center',
        color: 'rgb(33,33,33)'
    }));

    return (
        <div>
            {showModals()}
            <NavigationBar/>
            <Container className="main-container">
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
                        {/*<b>{user.firstname} {user.lastname} ({user.email})</b>*/}
                        {/*<Stack*/}
                        {/*    direction="row"*/}
                        {/*    divider={<Divider orientation="vertical" flexItem/>}*/}
                        {/*    spacing={2}*/}
                        {/*>*/}
                        {/*    <Item>{user.firstname}</Item>*/}
                        {/*    <Item>{user.lastname}</Item>*/}
                        {/*    <Item>{user.email}</Item>*/}
                        {/*</Stack>*/}
                        {/*<h3><b>Firstname: </b>{user.firstname}</h3>*/}
                        {/*<h3><b>Lastname: </b>{user.lastname}</h3>*/}
                        {/*<h3><b>Email: </b>{user.email}</h3>*/}
                        {/*<h3><b>Speciality: </b>{user.speciality}</h3>*/}
                        {/*<Link to="/cabinet/edit" style={{textDecoration: 'none'}}>*/}
                        {/*    <Button variant="contained" size="lg">*/}
                        {/*        <b>Edit account</b>*/}
                        {/*    </Button>*/}
                        {/*</Link>*/}
                    </Col>
                    <div className="d-grid gap-2" style={{paddingTop: "3%"}}>
                        {/*<Link to="/cabinet/appointment-doctor">*/}
                        {/*<Button*/}
                        {/*    variant="success"*/}
                        {/*    size="lg"*/}
                        {/*    style={{width: "100%"}}*/}
                        {/*    onClick={() => setShowCreateUpdateProjectModal(true)}*/}
                        {/*>*/}
                        {/*    Create project*/}
                        {/*</Button>*/}
                        <Button fullWidth
                                variant="contained"
                                startIcon={<AddIcon/>}
                                style={{marginBottom: "10px"}}
                                onClick={() => setShowCreateUpdateProjectModal(true)}
                                color="success"
                        >
                            Create project
                        </Button>
                        {/*</Link>*/}
                    </div>
                </Row>
                <Container>
                    <Link to={"/board"}>
                        Go board
                    </Link>
                    {/*    //////////////////////////////////////*/}


                </Container>
            </Container>
            {/*<Footer/>*/}
        </div>
    );
}

export default CabinetPage;