import React, {useState} from 'react'
import {Alert, Button, Col, Collapse, Form, Modal, Row} from "react-bootstrap"
import UserValidator from "../../../validator/UserValidator";
import AuthService from "../../../api/AuthService";

function SignUpModal(props) {

    // Form's values
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [speciality, setSpeciality] = useState('')

    // Values Errors
    const [firstnameError, setFirstnameError] = useState('')
    const [lastnameError, setLastnameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [specialityError, setSpecialityError] = useState('')


    const [showMessage, setShowMessage] = useState(false);
    const [titleMessage, setTitleMessage] = useState('');
    const [textMessage, setTextMessage] = useState('');
    const [typeMessage, setTypeMessage] = useState('');

    const [isSubmit, setIsSubmit] = useState(false);


    const changePasswordHandler = (event) => {
        setPassword(event.target.value)
        setPasswordError("")
    }

    const changeFirstnameHandler = (event) => {
        setFirstname(event.target.value)
        setFirstnameError("")
    }

    const changeLastnameHandler = (event) => {
        setLastname(event.target.value)
        setLastnameError("")
    }

    const changeEmailHandler = (event) => {
        setEmail(event.target.value)
        setEmailError("")
    }

    const changeSpecialityHandler = (event) => {
        setSpeciality(event.target.value)
        setSpecialityError("")
    }

    /**
     * Method that register by user's params of from input form.
     * @param event
     */
    const register = (event) => {
        event.preventDefault()
        setIsSubmit(true)
        setShowMessage(false)

        if (!findFormErrorsForRegister()) {
            let request = {
                firstname: firstname,
                lastname: lastname,
                speciality: speciality,
                email: email,
                password: password
            }
            console.log(request)
            AuthService.register(request)
                .then(response => {
                    console.log(response.data)
                    setTitleMessage("Everything is great! You have successfully registered!")
                    setTextMessage("The dialog will close automatically after 5 seconds...")
                    setTypeMessage("success")
                    setTimeout(function () {
                        if (props.show) {
                            props.onHide()
                        }
                    }, 5000);
                })
                .catch(error => {
                    console.log(error.response.data)
                    setTitleMessage("Oops! An error has occurred!")
                    setTextMessage(error.response.data.message)
                    setTypeMessage("danger")
                })
                .finally(() => {
                    setShowMessage(true)
                    setIsSubmit(true)
                })
        }
    }

    const findFormErrorsForRegister = () => {
        let isErrors = false
        let errors = UserValidator.validateAllForSignUp(firstname, lastname, email, speciality, password)

        setFirstnameError(errors.firstnameError)
        setLastnameError(errors.lastnameError)
        setEmailError(errors.emailError)
        setSpecialityError(errors.specialityError)
        setPasswordError(errors.passwordError)

        for (let key in errors) {
            if (errors[key] !== '') {
                isErrors = true
            }
        }

        return isErrors
    }

    return (
        <Modal{...props} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Collapse in={showMessage}>
                    <div>
                        <Alert variant={typeMessage} onClose={() => setShowMessage(false)} dismissible>
                            <Alert.Heading>{titleMessage}</Alert.Heading>
                            <p>{textMessage}</p>
                        </Alert>
                    </div>
                </Collapse>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label><b>Firstname</b></Form.Label>
                                <Form.Control className="my-input"
                                              type="text"
                                              placeholder="Input your firstname"
                                              autoComplete="off"
                                              isInvalid={firstnameError !== ''}
                                              onChange={changeFirstnameHandler}
                                />
                                <Form.Control.Feedback type='invalid'>{firstnameError}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label><b>Lastname</b></Form.Label>
                                <Form.Control className="my-input"
                                              type="text"
                                              placeholder="Input your lastname"
                                              autoComplete="off"
                                              isInvalid={lastnameError !== ''}
                                              onChange={changeLastnameHandler}
                                />
                                <Form.Control.Feedback type='invalid'>{lastnameError}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label><b>Email</b></Form.Label>
                                <Form.Control className="my-input"
                                              type="email"
                                              placeholder="Input your email"
                                              autoComplete="off"
                                              isInvalid={emailError !== ''}
                                              onChange={changeEmailHandler}
                                />
                                <Form.Control.Feedback type='invalid'>{emailError}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label><b>Speciality</b></Form.Label>
                                <Form.Control className="my-input"
                                              type="text"
                                              placeholder="Input your speciality"
                                              autoComplete="off"
                                              isInvalid={specialityError !== ''}
                                              onChange={changeSpecialityHandler}
                                />
                                <Form.Control.Feedback type='invalid'>{specialityError}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label><b>Password</b></Form.Label>
                        <Form.Control className="my-input"
                                      type="password"
                                      placeholder="Input your password"
                                      autoComplete="off"
                                      isInvalid={passwordError !== ''}
                                      onChange={changePasswordHandler}
                        />
                        <Form.Control.Feedback type='invalid'>{passwordError}</Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={props.onHide}><b>Cancel</b></Button>
                <Button variant="outline-success" type="submit" onClick={register}><b>Sign Up</b></Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SignUpModal
