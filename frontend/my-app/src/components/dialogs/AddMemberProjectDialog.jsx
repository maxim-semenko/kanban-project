import React, {useState} from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {
    CircularProgress,
    DialogActions,
    DialogContent,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from "@mui/material";
import Button from "@mui/material/Button";
import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import UserService from "../../api/UserService";
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import MyAvatar from "../common/MyAvatar";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {addUserToProjectByProjectId} from "../../redux/user/UserAction";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.10),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.15),
    },
    marginRight: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
}));

export default function AddMemberProjectDialog(props) {
    const {id} = useParams();
    const {users} = useSelector(state => state.dataUsers)
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [usersBySearch, setUsersBySearch] = useState([])
    const [loading, setLoading] = useState(false)
    const [isSearched, setIsSearched] = useState(false)

    const changeEmailHandler = (event) => {
        setEmail(event.target.value)
    }

    const searchHandle = () => {
        setLoading(true)
        setIsSearched(true)
        UserService.getAllByEmail(email, 0, 10)
            .then(response => {
                setUsersBySearch(response.data.content)
            })
            .finally(() => setLoading(false))
    }

    const addMember = (member) => {
        dispatch(addUserToProjectByProjectId(id, member))
    }

    const showAddMemberButton = (user) => {
        return (
            <IconButton edge="end">
                <Button color={"success"}
                        variant={"contained"}
                        disabled={users.find(item => item.id === user.id)}
                        onClick={() => addMember(user)}
                >
                    Add member
                </Button>
            </IconButton>
        )
    }

    const ResultList = () => {
        if (loading) {
            return (
                <Box display="flex" justifyContent="center">
                    <CircularProgress/>
                </Box>
            )
        } else if (usersBySearch.length === 0 && isSearched) {
            return (
                <Box display="flex" justifyContent="center">
                    Not found...
                </Box>
            )
        } else {
            return (
                <div>
                    {
                        usersBySearch.map((user, index) => {
                            return (
                                <ListItem key={index}
                                          disablePadding
                                          secondaryAction={showAddMemberButton(user)}
                                >
                                    <ListItemButton>
                                        <ListItemAvatar>
                                            <MyAvatar name={`${user.firstname} ${user.lastname}`}/>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <b>
                                                    {user.firstname}{' '}{user.lastname}{' '}
                                                    ({user.email})
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
                                                        {user.speciality}
                                                    </Typography>
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItemButton>
                                </ListItem>
                            )
                        })
                    }
                </div>
            )
        }
    }

    return (
        <Dialog open={props.show} onClose={props.onHide} fullWidth maxWidth="md">
            <DialogTitle>Add member</DialogTitle>
            <DialogContent style={{padding: "0px"}}>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon/>
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search by email…"
                        value={email}
                        onChange={changeEmailHandler}
                        inputProps={{'aria-label': 'search'}}
                    />
                </Search>
                <div style={{padding: "0 1.9% 0% 2.5%"}}>
                    <List sx={{width: '100%', maxWidth: '100%', bgcolor: 'background.paper'}}>
                        {ResultList()}
                    </List>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onHide} color={"success"} variant={"contained"}>
                    Close
                </Button>
                <Button
                    onClick={searchHandle}
                    // disabled={loadingProject}
                    color={"primary"}
                    variant={"contained"}
                >
                    Search
                </Button>
            </DialogActions>
        </Dialog>
    );
}

