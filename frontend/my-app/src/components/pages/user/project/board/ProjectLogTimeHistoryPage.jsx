import * as React from 'react';
import {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from "@mui/material/Button";

import {Link, useParams} from "react-router-dom";
import dayjs from "dayjs";
import {useDispatch, useSelector} from "react-redux";
import NavigationBar from "../../../../common/NavigationBar";
import Footer from "../../../../common/Footer";
import {getAllLogTimesByProjectId, setCurrentPage, setSizePage} from "../../../../../redux/log-times/LogTimeAction";
import UtilService from "../../../../../api/UtilService";
import AboutTicketDialog from "../../../../dialogs/about/AboutTicketDialog";
import {getTicketById} from "../../../../../redux/tickets/TicketAction";
import CreateUpdateLogTimeDialog from "../../../../dialogs/create-update/CreateUpdateLogTimeDialog";
import {setOpenCreateUpdateLogTimeDialog} from "../../../../../redux/dialogs/DialogAction";

const columns = [
    {id: 'number', label: '№', minWidth: 5, align: 'center'},
    {id: 'description', label: 'Description', minWidth: 100, maxWidth: 150, align: 'center'},
    {id: 'startDate', label: 'Start date', minWidth: 50, align: 'center'},
    {id: 'endDate', label: 'End date', minWidth: 50, align: 'center'},
    {id: 'totalTime', label: 'Total time', minWidth: 70, align: 'center'},
    {id: 'user', label: 'User info', minWidth: 250, align: 'center'},
    {id: 'ticket', label: 'ticket info', minWidth: 100, align: 'center'},
];

export default function ProjectLogTimeHistoryPage() {
    const {id} = useParams();
    const currentUser = JSON.parse(localStorage.getItem("user"))
    const dispatch = useDispatch()
    const {logTimes, currentPage, sizePage, totalElements} = useSelector(state => state.dataLogTimes)

    useEffect(() => {
        dispatch(getAllLogTimesByProjectId(id, currentPage, sizePage))
    }, [currentPage, sizePage])

    const handleChangePage = (event, newPage) => {
        dispatch(setCurrentPage(newPage));
    };

    const handleChangeRowsPerPage = (event) => {
        dispatch(setSizePage(+event.target.value));
        dispatch(setCurrentPage(0));
    };

    const [showAboutTicketDialog, setShowAboutTicketDialog] = useState(false)

    const {
        openCreateUpdateLogTimeDialog,
        openRemoveLogTimeDialog,
        methodCreateUpdateLogTimeDialog
    } = useSelector(state => state.dataDialogs)

    const showModals = () => {
        if (showAboutTicketDialog) {
            return (
                <AboutTicketDialog
                    show={showAboutTicketDialog}
                    onHide={() => setShowAboutTicketDialog(false)}
                />
            )
        }
        if (openCreateUpdateLogTimeDialog) {
            return (
                <CreateUpdateLogTimeDialog
                    show={openCreateUpdateLogTimeDialog}
                    onHide={() => dispatch(setOpenCreateUpdateLogTimeDialog(false))}
                    method={methodCreateUpdateLogTimeDialog}
                />
            )
        }
    }

    const handleAboutTicket = (id) => {
        dispatch(getTicketById(id))
        setShowAboutTicketDialog(true)
    }

    const showData = (columnId, index, logTime) => {
        switch (columnId) {
            case 'number':
                return (<div>{index + 1 + sizePage * currentPage}</div>)
            case 'description':
                return (
                    <span style={{whiteSpace: "pre-wrap", maxWidth: "50px", alignContent: "left"}}>
                                {logTime.description}
                    </span>
                )
            case 'startDate':
                return (dayjs(logTime.startDate).format('DD/MM/YYYY h:mm A'))
            case 'endDate':
                return (dayjs(logTime.endDate).format('DD/MM/YYYY h:mm A'))
            case 'totalTime':
                return (UtilService.showDifferenceTime(dayjs(logTime.startDate), dayjs(logTime.endDate)))
            case 'user':
                return <div>
                    <b>Firstname: </b>{logTime.user.firstname}
                    <br/>
                    <b>Lastname: </b>{logTime.user.lastname}
                    <br/>
                    <b>Email: </b>{logTime.user.email}
                    <br/>
                    <b>Speciality: </b>{logTime.user.speciality}
                </div>
            case 'ticket':
                return (
                    <div style={{textAlign: "cetner"}}>
                        <Button variant="contained" onClick={() => handleAboutTicket(logTime.ticket.id)}>
                            Ticket info
                        </Button>
                        {/*<b>Title: </b>{logTime.ticket.title}*/}
                        {/*<br/>*/}
                        {/*<b>Description: </b>*/}
                        {/*{logTime.ticket.description.substring(0, 12).toLowerCase()}*/}
                        {/*{logTime.ticket.description.length > (12) ? '...' : ''}*/}
                        {/*<br/>*/}
                        {/*<b>Priority: </b>*/}
                        {/*<span*/}
                        {/*    style={{*/}
                        {/*        backgroundColor: UtilService.getPriorityColor(logTime.ticket.priority.name),*/}
                        {/*        padding: "2px 10px 2px 10px",*/}
                        {/*        borderRadius: "10px"*/}
                        {/*    }}>*/}
                        {/*        <b>{UtilService.getPriorityName(logTime.ticket.priority.name)}</b>*/}
                        {/*    </span>*/}
                        {/*<br/>*/}
                        {/*<b>Created: </b>{dayjs(logTime.ticket.createdDate).format('DD/MM/YYYY h:mm A')}*/}
                        {/*<br/>*/}
                        {/*<b>Expired: </b>{dayjs(logTime.ticket.expiryDate).format('DD/MM/YYYY h:mm A')}*/}
                    </div>
                )
            default:
                return logTime[columnId]
        }
    }

    return (
        <div>
            {showModals()}
            <NavigationBar/>
            <div style={{marginTop: "1%"}}>
                <Link to={`/projects/${id}/board`} style={{textDecoration: "none"}}>
                    <Button variant="contained" color={"primary"} style={{marginBottom: "1%"}} size={"large"}>
                        Back to project board
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
                            logTimes
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
