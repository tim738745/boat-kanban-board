import { useDrag } from 'react-dnd';
import { ITEM_TYPES } from '../Constants';
import "./Boat.css";

export function Boat(props) {

    const id = props.id;
    const swimLane = props.swimLane;
    const name = props.name;

    function handleDelete() {
        props.handleDelete(id);
    }

    //register a boat component as a draggable item
    const [collected, drag, dragPreview] = useDrag(() => ({
        type: ITEM_TYPES.BOAT,
        item: { id: id, swimLane: swimLane}
    }), [id]);

    return (
        <div className='boat' ref={drag}>
            <div className='boatName'>
                {"Boat Name: " + name}
            </div>
            <div className='boatId'>
                {"Boat ID: " + id}
            </div>
            <div className='deleteButtonContainer'>
                <button className='deleteButton' onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </div>
    );
}