import React from 'react';
import {Avatar, Container, CssBaseline, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Copyright from "../../common/Copyright";
import RegisterForm from "./form/RegisterForm";

const RegisterPage = () => {
    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline/>
            <Box sx={boxStyle}>
                <Avatar sx={avatarStyle}/>
                <Typography component="h1" variant="h5">Sign up</Typography>
                <RegisterForm/>
            </Box>
            {/*<Copyright sx={{mt: 4}}/>*/}
        </Container>
    );
};

export default RegisterPage;

const boxStyle = {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}

const avatarStyle = {
    m: 1,
    bgcolor: 'secondary.main'
}