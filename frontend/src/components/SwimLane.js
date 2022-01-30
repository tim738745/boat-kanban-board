import { useDrop } from 'react-dnd';
import { ITEM_TYPES } from '../Constants';
import { Boat } from './Boat';
import "./SwimLane.css";

export function SwimLane(props) {

    const name = props.name;
    const boats = props.boats;
    const handleBoatDelete = props.handleBoatDelete;
    const handleSwimLaneChange = props.handleSwimLaneChange;

    //register a swim lane component as a drop target that accepts boats
    const [collectedProps, drop] = useDrop(() => ({
        accept: ITEM_TYPES.BOAT,
        drop: (item) => {handleSwimLaneChange(item.id, item.swimLane, name)}
    }));

    const boatElements = [];
    for(const i in boats) {
        const boat = boats[i];
        boatElements.push(<Boat id={boat._id} swimLane={boat.swimLane} name={boat.name} handleDelete={handleBoatDelete}/>);
    }

    return (
        <div className="swimLane" ref={drop}>
            <div className="swimLaneHeader">
                {props.name}
            </div>
            <div className="swimLaneBoats">
                {boatElements}
            </div>
        </div>
    );
}