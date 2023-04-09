import * as React from 'react';
import {Button, CardActions, CardContent, Typography} from "@mui/material";
import Card from "@mui/material/Card";
import {Link} from "react-router-dom";
import dayjs from "dayjs";

export default function VirtualizedProjectItemComponent(props) {
    return (
        <Card sx={{minWidth: 275}}
              style={{
                  backgroundColor: "#c0bdbd",
                  textAlign: "left",
                  marginBottom: "20px"
              }}
        >
            <CardContent>
                <Typography sx={{fontSize: 30}} color="text.secondary" gutterBottom>
                    <b>{props.index + 1}. {props.project.name}</b>
                </Typography>
                <Typography variant="body2">
                    <b>Description:</b> {props.project.description}
                </Typography>
                <Typography variant="body2">
                    <b>Creator:</b>{' '}
                    {props.project.creator.firstname} {props.project.creator.lastname}{' '}
                    ({props.project.creator.email})
                </Typography>
                <Typography variant="body2">
                    <b>Created:</b> {dayjs(props.project.createdDate).format('MMMM D YYYY, h:mm A')}
                </Typography>
            </CardContent>
            <CardActions>
                <Link to={`/projects/${props.project.id}`} style={{textDecoration: 'none'}}>
                    <Button
                        size="small"
                        variant={"contained"}
                        style={{marginRight: "8px"}}
                    >
                        More
                    </Button>
                </Link>
                {
                    props.isCreator ?
                        <>
                            <Button
                                size="small"
                                variant={"contained"}
                                color={"error"}
                                onClick={props.handleRemoveProject}
                            >
                                Delete
                            </Button>
                        </>
                        :
                        null
                }
            </CardActions>
        </Card>
    );
}