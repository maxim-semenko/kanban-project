import React from 'react';
import {makeStyles} from "@mui/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {Paper} from "@mui/material";
import {Link} from "react-router-dom";
import NavigationBar from "../../common/NavigationBar";
import Footer from "../../common/Footer";

const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(3),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    button: {
        margin: theme.spacing(1),
    },
}));

function AdminProfile() {
    const classes = useStyles();

    return (
        <div>
            <NavigationBar/>
            <Box sx={{display: 'flex'}}>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer}/>
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12} lg={12}>
                                <Paper className={classes.paper}>
                                    <div style={{paddingTop: "0%"}}>
                                        <Link to="/cabinet" style={{textDecoration: "none"}}>
                                            <h1>Cabinet</h1>
                                        </Link>
                                        <hr/>
                                        <Link to="users" style={{textDecoration: "none"}}>
                                            <h1>User's administrations</h1>
                                        </Link>
                                        <hr/>
                                    </div>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            </Box>
            <Footer/>
        </div>
    );
}


export default AdminProfile;