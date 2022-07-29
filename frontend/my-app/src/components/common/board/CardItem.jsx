import React from "react";
import {Button, Card, CardActions, CardContent, CardHeader, IconButton, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import dayjs from 'dayjs';

function CardItem(props) {

    return (
        <>
            <Card key={props.task.id} className="card-task" style={{textAlign: "left"}}>
                <CardHeader
                    title={
                        <b style={{fontSize: 18}} color="text.secondary" gutterBottom>
                            {props.task.name}
                        </b>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon/>
                        </IconButton>
                    }
                    style={{paddingBottom: "0px", textAlign: "left"}}
                />
                <CardContent style={{paddingTop: "0px"}}>
                    <Typography variant="body2">
                        Description: {props.task.description}
                        <br/>
                        Created: {dayjs(props.task.createdDate).format('MMMM D YYYY, h:mm A')}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" variant={"contained"}>More</Button>
                </CardActions>
            </Card>
        </>
    );
}

export default CardItem;
