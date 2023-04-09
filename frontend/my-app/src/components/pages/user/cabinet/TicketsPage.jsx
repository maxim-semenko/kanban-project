import React, {useEffect} from 'react';
import NavigationBar from "../../../common/NavigationBar";
import {Container} from "react-bootstrap";
import Footer from "../../../common/Footer";
import {useDispatch, useSelector} from "react-redux";
import {getAllTicketsByUserId, resetData} from "../../../../redux/tickets/TicketAction";
import {CardActions, CardContent, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import dayjs from "dayjs";
import UtilService from "../../../../api/UtilService";
import {Link} from "react-router-dom";

const TicketsPage = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const dispatch = useDispatch()
    const {tickets, loadingTickets, currentPage, totalElements} = useSelector(state => state.dataTickets)

    useEffect(() => {
        dispatch(resetData())
        dispatch(getAllTicketsByUserId(user.id))
    }, [])

    return (
        <div>
            <NavigationBar/>
            <Container className="main-container" style={{paddingBottom: "5%"}}>
                <h1 style={{textAlign: "center", marginTop: "15px"}}><b>Tickets</b></h1>
                <hr/>
                <Container maxwidth={"false"} style={{padding: "0 0 0 0"}}>
                    <div style={{textAlign: "left"}}>
                        <h3>Assign to me:</h3>
                        {
                            tickets.length === 0 && loadingTickets === false ?
                                <div>
                                    Nothing tickets there...
                                </div>
                                :
                                null
                        }
                    </div>
                    {
                        tickets.map((ticket, index) => (
                            <Grid item xs={12} md={12} lg={12} key={index}>
                                <Card sx={{minWidth: 275}}
                                      style={{
                                          backgroundColor: "#c0bdbd",
                                          textAlign: "left",
                                          marginBottom: "20px"
                                      }}
                                >
                                    <CardContent>
                                        <Typography sx={{fontSize: 30}} color="text.secondary" gutterBottom>
                                            <b>{index + 1}. {ticket.title}</b>
                                        </Typography>
                                        <Typography variant="body2">
                                            <b>Description: </b> {ticket.description}
                                        </Typography>
                                        <Typography variant="body2">
                                            <div>
                                                <b>Created
                                                    by: </b> {UtilService.capitalizeFirstLetter(ticket.creator.lastname)}
                                                {' '}
                                                {UtilService.capitalizeFirstLetter(ticket.creator.lastname)}{' '}
                                                ({ticket.creator.email})
                                            </div>
                                            <b>Project: </b> <Link to={`/projects/${ticket.project.id}`}>
                                            {ticket.project.name}</Link>
                                            <hr/>
                                            <b>Priority: </b>
                                            <span
                                                style={{
                                                    backgroundColor: UtilService.getPriorityColor(ticket.priority.name),
                                                    padding: "2px 10px 2px 10px",
                                                    borderRadius: "10px"
                                                }}>
                            <b>{UtilService.getPriorityName(ticket.priority.name)}</b>
                        </span>
                                            <br/>
                                            <b>Created:</b> {dayjs(ticket.createdDate).format('MMMM D YYYY, h:mm A')}
                                            <br/>
                                            <b>Expired:</b> {dayjs(ticket.expiredDate).format('MMMM D YYYY, h:mm A')}

                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    }
                </Container>
            </Container>
            <Footer/>
        </div>
    );
};

export default TicketsPage;