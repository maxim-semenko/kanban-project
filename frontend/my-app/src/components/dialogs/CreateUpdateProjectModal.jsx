import React, {useEffect, useRef, useState} from 'react';
import {
    AppBar,
    Card,
    CardActions,
    CardHeader,
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
import {createProject, updateProjectById} from "../../redux/project/ProjectAction";
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import {getUsersByProjectId, resetData} from "../../redux/user/UserAction";
import ProjectService from "../../service/ProjectService";

function CreateUpdateProjectModal(props) {
    const user = JSON.parse(localStorage.getItem("user"))
    const dispatch = useDispatch()
    const {project, loadingProject} = useSelector(state => state.dataProjects)

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [columns, setColumns] = useState([])

    const [currentColumn, setCurrentColumn] = useState('')
    const [currentLimit, setCurrentLimit] = useState(0)

    const [divWidth, setDivWidth] = useState(0);

    // Errors
    const [nameError, setNameError] = useState('')
    const [descriptionError, setDescriptionError] = useState('')
    const [columnsError, setColumnsError] = useState('')
    const [currentLimitError, setCurrentLimitError] = useState('')

    // ------
    const currentColumnInputRef = useRef(null);

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

    const handlerChangeCurrentColumn = (event) => {
        setCurrentColumn(event.target.value)
        setColumnsError('');
    }

    const handlerChangeCurrentLimit = (event) => {
        setCurrentLimit(event.target.value)
        setCurrentLimitError('');
    }

    const handleUpdateCreateProject = (event) => {
        if (props.method === "create") {
            const request = {
                name: name,
                description: description,
                creatorId: user.id,
                projectStatuses: columns
            }

            console.log(request)

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

    const addColumn = () => {
        let isError = false;

        if (currentColumn.length < 1) {
            setColumnsError("The min size column name is 2!")
            isError = true
        } else if (columns.includes(currentColumn)) {
            setColumnsError("The name is already exists!")
            isError = true
        }

        if (currentLimit < 1 || currentLimit > 100) {
            setCurrentLimitError("The limit must be between 1 and 100!")
            isError = true
        }

        if (!isError) {
            if (columns.length < 10) {
                let obj = {name: currentColumn, limit: currentLimit}
                setColumns([...columns, obj]);
                setCurrentColumn("")
                setDivWidth((columns.length + 1) * 273 + (columns.length + 1) * 16);
            } else {
                setColumnsError("The max size of columns is 10!")
                setCurrentLimitError("  ")
            }
        }
    }

    const deleteColumn = (name) => {
        setColumns(columns.filter(item => item.name !== name));
    }

    const showCreateColumns = () => {
        if (props.method === "create") {
            return (
                <Grid item xs={12}>
                    <h6>Project columns (keep order)</h6>
                    <Grid container>
                        <Grid item xs={9} md={9} lg={8.8}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Column name"
                                autoComplete="off"
                                value={currentColumn}
                                inputRef={currentColumnInputRef}
                                error={columnsError !== ''}
                                helperText={columnsError ? columnsError : ''}
                                onChange={handlerChangeCurrentColumn}
                            />
                        </Grid>
                        <Grid item xs={2} md={2} lg={2.5}>
                            <TextField
                                InputProps={{inputProps: {min: 0, max: 100}}}
                                type={"number"}
                                variant="outlined"
                                fullWidth
                                label="Column task limit"
                                autoComplete="off"
                                value={currentLimit}
                                error={currentLimitError !== ''}
                                helperText={currentLimitError ? currentLimitError : ''}
                                onChange={handlerChangeCurrentLimit}
                            />
                        </Grid>
                        <Grid item alignItems="stretch" style={{display: "flex", maxHeight: "55px"}}>
                            <Button
                                color="primary"
                                variant="contained"
                                // disabled={sendingMail}
                                onClick={addColumn}
                            >
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                    <div className="column-wrapper">

                        <div style={{marginLeft: "0px", marginTop: "10px", width: divWidth}}>
                            {columns.map((column, index) => (
                                <>
                                    <div className="card-column" key={index} style={{width: "277px"}}>
                                        <Card>
                                            <CardHeader
                                                title={<h6><b>{index + 1}{'. '} {column.name}</b></h6>}
                                                subheader={<span>0/{column.limit}</span>}
                                                style={{textTransform: "uppercase", textOverflow: "ellipsis"}}
                                                className={"stage-header"}
                                            />
                                            <CardActions>
                                                <DeleteIcon
                                                    color={"error"}
                                                    style={{cursor: "pointer"}}
                                                    onClick={() => deleteColumn(column.name)}
                                                />
                                            </CardActions>
                                        </Card>
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>
                </Grid>
            )
        }
    }

    return (
        <Dialog open={props.show} onClose={props.onHide} fullWidth maxWidth="lg">
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
                        {showCreateColumns()}
                    </Grid>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default CreateUpdateProjectModal;