import React, {useContext, useState} from "react";
import {BoardContext} from "./Board";
import {Card} from "react-bootstrap";

const initialEditedValues = {
    title: "",
    description: "",
    startDate: new Date(),
    endDate: new Date()
};

function CardItem(props) {
    const [show, setShow] = useState(false);
    const [editedValues, setFormValues] = useState(initialEditedValues);
    const handleClose = () => setShow(false);
    const {taskState, onDeletingTask, onUpdatingTask} = useContext(BoardContext);

    const handleShow = () => {
        setShow(true);
    };

    const clickHandler = (type) => {
        if (type === "edit") {
            var formValues = taskState.find((task) => {
                return task.id === props.task.id;
            });
            setFormValues(formValues);
            handleShow();
        } else if (type === "delete") {
            onDeletingTask(props.task.id);
        }
    };

    const handleUpdate = (values, submitProps) => {
        submitProps.setSubmitting(false);
        onUpdatingTask(values);
        setShow(false);
        submitProps.resetForm();
    };

    return (
        <>
            <Card key={props.task.id} className="card-task">
                <Card.Body>
                    <Card.Title>{props.task.title}{" "}</Card.Title>

                    {/*    CONTENT*/}
                    <div className="card-task-option pull-right">
                        <a onClick={() => clickHandler("edit")}>
                            {/*<i className="fas fa-edit"></i>*/}
                            edit
                        </a>
                        &nbsp;
                        <a onClick={() => clickHandler("delete")}>
                            {/*<i className="fas fa-trash"></i>*/}
                            delete
                        </a>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
}

export default CardItem;
