import React, {useState} from 'react';
import {Form, Formik} from "formik";
import {Button, CircularProgress, TextField} from "@mui/material";
import * as yup from "yup";
import LoginFormBottom from "./LoginFormBottom";
import AuthService from "../../../../api/AuthService";
import {useNavigate} from "react-router-dom";
import {Cookies} from "react-cookie";
import {Alert, Collapse} from "react-bootstrap";

const LoginForm = () => {

    const navigate = useNavigate();
    const cookies = new Cookies()
    const [isClicked, setIsClicked] = useState(false)

    const initialValues = {
        email: '',
        password: ''
    }

    const validationSchema = yup.object().shape({
        email: yup.string().required('Email cannot be empty').min(1).email("Email not valid"),
        password: yup.string().required('Password cannot be empty').min(8)
    })

    const [showError, setShowError] = useState(false)
    const [textError, setTextError] = useState('')

    const submit = (email, password) => {
        setIsClicked(true)
        const request = {
            email: email,
            password: password,
        }
        AuthService.login(request)
            .then(response => {
                console.log(response.data)

                localStorage.setItem("user", JSON.stringify(response.data.user))
                cookies.set("token", response.data.token, {
                    path: "/",
                    sameSite: "strict",
                    maxAge: 86400000
                })
                navigate('/');
            })
            .catch(error => {
                console.log(error.response.data)
                setShowError(true)
                if (error.response.status === 404) {
                    setTextError("Account was not found. Try again.")
                } else if (error.response.status === 401) {
                    setTextError("Password is not correct. Try again.")
                }
                setIsClicked(false)
            })
    }


    return (
        <Formik
            validateOnChange={false}
            validateOnBlur={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, {setSubmitting}) => {
                setSubmitting(true)
                await submit(values.email, values.password)
                setSubmitting(false)
            }}
        >
            {formik => (
                <Form noValidate>
                    <Collapse in={showError}>
                        <div style={{textAlign: "left"}}>
                            <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
                                <Alert.Heading>Sign In error</Alert.Heading>
                                <p>{textError}</p>
                            </Alert>
                        </div>
                    </Collapse>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email"
                        defaultValue={formik.values.email}
                        onChange={(event) => {
                            formik.setFieldValue('email', event.target.value)
                        }}
                        error={!!formik.errors.email} helperText={formik.errors.email}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        defaultValue={formik.values.password}
                        onChange={(event) => {
                            formik.setFieldValue('password', event.target.value)
                        }}
                        error={!!formik.errors.password} helperText={formik.errors.password}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={isClicked}
                        // onClick={() => setIsClicked(true)}
                        sx={{mt: 3, mb: 2}}
                    >
                        {isClicked ? <CircularProgress size={24}/> : "Sign In"}
                    </Button>
                    <LoginFormBottom/>
                </Form>
            )}
        </Formik>
    )
}

export default LoginForm;
