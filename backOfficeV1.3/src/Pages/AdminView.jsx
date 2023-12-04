import React, { useEffect, useRef, useState } from "react";
import "../css/AdminView.css";
import navigationBar from "../components/navigationBar";
import createTable from "../components/table";
import { useSelector } from "react-redux";
import { notification } from "antd";
import modal from "../components/modal";

function AdminView() {
    const token = {
        headers: {
            Authorization: `Bearer ${useSelector(
                (state) => state.token.value.payload
            )}`,
        },
    };
    const [data, setData] = useState([]); //use to set the data of the modal
    const [values, setValues] = useState([]); //use to set the data of the table
    const [ref, setRef] = useState(useRef({})); //use to set the ref of the modal
    const [modalTitle, setModalTitle] = useState(null); //use to set the title of the modal
    const [error, setError] = useState(false); //use to set the error of the table
    const [isModalOpen, setIsModalOpen] = useState(false); //use to set the state of the modal
    const [messageError, setMessageError] = useState(null); //use to set the message of the error
    const [api, contextHolder] = notification.useNotification(); //use to set the notification
    const openNotificationError = () => {
        api.error({
            message: "Something went wrong...",
            description: messageError,
            placement: "bottomRight",
            duration: 2,
        });
    };
    function openModal(title) {
        setIsModalOpen(true);
        setModalTitle(title);
    }
    function handleErrors(response) {
        setError(true);
        setMessageError(response);
    }
    useEffect(() => {
        if (error) {
            openNotificationError();
        }
    }, [error]);
    return (
        <>
            {contextHolder}
            {navigationBar(
                setValues,
                token,
                handleErrors,
                setError,
                openModal,
                setRef,
                setData
            )}
            <div className="table">{createTable({ data: values })}</div>
            <div className="modal">
                {modal(isModalOpen, setIsModalOpen, modalTitle, data, ref)}
            </div>
        </>
    );
}

export default AdminView;
