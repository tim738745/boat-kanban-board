import { useState } from "react";
import './App.css';
import { Board } from './components/Board';
import { Header } from "./components/Header";
import { addBoat } from "./services/boatService";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { AddBoat } from "./components/AddBoat";

function App() {

  //a state that contains the new boat added by the user; passed down to the Board component for rendering
  const [addedBoat, setAddedBoat] = useState(null);

  //a state that controls the visibility of the add boat menu, which is a modal (popup)
  const [addBoatMenuVisible, setAddBoatMenuVisible] = useState(false);

  function handleAddBoat(boat) {
    addBoat(boat).then(function(response) {
      setAddBoatMenuVisible(false);
      setAddedBoat(response.data);
    });
  }

  function handleAddBoatMenuOpen() {
    setAddBoatMenuVisible(true);
  }

  function handleAddBoatMenuClose() {
    setAddBoatMenuVisible(false);
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <Header handleAddBoatClick={handleAddBoatMenuOpen} />
        <Board addedBoat={addedBoat}/>
        <AddBoat visible={addBoatMenuVisible} handleAddBoat={handleAddBoat} handleCancel={handleAddBoatMenuClose}/>
      </div>
    </DndProvider>
  );
}

export default App;
