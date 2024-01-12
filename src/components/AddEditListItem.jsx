/* eslint-disable react/prop-types */
import { Alert, Box, Button, TextField } from "@mui/material";
import { useState } from "react";

export default function AddEditListItem(props) {
  const [error, setError] = useState("");
  const { addNewItem, editItem, width, height, quantity, id } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newHeight = +formData.get("height");
    const newWidth = +formData.get("width");
    const newQuantity = +formData.get("quantity");
    if (!newHeight || !newWidth || !newQuantity) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");

    const params = {
      height: newHeight,
      width: newWidth,
      quantity: newQuantity,
    };

    if (id) {
      editItem({ ...params, id });
    } else {
      addNewItem({
        ...params,
        id: Date.now(),
      });
    }
    event.currentTarget.reset();
  };

  return (
    <form
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
      onSubmit={handleSubmit}
    >
      {!!error && (
        <Box mb={2}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
      <Box display="flex" gap={2} p={2} justifyContent="center">
        <TextField
          id="outlined-basic"
          label="height (sm)"
          variant="outlined"
          size="small"
          name="height"
          type="number"
          defaultValue={height}
          inputProps={{ min: 1, step: 1 }}
        />
        <TextField
          id="outlined-basic"
          label="Width (sm)"
          variant="outlined"
          size="small"
          name="width"
          type="number"
          defaultValue={width}
          inputProps={{ min: 1, step: 1 }}
        />
        <TextField
          id="outlined-basic"
          label="Quantity"
          variant="outlined"
          size="small"
          name="quantity"
          type="number"
          defaultValue={quantity}
          inputProps={{ min: 1, step: 1 }}
        />
        <Button variant="outlined" type="submit">
          {id ? "Save" : "Add"}
        </Button>
      </Box>
    </form>
  );
}
