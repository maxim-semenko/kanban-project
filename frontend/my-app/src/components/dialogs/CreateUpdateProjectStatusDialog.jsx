import React, {useEffect, useState} from 'react';
import {
    Alert,
    AppBar,
    CircularProgress,
    Collapse,
    DialogContent,
    IconButton,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {useDispatch, useSelector} from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import Box from "@mui/material/Box";
import {createProjectStatus, updateProjectStatusById} from "../../redux/project-statuses/ProjectStatusAction";
import ProjectStatusValidator from "../../validator/ProjectStatusValidator";
import {useParams} from "react-router-dom";

function CreateUpdateProjectStatusDialog(props) {
    const {id} = useParams();
    const user = JSON.parse(localStorage.getItem("user"))
    const dispatch = useDispatch()
    const {projectStatus, projectStatuses, loadingProjectStatus} = useSelector(state => state.dataProjectStatuses)

    const [name, setName] = useState('')
    const [limit, setLimit] = useState(0)

    // Errors
    const [nameError, setNameError] = useState('')
    const [limitError, setLimitError] = useState('')

    const [showMessage, setShowMessage] = useState(false)
    const [textMessage, setTextMessage] = useState('')
    const [typeMessage, setTypeMessage] = useState('')

    useEffect(() => {
        console.log("CREATE_UPDATE_DIALOG")
        if (props.method === "update" && projectStatus !== null) {
            setName(projectStatus.name)
            setLimit(projectStatus.limitTotalTask)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projectStatus])


    const handlerChangeName = (event) => {
        setName(event.target.value)
        setNameError('');
    }

    const handlerChangeLimit = (event) => {
        setLimit(event.target.value)
        setLimitError('');
    }

    const findFormErrors = () => {
        let isErrors = false

        let errors = ProjectStatusValidator.validateAll(name, limit)
        setNameError(errors.nameError)
        setLimitError(errors.limitError)

        for (let key in errors) {
            if (errors[key] !== '') {
                isErrors = true
                break;
            }
        }

        return isErrors
    }

    const handleUpdateCreateProject = (event) => {
        setShowMessage(false)
        if (!findFormErrors()) {
            const request = {
                name: name,
                limitTotalTask: limit,
                projectId: id
            }
            if (props.method === "create") {
                dispatch(createProjectStatus(request))
                    .then(() => {
                        setTextMessage("You successfully create new column!")
                        setTypeMessage("success")
                    })
                    .catch(error => {
                        setTextMessage("Check your data and try again!")
                        setTypeMessage("error")
                    })
                    .finally(() => setShowMessage(true))
            } else {
                dispatch(updateProjectStatusById(request, projectStatus.id))
                    .then(() => {
                        setTextMessage("You successfully update column!")
                        setTypeMessage("success")
                    })
                    .catch(error => {
                        setTextMessage(error.response.data.message)
                        setTypeMessage("error")
                    })
                    .finally(() => setShowMessage(true))

            }
        }
    }

    return (
        <Dialog open={props.show} onClose={props.onHide} fullWidth maxWidth="sm">
            <AppBar sx={{position: 'relative'}}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={props.onHide}
                        aria-label="close"
                    >
                        <CloseIcon/>
                    </IconButton>
                    <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                        {props.method === "create" ? 'Create column' : 'Update column'}
                    </Typography>
                    <Button
                        onClick={handleUpdateCreateProject}
                        disabled={(props.method === "update" && loadingProjectStatus)
                            || (props.method === "create" && projectStatuses.length === 10)
                        }
                        color={"success"}
                        variant={"contained"}
                    >
                        {props.method === "create" ? 'Create' : 'Update'}
                    </Button>
                </Toolbar>
            </AppBar>
            <DialogContent>
                {
                    loadingProjectStatus && props.method === "update" ?
                        <Box display="flex" justifyContent="center"><CircularProgress/></Box>
                        :
                        <form style={{width: '100%', marginTop: '24px',}} noValidate>
                            <Collapse in={showMessage}>
                                <Alert severity={typeMessage}>{textMessage}</Alert>
                            </Collapse>
                            <br/>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        inputProps={{maxLength: 15}}
                                        variant="outlined"
                                        fullWidth
                                        label="Column name"
                                        autoFocus
                                        autoComplete="off"
                                        value={name}
                                        error={nameError !== ''}
                                        helperText={nameError ? nameError : ''}
                                        onChange={handlerChangeName}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        label="Column task limit"
                                        type="number"
                                        value={limit}
                                        error={limitError !== ''}
                                        helperText={limitError ? limitError : ''}
                                        onChange={handlerChangeLimit}
                                    />
                                </Grid>
                            </Grid>
                        </form>
                }
            </DialogContent>
        </Dialog>
    );
}

export default CreateUpdateProjectStatusDialog;