import React, {useEffect} from 'react';
import NavigationBar from "../../../../common/NavigationBar";
import {Link, useParams} from "react-router-dom";
import {Button, ButtonGroup, Container} from "@mui/material";
import Board from "../../../../common/board/Board";
import "../../../../../style/Board.css";
import {useDispatch} from "react-redux";
import {getAllTasksByProjectId} from "../../../../../redux/task/TaskAction";

function ProjectBoard(props) {
    const {id} = useParams();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllTasksByProjectId(id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <NavigationBar/>
            <Container maxWidth={false} style={{padding: "0 12px 0 12px"}}>
                <div style={{textAlign: "left", marginTop: "15px"}}>
                    <ButtonGroup disableElevation variant="contained">
                        <Link to={`/project/${id}`} style={{textDecoration: "none"}}>
                            <Button size={"large"} color={"error"} style={{borderRadius: "0px"}}>
                                Back to project
                            </Button>
                        </Link>
                        <Button size={"large"} color={"primary"} style={{borderRadius: "0px"}}>
                            Add column
                        </Button>
                        <Button size={"large"} color={"success"} style={{borderRadius: "0px"}}>
                            Add task
                        </Button>
                    </ButtonGroup>
                </div>
                <hr/>
                <Board/>
            </Container>
        </div>
    );
}

export default ProjectBoard;