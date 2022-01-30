import "./Header.css";

export function Header(props) {

    const handleAddBoatClick = props.handleAddBoatClick;

    return (
        <div className="header">
            <div className="title">
                Boat Kanban Board - Drag and Drop
            </div>
            <button className="addButton" onClick={handleAddBoatClick}>
                Add Boat
            </button>
        </div>
    );
}