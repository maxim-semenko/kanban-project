import React, {useState} from 'react'
import {Alert, Button, Collapse, Form, Modal} from "react-bootstrap"
import {Cookies} from "react-cookie"
import UserValidator from "../../validator/UserValidator";
import AuthService from "../../service/AuthService";
import {useNavigate} from "react-router-dom";

function SignInModal(props) {
    const navigate = useNavigate();
    const cookies = new Cookies()

    // Values
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Values errors
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    // Global error of Sign in
    const [showError, setShowError] = useState(false)
    const [textError, setTextError] = useState('')


    /**
     * Method that set email value.
     * @param event input event
     */
    const changeEmailHandler = (event) => {
        setEmailError('')
        setEmail(event.target.value)
    }

    /**
     * Method that set password value.
     * @param event input event
     */
    const changePasswordHandler = (event) => {
        setPasswordError('')
        setPassword(event.target.value)
    }

    /**
     * Method that handle user's login.
     * @param event button event
     */
    const handleSubmit = (event) => {
        event.preventDefault()
        if (!findFormErrors()) {
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

                    // setTimeout(function () {
                    //     navigate('/profile');
                    // }, 1000);
                    props.onHide()
                })
                .catch(error => {
                    console.log(error.response.data)
                    setShowError(true)
                    if (error.response.status === 404) {
                        setTextError("Error! Your account was not found. Try again.")
                    } else if (error.response.status === 401) {
                        setTextError("Error! Your username or password is not correct. Try again.")
                    }
                })
        }
    }

    /**
     * Method that find all errors in input form.
     * @returns {boolean}
     */
    const findFormErrors = () => {
        let isErrors = false

        let errors = UserValidator.validateAllForSignIn(email, password)
        setEmailError(errors.emailError)
        setPasswordError(errors.passwordError)

        for (let key in errors) {
            if (errors[key] !== '') {
                isErrors = true
            }
        }

        return isErrors
    }

    const closeModal = () => {
        props.onHide()
    }

    return (
        <Modal{...props} size="lg"
              dialogClassName="modal-90w public-profile-modal-class"
              aria-labelledby="example-custom-modal-styling-title"
              className="special_modal">
            <Modal.Header closeButton>
                <Modal.Title>Sign In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Collapse in={showError}>
                    <div>
                        <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
                            <Alert.Heading>Sign In error</Alert.Heading>
                            <p>{textError}</p>
                        </Alert>
                    </div>
                </Collapse>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label><b>Email</b></Form.Label>
                        <Form.Control
                            className="my-input"
                            type="text"
                            placeholder="Input your email"
                            autoComplete="off"
                            onChange={changeEmailHandler}
                            isInvalid={emailError !== ''}
                        />
                        <Form.Control.Feedback type='invalid'>{emailError}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label><b>Password</b></Form.Label>
                        <Form.Control
                            className="my-input"
                            type="password"
                            placeholder="Input your password"
                            autoComplete="off"
                            onChange={changePasswordHandler}
                            isInvalid={passwordError !== ''}
                        />
                        <Form.Control.Feedback type='invalid'>{passwordError}</Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={closeModal}><b>Cancel</b></Button>
                <Button variant="outline-primary" type="submit" onClick={handleSubmit}><b>Sign In</b></Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SignInModal