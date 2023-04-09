import React, {useState} from 'react';
import {Form, Formik} from "formik";
import {Button, CircularProgress, TextField} from "@mui/material";
import * as yup from "yup";
import RegisterFormBottom from './RegisterFormBottom';
import Grid from "@mui/material/Grid";
import AuthService from "../../../../api/AuthService";
import {Alert, Collapse} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {Cookies} from "react-cookie";

const RegisterForm = () => {

    const initialValues = {
        firstname: '',
        lastname: '',
        speciality: '',
        email: '',
        password: '',
    }

    const validationSchema = yup.object().shape({
        firstname: yup.string().required('Firstname cannot be empty').min(2),
        lastname: yup.string().required('Lasttname cannot be empty').min(2),
        speciality: yup.string().required('Speciality cannot be empty').min(2),
        email: yup.string().required('Email cannot be empty').min(1).email("Email not valid"),
        password: yup.string().required('Password cannot be empty').min(8),
    })

    const navigate = useNavigate();
    const cookies = new Cookies()

    const [showError, setShowError] = useState(false)
    const [textError, setTextError] = useState('')
    const [isClicked, setIsClicked] = useState(false)

    const submit = (firstname, lastname, speciality, email, password) => {
        setIsClicked(true)
        let request = {
            firstname: firstname,
            lastname: lastname,
            speciality: speciality,
            email: email,
            password: password
        }
        AuthService.register(request)
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
                setTextError(error.response.data.message)
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
                await submit(values.firstname, values.lastname, values.speciality, values.email, values.password)
                setSubmitting(false)
            }}
        >
            {formik => (
                <Form noValidate>
                    <Collapse in={showError}>
                        <div style={{textAlign: "left"}}>
                            <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
                                <Alert.Heading>Sign Up error</Alert.Heading>
                                <p>{textError}</p>
                            </Alert>
                        </div>
                    </Collapse>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Firstname"
                                defaultValue={formik.values.firstname}
                                onChange={(event) => {
                                    formik.setFieldValue('firstname', event.target.value)
                                }}
                                error={!!formik.errors.firstname} helperText={formik.errors.firstname}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Lastname"
                                defaultValue={formik.values.lastname}
                                onChange={(event) => {
                                    formik.setFieldValue('lastname', event.target.value)
                                }}
                                error={!!formik.errors.lastname} helperText={formik.errors.lastname}
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Speciality"
                        defaultValue={formik.values.speciality}
                        onChange={(event) => {
                            formik.setFieldValue('speciality', event.target.value)
                        }}
                        error={!!formik.errors.speciality} helperText={formik.errors.speciality}
                    />
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
                        sx={{mt: 3, mb: 2}}
                    >
                        {isClicked ? <CircularProgress size={24}/> : "Sign Up"}
                    </Button>
                    <RegisterFormBottom/>
                </Form>
            )}
        </Formik>
    )

};

export default RegisterForm;
