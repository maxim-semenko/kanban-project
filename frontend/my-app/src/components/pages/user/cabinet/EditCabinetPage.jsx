import React, {useEffect, useState} from 'react';
import NavigationBar from "../../../common/NavigationBar";
import {Col, Container, Row} from "react-bootstrap";
import {Alert, Button, Collapse, IconButton, TextField} from "@mui/material";
import Grid from "@mui/material/Grid";
import Footer from "../../../common/Footer";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import image from "../../../../image/icon2.png"
import {Link} from "react-router-dom";
import UserValidator from "../../../../validator/UserValidator";
import UserService from "../../../../service/UserService";
import CloseIcon from '@mui/icons-material/Close';
import {Cookies} from "react-cookie"

export default function EditCabinetPage() {
    const user = JSON.parse(localStorage.getItem("user"))
    const cookies = new Cookies()

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [speciality, setSpeciality] = useState('')

    const [firstnameError, setFirstnameError] = useState('')
    const [lastnameError, setLastnameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [specialityError, setSpecialityError] = useState('')

    const [showMessage, setShowMessage] = useState(false);
    const [textMessage, setTextMessage] = useState('');
    const [typeMessage, setTypeMessage] = useState('success');


    useEffect(() => {
        setFirstname(user.firstname)
        setLastname(user.lastname)
        setEmail(user.email)
        setSpeciality(user.speciality)
    }, [])

    const handlerChangeFirstname = (event) => {
        setFirstname(event.target.value)
        setFirstnameError('');
    }

    const handlerChangeLastname = (event) => {
        setLastname(event.target.value)
        setLastnameError('');
    }

    const handlerChangeEmail = (event) => {
        setEmail(event.target.value)
        setEmailError('');
    }

    const handlerChangeSpeciality = (event) => {
        setSpeciality(event.target.value)
        setSpecialityError('');
    }

    const findFormErrors = () => {
        let isErrors = false

        let errors = UserValidator.validateForEditUser(firstname, lastname, email, speciality)
        setFirstnameError(errors.firstnameError)
        setLastnameError(errors.lastnameError)
        setEmailError(errors.emailError)
        setSpecialityError(errors.specialityError)

        for (let key in errors) {
            if (errors[key] !== '') {
                isErrors = true
            }
        }

        return isErrors
    }

    const handlerEditProfile = (event) => {
        event.preventDefault()
        setShowMessage(false)
        if (!findFormErrors()) {
            const request = {
                firstname: firstname,
                lastname: lastname,
                email: email,
                speciality: speciality,
            }
            UserService.updateUserById(request, user.id)
                .then(response => {
                    console.log(response.data)
                    localStorage.setItem("user", JSON.stringify(response.data.user))
                    cookies.set("token", response.data.token, {
                        path: "/",
                        sameSite: "strict",
                        maxAge: 86400000
                    })
                    setTypeMessage("success")
                    setTextMessage("Your profile was edited successfully!")
                })
                .catch(error => {
                    console.log(error.response.data)
                    setTypeMessage("error")
                    setTextMessage(error.response.data.message)
                })
                .finally(() => {
                    setShowMessage(true)
                })
        }

    }

    return (
        <div>
            <NavigationBar/>
            <Container className="main-container" style={{paddingBottom: "5%"}}>
                <h1 style={{textAlign: "center", marginTop: "15px"}}><b>Edit profile</b></h1>
                <hr/>
                <Row style={{textAlign: "left", marginTop: "15px"}}>
                    <Col>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12} lg={2}>
                                <Card sx={{maxWidth: 160}}>
                                    <CardMedia
                                        component="img"
                                        height="240"
                                        image={image}
                                        alt="Paella dish"
                                    />
                                    <Button fullWidth
                                            variant="contained"
                                            color="primary"
                                        // startIcon={<CloudUploadIcon/>}
                                            onClick={handlerEditProfile}
                                            style={{marginTop: "1px"}}>
                                        Edit
                                    </Button>
                                    <Link to={"/cabinet"} style={{textDecoration: "none"}}>
                                        <Button fullWidth
                                                variant="contained"
                                                color="error"
                                            // startIcon={<CloudUploadIcon/>}
                                                style={{marginTop: "1px"}}>
                                            Back
                                        </Button>
                                    </Link>

                                </Card>
                            </Grid>
                            <Grid item xs={12} md={12} lg={10}>
                                <div>
                                    <Collapse in={showMessage}>
                                        <Alert
                                            severity={typeMessage}
                                            action={
                                                <IconButton
                                                    color="inherit"
                                                    size="small"
                                                    onClick={() => {
                                                        setShowMessage(false);
                                                    }}
                                                >
                                                    <CloseIcon fontSize="inherit"/>
                                                </IconButton>
                                            }
                                            sx={{mb: 2}}
                                        >
                                            {textMessage}
                                        </Alert>
                                    </Collapse>
                                    <form style={{marginTop: '5px'}} noValidate>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={12}>
                                                <TextField
                                                    name="firstName"
                                                    variant="outlined"
                                                    fullWidth
                                                    label="Firstname"
                                                    autoFocus
                                                    autoComplete="off"
                                                    value={firstname}
                                                    error={firstnameError !== ''}
                                                    helperText={firstnameError ? firstnameError : ''}
                                                    onChange={handlerChangeFirstname}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                <TextField
                                                    variant="outlined"
                                                    fullWidth
                                                    label="Lastname"
                                                    name="lastName"
                                                    autoComplete="off"
                                                    value={lastname}
                                                    error={lastnameError !== ''}
                                                    helperText={lastnameError ? lastnameError : ''}
                                                    onChange={handlerChangeLastname}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    variant="outlined"
                                                    fullWidth
                                                    label="Email"
                                                    name="email"
                                                    autoComplete="off"
                                                    value={email}
                                                    error={emailError !== ''}
                                                    helperText={emailError ? emailError : ''}
                                                    onChange={handlerChangeEmail}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    variant="outlined"
                                                    fullWidth
                                                    id=""
                                                    label="Speciality"
                                                    name="username"
                                                    value={speciality}
                                                    autoComplete="off"
                                                    error={specialityError !== ''}
                                                    helperText={specialityError ? specialityError : ''}
                                                    onChange={handlerChangeSpeciality}
                                                />
                                            </Grid>
                                        </Grid>
                                    </form>
                                </div>
                            </Grid>
                        </Grid>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    );
}
