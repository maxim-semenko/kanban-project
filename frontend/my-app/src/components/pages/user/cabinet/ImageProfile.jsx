import React from 'react';
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import image from "../../../../image/icon2.png"
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Grid from "@mui/material/Grid";
import {Link} from "react-router-dom";

const linkStyle = {
    textDecoration: 'none',
    color: 'rgb(33,33,33)'
}

function ImageProfile(props) {

    const user = JSON.parse(localStorage.getItem("user"))

    const showEditProfile = () => {
        if (user.id === props.user.id) {
            return (
                <Link to={"/edit"} style={linkStyle}>
                    <Button fullWidth
                            variant="contained"
                            color="primary"
                            startIcon={<CloudUploadIcon/>}
                            style={{marginTop: "1px"}}>
                        Edit profile
                    </Button>
                </Link>
            )
        } else {
            return (
                <div>

                    <Button fullWidth
                            variant="contained"
                            color="success"
                            style={{marginTop: "1px"}}>
                        Subscribe
                    </Button>
                    <Button fullWidth
                            variant="contained"
                            color="primary"
                            style={{marginTop: "1px"}}>
                        Write message
                    </Button>
                </div>

            )
        }
    }

    return (
        <Grid item xs={12} md={12} lg={2}>
            <Card sx={{maxWidth: 160}}>
                <CardMedia
                    component="img"
                    height="240"
                    image={image}
                    alt="Paella dish"
                />
                {showEditProfile()}
            </Card>
        </Grid>
    );
}

export default ImageProfile;