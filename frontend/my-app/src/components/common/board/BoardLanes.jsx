import React, {useContext, useEffect, useState} from "react";
import {BoardContext} from "./Board";
import Lane from "./Lane";

function BoardLanes(props) {
    const {onDragOverHandler, onDropHandler} = useContext(BoardContext);
    const [divWidth, setDivWidth] = useState(0);

    useEffect(() => {
        setDivWidth(props.stages.length * 285 + props.stages.length * 17);
    }, []);

    return (
        <div className="column-wrapper">
            <div style={{width: divWidth}}>
                {props.stages.map((stage, index) => (
                    <>
                        <div className="card-column" key={index}>
                            <div className="card bg-light">
                                <div className="card-header stage-header">
                                    <h6 className="card-title text-uppercase text-truncate py-2">{stage.name}</h6>
                                </div>
                                <div
                                    className="card-body"
                                    onDrop={(event) => onDropHandler(event, stage.id)}
                                    onDragOver={(event) => onDragOverHandler(event)}
                                >
                                    <Lane stage={stage} key={stage.id}/>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </div>
    );
}

export default BoardLanes;
