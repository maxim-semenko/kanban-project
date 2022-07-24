import React, {useContext, useEffect, useState} from "react";
import {BoardContext} from "./Board";
import Lane from "./Lane";
import {Card, CardHeader} from "@mui/material";

function BoardLanes(props) {
    const {onDragOverHandler, onDropHandler} = useContext(BoardContext);
    const [divWidth, setDivWidth] = useState(0);

    useEffect(() => {
        setDivWidth(props.stages.length * 285 + props.stages.length * 16);
    }, []);

    return (
        <div className="column-wrapper">
            <div style={{width: divWidth}}>
                {props.stages.map((stage, index) => (
                    <>
                        <div className="card-column" key={index}>
                            <Card>
                                <CardHeader
                                    title={<h5><b>{stage.name}</b></h5>}
                                    style={{textTransform: "uppercase", textOverflow: "ellipsis"}}
                                    className={"stage-header"}
                                />
                                <div
                                    className="card-body"
                                    onDrop={(event) => onDropHandler(event, stage.id)}
                                    onDragOver={(event) => onDragOverHandler(event)}
                                >
                                    <Lane stage={stage} key={stage.id}/>
                                </div>
                            </Card>
                        </div>
                    </>
                ))}
            </div>
        </div>
    );
}

export default BoardLanes;
