import { useState, useEffect } from "react";
import { SWIM_LANES } from "../Constants";
import { SwimLane } from "./SwimLane";
import produce from "immer";
import { deleteBoat, getBoats, updateBoat } from "../services/boatService";
import "./Board.css";

export function Board(props) {

    const addedBoat = props.addedBoat;

    //boats partitioned by swim lane
    const [boats, setBoats] = useState({});

    //get all boats and add them to our state
    useEffect(() => {
        getBoats().then(function(response) {
            setBoats(produce((draft) => {
                const returnedBoats = response.data;
                for(const i in returnedBoats) {
                    const boat = returnedBoats[i];
                    const boatSwimLane = boat.swimLane;
                    if(!draft[boatSwimLane]) {
                        draft[boatSwimLane] = [];
                    }
                    draft[boatSwimLane].push(boat);
                }
            }));
        });
    }, []);

    //modify our boats state if a boat is added
    useEffect(() => {
        if(addedBoat) {
            setBoats(produce((draft) => {
                const boatId = addedBoat._id;
                const boatSwimlane = addedBoat.swimLane;
                if(!draft[boatSwimlane]) {
                    draft[boatSwimlane] = [];
                }
                draft[boatSwimlane].push(addedBoat);
            }));
        }
    }, [addedBoat]);

    function handleBoatDelete(boatId) {
        deleteBoat(boatId).then(function(response) {
            setBoats(produce((draft) => {
                const deletedBoat = response.data;
                const boatSwimLane = deletedBoat.swimLane;
                const deletedBoatIndex = draft[boatSwimLane].findIndex((boat) => boat._id === deletedBoat._id);
                draft[boatSwimLane].splice(deletedBoatIndex, 1);
            }));
        });
    }

    function handleSwimLaneChange(boatId, oldSwimLane, newSwimLane) {
        if(oldSwimLane !== newSwimLane) {
            updateBoat(boatId, {swimLane: newSwimLane}).then(function(response) {
                setBoats(produce((draft) => {
                    const updatedBoat = response.data;
                    const updatedBoatIndex = draft[oldSwimLane].findIndex((boat) => boat._id === updatedBoat._id);
                    const foundUpdatedBoat = draft[oldSwimLane][updatedBoatIndex];
                    foundUpdatedBoat.swimLane = newSwimLane;
                    draft[oldSwimLane].splice(updatedBoatIndex, 1);
                    if(!draft[newSwimLane]) {
                        draft[newSwimLane] = [];
                    }
                    draft[newSwimLane].push(foundUpdatedBoat);
                }));
            });
        }
    }

    const swimLanes = SWIM_LANES.map((swimLane) => {
        return <SwimLane name={swimLane} boats={boats[swimLane]} handleBoatDelete={handleBoatDelete} handleSwimLaneChange={handleSwimLaneChange}/>
    });
    return (
        <div className="board">
            {swimLanes}
        </div>
    );
}