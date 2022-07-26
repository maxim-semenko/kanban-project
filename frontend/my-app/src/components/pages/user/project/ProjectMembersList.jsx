import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {FixedSizeList} from 'react-window';
import {Avatar, ListItemAvatar, Typography} from "@mui/material";


export default function ProjectMembersList(props) {

    function renderRow({data, index, style}) {
        const member = data[index];

        return (
            <ListItem style={style} key={index} component="div" disablePadding>
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