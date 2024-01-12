/* eslint-disable react/prop-types */
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import AddEditListItem from "./AddEditListItem";
import CloseIcon from "@mui/icons-material/Close";

export default function EditDialog(props) {
  const { open = false, onClose } = props;

  return (
    <Dialog open={open} onClose={onClose} disableEscapeKeyDown>
      <DialogTitle>Edit Item</DialogTitle>
      <DialogContent>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <AddEditListItem {...props} />
      </DialogContent>
    </Dialog>
  );
}
