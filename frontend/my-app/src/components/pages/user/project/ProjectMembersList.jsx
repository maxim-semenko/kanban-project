import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {FixedSizeList} from 'react-window';
import {Avatar, Button, IconButton, ListItemAvatar, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";


export default function ProjectMembersList(props) {

    function renderRow({data, index, style}) {
        const member = data[index];

        return (
            <ListItem
                style={style}
                key={index}
                component="div"
                disablePadding
                secondaryAction={
                    props.project.creator.id !== member.id ?
                        <IconButton edge="end">
                            <Button color={"error"} variant={"contained"}>
                                Delete member
                            </Button>
                            {/*<DeleteIcon*/}
                            {/*    // onClick={() => handleRemoveComment(comment.id)}*/}
                            {/*/>*/}
                        </IconButton>
                        :
                        null
                }
            >
                <ListItemButton>
                    <ListItemAvatar><Avatar/></ListItemAvatar>
                    <ListItemText
                        primary={
                            <b>
                                {member.firstname}{' '}{member.lastname}{' '}
                                {props.project.creator.id === member.id ? '(Creator)' : ''}
                            </b>
                        }
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{display: 'inline'}}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {member.speciality}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItemButton>
            </ListItem>
        );
    }

    return (
        <Box
            style={{marginBottom: "20px"}}
            sx={{width: '100%', height: 400, bgcolor: 'background.paper'}}
        >
            <FixedSizeList
                height={460}
                itemSize={75}
                itemCount={props.list.length}
                itemData={props.list}
                overscanCount={5}
            >
                {renderRow}
            </FixedSizeList>
        </Box>
    );
}