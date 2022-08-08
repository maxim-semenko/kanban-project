import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import {FixedSizeList} from 'react-window';
import ProjectMemberItem from "./ProjectMemberItem";


export default function ProjectMembersList(props) {
    const currentUser = JSON.parse(localStorage.getItem("user"))
    const [members, setMembers] = useState([])

    useEffect(() => {
        let array = props.list.filter(item => item.id !== props.project.creator.id)
        setMembers(array)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function renderRow({data, index, style}) {
        return (
            <ProjectMemberItem
                member={data[index]}
                index={index}
                style={style}
                project={props.project}
                currentUser={currentUser}
                openRemoveDialog={props.openRemoveDialog}
            />
        )
    }

    return (
        <Box
            style={{marginBottom: "20px"}}
            sx={{width: '100%', height: 90 * members.length, bgcolor: 'background.paper'}}
        >
            <ProjectMemberItem
                member={props.project.creator}
                project={props.project}
                currentUser={currentUser}
            />
            <FixedSizeList
                height={90 * members.length}
                itemSize={75}
                itemCount={members.length}
                itemData={members}
                overscanCount={5}
            >
                {renderRow}
            </FixedSizeList>
        </Box>
    );
}