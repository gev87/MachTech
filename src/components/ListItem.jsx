/* eslint-disable react/prop-types */
import { Box, Button, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ListItem(props) {
  const { width, height, quantity, openModal, handleDelete } = props;
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding={2}
      border="1px solid #ccc"
      borderRadius={4}
      marginBottom={2}
      gap={10}
    >
      <Typography variant="subtitle2">
        <strong>Height:</strong> {height}
      </Typography>
      <Typography variant="subtitle2">
        <strong>Width:</strong> {width}
      </Typography>
      <Typography variant="subtitle2">
        <strong>Quantity:</strong> {quantity}
      </Typography>
      <Box display="flex" gap={1}>
        <Button variant="outlined" onClick={openModal}>
          Edit
        </Button>
        <IconButton aria-label="delete" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
