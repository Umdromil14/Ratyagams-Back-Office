import React, { useEffect, useState } from "react";
import "../css/AdminView.css";
import navigationBar from "../components/navigationBar";
import createTable from "../components/table";
import { useSelector } from "react-redux";

function AdminView() {
    const token = {
        headers: {
            Authorization: `Bearer ${useSelector(
                (state) => state.token.value.payload
            )}`
        }
    };
    const [values, setValues] = useState([]);
    return (
        <>
            {navigationBar(setValues, token)}
            {/* if the admin want to create a user, update -> 
            create a modal -> form with a label id on true false if it is on update or not*/}
            <div className="table">{createTable({ data: values })}</div>
        </>
    );
}

export default AdminView;
