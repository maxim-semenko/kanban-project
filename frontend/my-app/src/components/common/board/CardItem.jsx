import React, {useContext, useState} from "react";
import {BoardContext} from "./Board";
import {Card, CardActions, CardContent, Typography} from "@mui/material";
import {Button} from "@mui/material";

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
            const formValues = taskState.find((task) => {
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
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Word of the Day
                    </Typography>
                    <Typography variant="h5" component="div">
                        bwww
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        adjective
                    </Typography>
                    <Typography variant="body2">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
                {/*<Card.Body>*/}
                {/*    <Card.Title>{props.task.title}{" "}</Card.Title>*/}

                {/*    /!*    CONTENT*!/*/}
                {/*    <div className="card-task-option pull-right">*/}
                {/*        <a onClick={() => clickHandler("edit")}>*/}
                {/*            /!*<i className="fas fa-edit"></i>*!/*/}
                {/*            <Button>Edit</Button>*/}

                {/*        </a>*/}
                {/*        &nbsp;*/}
                {/*        <a onClick={() => clickHandler("delete")}>*/}
                {/*            /!*<i className="fas fa-trash"></i>*!/*/}
                {/*            delete*/}
                {/*        </a>*/}
                {/*    </div>*/}
                {/*</Card.Body>*/}
            </Card>
        </>
    );
}

export default CardItem;
