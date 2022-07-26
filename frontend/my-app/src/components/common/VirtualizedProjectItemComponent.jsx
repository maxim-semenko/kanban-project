import * as React from 'react';
import {Button, CardActions, CardContent, Typography} from "@mui/material";
import Card from "@mui/material/Card";
import {Link} from "react-router-dom";

export default function VirtualizedProjectItemComponent(props) {
    // const dispatch = useDispatch()
    // const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false)
    //
    // const handleRemovePost = (id) => {
    //     dispatch(getProjectById(id))
    //     setShowDeleteProjectModal(true)
    // }
    //
    // const showModals = () => {
    //     if (showDeleteProjectModal) {
    //         return (
    //             <CreateUpdateProjectModal
    //                 show={showDeleteProjectModal}
    //                 close={() => setShowDeleteProjectModal(false)}
    //             />
    //         )
    //     }
    // }

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
                    <b>Created date:</b> {props.project.createdDate}
                </Typography>
            </CardContent>
            <CardActions>
                <Link to={`/project/${props.project.id}`} style={{textDecoration: 'none'}}>
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