import React, { useState } from "react";
import "../css/AdminView.css";
import { Button, Menu, MenuItem } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown';
import { useSelector } from "react-redux";

function AdminView() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };
    const labelNavigationBar = [
        "Publication",
        "Games",
        "Platform",
        "User",
        "Category",
        "Type",
        "Status",
    ];
    const position = ["Create", "Read", "Update", "Delete"];
    const token = useSelector((state) => state.token.value);
    return (
      <div>
          <div>
            {labelNavigationBar.map((label) => (
                <>
                    <Button className="buttonAdmin" variant="contained" onClick={handleClick} endIcon={<FontAwesomeIcon icon={faAngleDown} />}>
                        {label}
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        {position.map((value) => (
                            <MenuItem onClick={handleClose}>{value}</MenuItem>
                        ))}
                    </Menu>
                </>
            ))}
            </div>
            <div>
                <h1>Admin View</h1>
            </div>
            </div>
    );
}

export default AdminView;
