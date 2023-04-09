import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ColumnItem from "./ColumnItem";
import {getProjectStatusById} from "../../../../../redux/project-statuses/ProjectStatusAction";
import CreateUpdateProjectStatusDialog from "../../../../dialogs/create-update/CreateUpdateProjectStatusDialog";
import RemoveProjectStatusDialog from "../../../../dialogs/remove/RemoveProjectStatusDialog";
import Box from "@mui/material/Box";

function ColumnList() {
    const dispatch = useDispatch()
    const [divWidth, setDivWidth] = useState(0);
    const {projectStatuses} = useSelector(state => state.dataProjectStatuses)

    const [showRemoveProjectStatusDialog, setShowRemoveProjectStatusDialog] = useState(false)
    const [showCreateUpdateProjectStatusDialog, setShowCreateUpdateProjectStatusDialog] = useState(false)

    useEffect(() => {
        // console.log(projectStatuses.length * 285 + projectStatuses.length * 16)
        setDivWidth(projectStatuses.length < 5 ? 1505 : projectStatuses.length * 285 + projectStatuses.length * 17);
    }, [projectStatuses]);


    const showModals = () => {
        if (showRemoveProjectStatusDialog) {
            return (
                <RemoveProjectStatusDialog
                    show={showRemoveProjectStatusDialog}
                    onHide={() => setShowRemoveProjectStatusDialog(false)}
                />
            )
        }
        if (showCreateUpdateProjectStatusDialog) {
            return (
                <CreateUpdateProjectStatusDialog
                    show={showCreateUpdateProjectStatusDialog}
                    onHide={() => setShowCreateUpdateProjectStatusDialog(false)}
                    method={"update"}
                />
            )
        }
    }

    const handleRemoveProjectStatus = (id) => {
        dispatch(getProjectStatusById(id))
        setShowRemoveProjectStatusDialog(true)
    }

    const handleUpdateProjectStatus = (id) => {
        console.log(id)
        dispatch(getProjectStatusById(id))
        setShowCreateUpdateProjectStatusDialog(true)
    }

    return (
        <>
            {showModals()}
            <div className="column-wrapper">
                {
                    projectStatuses.length === 0 ?
                        <Box justifyContent="center"><h1>No columns here...</h1></Box>
                        : null
                }
                <div style={{width: divWidth}}>
                    {projectStatuses.map((column, index) => (
                        <ColumnItem
                            key={index}
                            column={column}
                            handleUpdateProjectStatus={() => handleUpdateProjectStatus(column.id)}
                            handleRemoveProjectStatus={() => handleRemoveProjectStatus(column.id)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default ColumnList;
