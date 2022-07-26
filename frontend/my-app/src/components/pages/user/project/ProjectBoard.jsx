import React, {useEffect, useState} from 'react';
import NavigationBar from "../../../common/NavigationBar";
import ProjectStatusesService from "../../../../service/ProjectStatusesService";
import {Link, useParams} from "react-router-dom";
import {Button, ButtonGroup, Card, CardHeader, Container, Grid, IconButton} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';

function ProjectBoard(props) {
    const {id} = useParams();

    const [projectColumns, setProjectColumns] = useState([])
    const [divWidth, setDivWidth] = useState(0);

    useEffect(() => {
        ProjectStatusesService.getAllProjectStatusesByProjectId(0, 0, id)
            .then(response => {
                setProjectColumns(response.data.content)
                setDivWidth((response.data.totalElements) * 285 + (response.data.totalElements) * 16);
            })
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
                        <Button size={"large"} color={"success"} style={{borderRadius: "0px"}}>
                            Add task
                        </Button>
                    </ButtonGroup>
                </div>
                <hr/>

                <Grid container spacing={2} style={{marginBottom: "20px"}}>
                    <Grid item xs={12} md={12}>
                        <div className="column-wrapper">
                            <div style={{marginLeft: "0px", marginTop: "10px", width: divWidth}}>
                                {projectColumns.map((column, index) => (
                                    <>
                                        <div className="card-column" key={index}>
                                            <Card>
                                                <CardHeader
                                                    title={<b>{column.name} </b>}
                                                    subheader={<span>0/{column.limitTotalTask}</span> }
                                                    action={
                                                        <IconButton aria-label="settings">
                                                            <MoreVertIcon />
                                                        </IconButton>
                                                    }
                                                    style={{textTransform: "uppercase", textOverflow: "ellipsis"}}
                                                    className={"stage-header"}
                                                />
                                                {/*<CardActions>*/}
                                                {/*    <DeleteIcon*/}
                                                {/*        color={"error"}*/}
                                                {/*        style={{cursor: "pointer"}}*/}
                                                {/*        onClick={() => deleteColumn(column.name)}*/}
                                                {/*    />*/}
                                                {/*</CardActions>*/}
                                            </Card>
                                        </div>
                                    </>
                                ))}
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default ProjectBoard;