import React, {useEffect, useRef, useState} from 'react';
import {AppBar, DialogContent, IconButton, TextField, Toolbar, Typography} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {useDispatch, useSelector} from "react-redux";
import {createProject, updateProjectById} from "../../../redux/projects/ProjectAction";
import CloseIcon from '@mui/icons-material/Close';
import ProjectValidator from "../../../validator/ProjectValidator";

function CreateUpdateProjectModal(props) {
    const user = JSON.parse(localStorage.getItem("user"))
    const dispatch = useDispatch()
    const {project, loadingProject} = useSelector(state => state.dataProjects)

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    // Errors
    const [nameError, setNameError] = useState('')
    const [descriptionError, setDescriptionError] = useState('')


    useEffect(() => {
        if (props.method === "update" && project !== null) {
            setName(project.name)
            setDescription(project.description)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [project])


    const handlerChangeName = (event) => {
        setName(event.target.value)
        setNameError('');
    }

    const handlerChangeDescription = (event) => {
        setDescription(event.target.value)
        setDescriptionError('');
    }

    const handleUpdateCreateProject = (event) => {
        event.preventDefault()
        if (!findFormErrors()) {
            if (props.method === "create") {
                const request = {
                    name: name,
                    description: description,
                    creatorId: user.id,
                }
                dispatch(createProject(request))
                    .then(() => {
                        props.onHide()
                    })
            } else {
                const request = {
                    name: name,
                    description: description,
                }
                dispatch(updateProjectById(request, project.id))
                    .then(() => {
                        props.onHide()
                    })
            }
        }
    }

    const findFormErrors = () => {
        let isErrors = false

        let errors = ProjectValidator.validateAll(name, description)
        setNameError(errors.nameError)
        setDescriptionError(errors.descriptionError)

        for (let key in errors) {
            if (errors[key] !== '') {
                isErrors = true
                break;
            }
        }

        return isErrors
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
                        {props.method === "create" ? 'Create project' : 'Update project'}
                    </Typography>
                    <Button
                        onClick={handleUpdateCreateProject}
                        disabled={props.method === "update" && loadingProject}
                        color={"success"}
                        variant={"contained"}
                    >
                        {props.method === "create" ? 'Create' : 'Update'}
                    </Button>
                </Toolbar>
            </AppBar>
            <DialogContent>
                <form style={{width: '100%', marginTop: '24px',}} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="name"
                                variant="outlined"
                                fullWidth
                                label="Project name"
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
                                label="Project description"
                                type="text"
                                multiline
                                rows={5}
                                value={description}
                                error={descriptionError !== ''}
                                helperText={descriptionError ? descriptionError : ''}
                                onChange={handlerChangeDescription}
                            />
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default CreateUpdateProjectModal;