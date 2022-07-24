import React from 'react';
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import {Stack} from "@mui/material";

function AboutProfile(props) {
    return (
        <Grid item xs={12} md={12} lg={10}>
            <h3><b>About:</b></h3>
            <Divider/>
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem/>}
                spacing={2}
            >
            </Stack>
            <h4><b>Firstname: </b>{props.user.firstname}</h4>
            <h4><b>Lastname: </b>{props.user.lastname}</h4>
            <h4><b>Email: </b>{props.user.email}</h4>
            <h4><b>Speciality: </b>{props.user.speciality}</h4>
        </Grid>
    );
}

export default AboutProfile;