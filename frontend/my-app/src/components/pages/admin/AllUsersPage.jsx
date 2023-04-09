import * as React from 'react';
import {useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {
    getAllUsers,
    resetData,
    setCurrentPage,
    setSizePage,
    updateUserIsNonLockedById,
    updateUserRolesById
} from "../../../redux/user/UserAction";
import {Link} from "react-router-dom";
import dayjs from "dayjs";
import NavigationBar from "../../common/NavigationBar";
import Footer from "../../common/Footer";

const columns = [
    {id: 'number', label: '№', minWidth: 5, align: 'center'},
    {id: 'firstname', label: 'Firstname', minWidth: 150, align: 'center'},
    {id: 'lastname', label: 'Lastname', minWidth: 150, align: 'center'},
    {id: 'email', label: 'Email', minWidth: 150, align: 'center'},
    {id: 'speciality', label: 'Speciality', minWidth: 150, align: 'center'},
    {id: 'createdDate', label: 'Register date', minWidth: 100, align: 'center'},
    {id: 'action', label: 'Action', minWidth: 150, align: 'center'}
];

export default function AllUsersPage() {
    const currentUser = JSON.parse(localStorage.getItem("user"))
    const dispatch = useDispatch()
    const {users, currentPage, sizePage, totalElements} = useSelector(state => state.dataUsers)

    useEffect(() => {
        dispatch(resetData())
    }, [])

    useEffect(() => {
        dispatch(getAllUsers(currentPage, sizePage))
    }, [currentPage, sizePage])

    const handleChangePage = (event, newPage) => {
        dispatch(setCurrentPage(newPage));
    };

    const handleChangeRowsPerPage = (event) => {
        dispatch(setSizePage(+event.target.value));
        dispatch(setCurrentPage(0));
    };

    const updateUserIsNonLocked = (isNonLocked, id) => {
        dispatch(updateUserIsNonLockedById({isNonLocked: isNonLocked}, id))
    }

    const updateUserRoles = (roles, id) => {
        dispatch(updateUserRolesById({roles: roles}, id))
    }

    const showData = (columnId, index, user) => {
        switch (columnId) {
            case 'number':
                return (<div>{index + 1 + sizePage * currentPage}</div>)
            case 'createdDate':
                return (dayjs(user.createdDate).format('DD/MM/YYYY h:mm A'))
            case 'action':
                return (
                    <div>
                        <Button
                            style={{minWidth: "100px"}}
                            variant="contained"
                            color={user.isAccountNonLocked ? "error" : "success"}
                            disabled={currentUser.id === user.id}
                            onClick={
                                user.isAccountNonLocked ?
                                    () => updateUserIsNonLocked(false, user.id) :
                                    () => updateUserIsNonLocked(true, user.id)
                            }
                        >
                            {user.isAccountNonLocked ? 'Block' : 'Unblock'}
                        </Button>
                    </div>
                )
            default:
                return user[columnId]
        }
    }

    return (
        <div>
            <NavigationBar/>
            <div style={{marginTop: "1%"}}>
                <Link to="/administrator" style={{textDecoration: "none"}}>
                    <Button variant="contained" color={"error"} style={{marginBottom: "1%"}} size={"large"}>
                        Back to admin page
                    </Button>{' '}
                </Link>
            </div>
            <TablePagination
                rowsPerPageOptions={[1, 5, 10, 25]}
                component="div"
                count={totalElements}
                rowsPerPage={sizePage}
                page={currentPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth}}
                                >
                                    <b>{column.label}</b>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            users
                                .map((row, index) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {showData(column.id, index, row)}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <br/>
            <Footer/>
        </div>
    );
}
