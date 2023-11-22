// import React, { useState } from "react";
// import { Button, Menu,MenuItem } from "@mui/material";

// const NavigationBar = () => {
//     const [anchorEl, setAnchorEl] = useState(null);
//     const [open, setOpen] = useState(false);
//     const handleClose = () => {
//         setAnchorEl(null);
//         setOpen(false);
//     };
//     const handleClick = (event) => {
//         setAnchorEl(event.currentTarget);
//         setOpen(true);
//     }

//     return (
//         <div>
//             <Button variant="contained" onClick={handleClick} >ezyuegaiz§èy</Button>
//             <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>

//                 <MenuItem onClick={handleClose}>Profile</MenuItem>
//                 <MenuItem onClick={handleClose}>about</MenuItem>
//                 <MenuItem onClick={handleClose}>test</MenuItem>
//             </Menu>
//         </div>
//     );
// };

// export default NavigationBar;