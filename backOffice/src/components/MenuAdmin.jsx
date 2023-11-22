import { Button, Menu, MenuItem } from "@mui/material";
import { forwardRef } from "react";

const MenuItemView = forwardRef(function MenuItemView(
        anchorEl = null,
        open = null,
        handleClose = null,
        handleClick = null,
        labelButton = null,
        values = [],
        refAnchorEl,
        refOpen
) {
    console.log(values);
    console.log(labelButton);
    return (
        <>
            <Button variant="contained" onClick={handleClick}>
                {labelButton}
            </Button>
            <Menu anchorEl={refAnchorEl} open={refOpen} onClose={handleClose}>
                {values.map((value) => (
                    <MenuItem onClick={handleClose}>{value}</MenuItem>
                ))}
            </Menu>
        </>
    );
});

export default MenuItemView;
