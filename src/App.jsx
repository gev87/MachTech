import { useMemo, useState } from "react";
import "./App.css";
import AddListItem from "./components/AddEditListItem";
import { List } from "@mui/material";
import ListItem from "./components/ListItem";
import EditDialog from "./components/EditDialog";
import BoardVisualization from "./components/BoardVisualization";
import { fitSlicesOptimized } from "./helpers/algorithms";

function App() {
  const [slices, setSlices] = useState([]);
  const [modalData, setModalData] = useState({});
  const boardWidth = 3630;
  const boardHeight = 1830;

  const result = useMemo(
    () => fitSlicesOptimized(boardWidth, boardHeight, slices),
    [boardWidth, boardHeight, slices]
  );

  console.log("result", result);
  const addNewItem = (newItem) => {
    setSlices((prevSlices) => [...prevSlices, newItem]);
  };

  const editItem = (editedItem) => {
    setModalData({});
    const updatedSlices = slices.map((item) =>
      item.id === editedItem.id ? editedItem : item
    );
    setSlices(updatedSlices);
  };

  const deletItem = (id) => {
    const updatedSlices = slices.filter((item) => item.id !== id);
    setSlices(updatedSlices);
  };

  const openModal = (data) => {
    setModalData({ ...data, open: true });
  };

  const handleClose = () => {
    setModalData({});
  };

  return (
    <>
      <h1>Cutting Calculator</h1>
      <h4>Sheet dimensions(mm): 1830 x 3630</h4>
      <AddListItem addNewItem={addNewItem} />
      {!!slices.length && (
        <List dense>
          {slices.map((slice) => {
            console.log("slice", slice);
            return (
              <ListItem
                key={slice.id}
                {...slice}
                openModal={() => openModal(slice)}
                handleDelete={() => deletItem(slice.id)}
              />
            );
          })}
        </List>
      )}
      <BoardVisualization
        boardWidth={boardWidth}
        boardHeight={boardHeight}
        boards={result}
      />
      <EditDialog editItem={editItem} onClose={handleClose} {...modalData} />
    </>
  );
}

export default App;
