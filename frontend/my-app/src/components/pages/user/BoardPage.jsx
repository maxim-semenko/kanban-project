import React from 'react';
import Board from "../../common/board/Board";
import NavigationBar from "../../common/NavigationBar";
import {Button, Container} from "@mui/material";

function BoardPage() {
    return (
        <div>
            <NavigationBar/>
            <Container maxWidth={false} style={{padding: "0 12px 0 12px"}}>
                <Button>Add task</Button>
                <hr/>
                <Board/>
            </Container>
        </div>
    );
}

export default BoardPage;