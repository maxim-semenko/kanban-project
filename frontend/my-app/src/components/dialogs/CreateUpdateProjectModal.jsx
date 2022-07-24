import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";

function CreateUpdateProjectModal(props) {

    const handleSubmit = (event) => {

    }

    return (
        <Modal{...props} size="lg" fullscreen={true}>
            <Modal.Header closeButton>
                <Modal.Title>Create project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/*<Collapse in={showError}>*/}
                {/*    <div>*/}
                {/*        <Alert variant="danger" onClose={() => setShowError(false)} dismissible>*/}
                {/*            <Alert.Heading>Sign In error</Alert.Heading>*/}
                {/*            <p>{textError}</p>*/}
                {/*        </Alert>*/}
                {/*    </div>*/}
                {/*</Collapse>*/}
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label><b>Name</b></Form.Label>
                        <Form.Control
                            className="my-input"
                            type="text"
                            placeholder="Input your username"
                            autoComplete="off"
                            // onChange={changeEmailHandler}
                            // isInvalid={usernameError !== ''}
                        />
                        {/*<Form.Control.Feedback type='invalid'>{usernameError}</Form.Control.Feedback>*/}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label><b>Description</b></Form.Label>
                        <Form.Control
                            className="my-input"
                            type="password"
                            placeholder="Input your password"
                            autoComplete="off"
                            // onChange={changePasswordHandler}
                            // isInvalid={passwordError !== ''}
                        />
                        {/*<Form.Control.Feedback type='invalid'>{passwordError}</Form.Control.Feedback>*/}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={() => props.onHide()}><b>Cancel</b></Button>
                <Button variant="outline-primary" type="submit" onClick={handleSubmit}><b>Create</b></Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateUpdateProjectModal;