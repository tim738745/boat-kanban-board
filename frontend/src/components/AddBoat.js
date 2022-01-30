import { useEffect, useState } from 'react';
import { useModal } from 'react-hooks-use-modal';
import { SWIM_LANES } from '../Constants';
import './AddBoat.css';

export function AddBoat(props) {

    //this component is a modal whose visibility is controlled by the "visible" prop passed to it

    const visible = props.visible;
    const handleCancel = props.handleCancel;
    const handleAddBoat = props.handleAddBoat;

    const [Modal, open, close, isOpen] = useModal('root', {
        preventScroll: true,
        closeOnOverlayClick: false
    });

    const [boatName, setBoatName] = useState(null);

    useEffect(() => {
        if(visible) {
            open();
        } else {
            close();
        }
    }, [visible]);

    function handleNameChange(event) {
        setBoatName(event.target.value);
    }

    function handleSave() {
        if(boatName) {
            const boat = {
                swimLane: SWIM_LANES[0],
                name: boatName
            };
            handleAddBoat(boat);
        }
    }

    return (
        <Modal>
            <div className='addBoat'>
                <div className='title'>
                    Add a boat by providing a boat name and clicking "Save".
                </div>
                <div className='boatInputs'>
                    <input className='boatName' type='text' placeholder='Enter a boat name' onChange={handleNameChange}/>
                </div>
                <div className='buttons'>
                    <button className='cancel' onClick={handleCancel}>
                        Cancel
                    </button>
                    <button className='save' onClick={handleSave}>
                        Save
                    </button>
                </div>
            </div>
        </Modal>
    );
}