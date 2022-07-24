import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import InfiniteScroll from "react-infinite-scroll-component";
import {Button, CardActions, CardContent, CircularProgress, Typography} from "@mui/material";
import Card from "@mui/material/Card";

export default function VirtualizedListOneItemComponent(props) {
    return (
        <div>
            <InfiniteScroll
                dataLength={props.list.length}
                next={props.scrollEvent}
                hasMore={props.hasNext}
                loader={<h4 style={{paddingLeft: "29%"}}><CircularProgress/></h4>}
            >
                {
                    props.list.map(project => (
                        <ListItem component="div">
                            <Card sx={{ minWidth: 275 }} style={{backgroundColor: "#c0bdbd", textAlign: "left"}}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        <h1><b>{project.name}</b></h1>
                                    </Typography>
                                    <Typography variant="body2">
                                        <b>Description:</b> {project.description}
                                    </Typography>
                                    <Typography variant="body2">
                                        <b>Creator:</b>{' '}
                                        {project.creator.firstname} {project.creator.lastname}{' '}
                                        ({project.creator.email})
                                    </Typography>
                                    <Typography variant="body2">
                                        <b>Created date:</b> {project.createdDate}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" variant={"contained"}>Learn More</Button>
                                </CardActions>
                            </Card>
                        </ListItem>
                    ))
                }
            </InfiniteScroll>
        </div>
    );
}