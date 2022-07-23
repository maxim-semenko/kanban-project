import React, {useState} from 'react'
import {Alert, Button, Col, Form, Modal, Row} from "react-bootstrap"
import UserValidator from "../../validator/UserValidator";
import AuthService from "../../service/AuthService";

function SignUpModal(props) {

    // Form's values
    const [password, setPassword] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [passport, setPassport] = useState('')
    const [bloodType, setBloodType] = useState('')
    const [age, setAge] = useState(0)

    // Values Errors
    const [firstnameError, setFirstnameError] = useState('')
    const [lastnameError, setLastnameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [passportError, setPassportError] = useState('')
    const [bloodTypeError, setBloodTypeError] = useState('')
    const [ageError, setAgeError] = useState('')

    const [showSuccess, setShowSuccess] = useState(false);

    const [showError, setShowError] = useState(false);
    const [textError, setTextError] = useState('');


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

    const changePassportHandler = (event) => {
        setPassport(event.target.value)
        setPassportError("")
    }

    const changeBloodTypeHandler = (event) => {
        setBloodType(event.target.value)
        setBloodTypeError("")
    }

    const changeAgeHandler = (event) => {
        setAge(event.target.value)
        setAgeError("")
    }

    /**
     * Method that register by user's params of from input form.
     * @param event
     */
    const register = (event) => {
        event.preventDefault()
        setShowError(false)

        if (!findFormErrorsForRegister()) {
            let request = {
                firstname: firstname,
                lastname: lastname,
                bloodType: bloodType,
                passport: passport,
                age: age,
                email: email,
                password: password
            }
            console.log(request)
            AuthService.register(request)
                .then(response => {
                    console.log(response.data)
                    setShowSuccess(true)
                    setTimeout(function () {
                        if (props.show) {
                            props.onHide()
                        }
                    }, 5000);
                })
                .catch(error => {
                    console.log(error.response.data)
                    if (error.response.status === 409) {
                        setTextError("Пользователь с такой почтой или паспортом уже существует!")
                    }
                    setShowError(true)
                })
        }
    }

    const findFormErrorsForRegister = () => {
        let isErrors = false

        let errors =
            UserValidator.validateAllForSignUp(firstname, lastname, email, passport, bloodType, age, password)

        setFirstnameError(errors.firstnameError)
        setLastnameError(errors.lastnameError)
        setEmailError(errors.emailError)
        setPassportError(errors.passportError)
        setBloodTypeError(errors.bloodTypeError)
        setAgeError(errors.ageError)
        setPasswordError(errors.passwordError)

        for (let key in errors) {
            if (errors[key] !== '') {
                isErrors = true
            }
        }

        return isErrors
    }

    return (
        <Modal{...props} size="lg"
              dialogClassName="modal-90w public-profile-modal-class"
              aria-labelledby="example-custom-modal-styling-title"
              className="special_modal">
            <Modal.Header closeButton>
                <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/*<CSSTransition in={showError} classNames="my-node" timeout={100} unmountOnExit>*/}
                    <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
                        <Alert.Heading>Упс! Возникла ошибка!</Alert.Heading>
                        <p>{textError}</p>
                    </Alert>
                {/*</CSSTransition>*/}
                {/*<CSSTransition in={showSuccess} classNames="my-node" timeout={100} unmountOnExit>*/}
                    <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
                        <Alert.Heading>Все отлично! Вы успешно зарегестрировались!</Alert.Heading>
                        <p>Окно закроется автоматически через 5 секунд...</p>
                    </Alert>
                {/*</CSSTransition>*/}
                <Form>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label><b>Firstname</b></Form.Label>
                                <Form.Control className="my-input"
                                              type="text"
                                              placeholder="Input your firstname"
                                              autoComplete="off"
                                              isInvalid={firstnameError}
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
                                              isInvalid={lastnameError}
                                              onChange={changeLastnameHandler}
                                />
                                <Form.Control.Feedback type='invalid'>{lastnameError}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label><b>Username</b></Form.Label>
                                <Form.Control className="my-input"
                                              type="number"
                                              placeholder="Input your username"
                                              autoComplete="off"
                                              isInvalid={ageError}
                                              onChange={changeAgeHandler}
                                />
                                <Form.Control.Feedback type='invalid'>{ageError}</Form.Control.Feedback>
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
                                              isInvalid={emailError}
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
                                              type="number"
                                              placeholder="Input your speciality"
                                              autoComplete="off"
                                              isInvalid={ageError}
                                              onChange={changeAgeHandler}
                                />
                                <Form.Control.Feedback type='invalid'>{ageError}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label><b>Password</b></Form.Label>
                        <Form.Control className="my-input"
                                      type="password"
                                      placeholder="Input your password"
                                      autoComplete="off"
                                      isInvalid={passwordError}
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