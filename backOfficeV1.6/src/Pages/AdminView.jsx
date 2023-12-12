import React, { useEffect, useRef, useState } from "react";
import "../css/AdminView.css";
import navigationBar from "../components/navigationBar";
import createTable from "../components/table";
import { useSelector } from "react-redux";
import { notification } from "antd";
import modal from "../components/modal";
import { useNavigate } from "react-router-dom";

function AdminView() {
    const navigate = useNavigate();
    const token = useSelector((state) => state.token.value);
    const [title, setTitle] = useState(null); //use to set the title of the table
    const [count, setCount] = useState(0); //use to set the count of the table
    const [pagination, setPagination] = useState(1); //use to set the pagination of the table
    const [limit, setLimit] = useState(10); //use to set the limit of the table
    const [data, setData] = useState([]); //use to set the data of the modal
    const [values, setValues] = useState([]); //use to set the data of the table
    const [form, setForm] = useState({}); //use to set the ref of the modal
    const [modalTitle, setModalTitle] = useState(null); //use to set the title of the modal
    const [error, setError] = useState(false); //use to set the error of the table
    const [isModalOpen, setIsModalOpen] = useState(false); //use to set the state of the modal
    const [messageError, setMessageError] = useState(null); //use to set the message of the error
    const [api, contextHolder] = notification.useNotification(); //use to set the notification

    useEffect(() => {
        if (!token) {
            navigate("/");
        }
    }, [token]);

    const openNotification = () => {
        api.error({
            message: "Something went wrong...",
            description: (
                <ul>
                    {messageError.map((element, index) => {
                        return <li key={index}>{element}</li>;
                    })}
                </ul>
            ),
            placement: "bottomRight",
            duration: 5,
            style: {
                width: 600,
            },
        });
        //api[type]
        //({
        //     message: "depends on the type",
        //     description: "depends on the type",
        //     placement: "bottomRight",
        //     duration: 2,
        // });
    };
    function openModal(title) {
        setIsModalOpen(true);
        setModalTitle(title);
    }
    function handleErrors(response) {
        const jwtError = (e) => {
            return e.includes("JWT");
        };
        setError(true);
        setMessageError(response);
        if (response.some(jwtError)) {
            setTimeout(() => {
                navigate("/");
            }, 2000);
        }
    }
    useEffect(() => {
        if (error) {
            openNotification();
            setTimeout(() => {
                setError(false);
            }, 2000);
        }
    }, [error]);

    return (
        <>
            {contextHolder}
            {navigationBar(
                setValues,
                token,
                handleErrors,
                openModal,
                setForm,
                setData,
                setPagination,
                limit,
                setCount,
                setTitle
            )}
            <div className="table">
                {createTable(
                    { data: values },
                    count,
                    title,
                    pagination,
                    setPagination,
                    setLimit,
                    setValues,
                    token
                )}
            </div>
            <div className="modal">
                {modal(
                    isModalOpen,
                    setIsModalOpen,
                    modalTitle,
                    data,
                    form,
                    token,
                    handleErrors
                )}
            </div>
        </>
    );
}

export default AdminView;
