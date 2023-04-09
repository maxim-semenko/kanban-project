import React from 'react';
import {Avatar, Container, CssBaseline, Typography} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Box from "@mui/material/Box";
import LoginForm from "./form/LoginForm";
import Copyright from "../../common/Copyright";

const LoginPage = () => {
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box sx={{
                marginTop: 14,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}><LockOutlinedIcon/></Avatar>
                <Typography component="h1" variant="h5">Sign in</Typography>
                <LoginForm/>
            </Box>
            {/*<Copyright sx={{mt: 4, mb: 4}}/>*/}
        </Container>
    );
};

export default LoginPage;