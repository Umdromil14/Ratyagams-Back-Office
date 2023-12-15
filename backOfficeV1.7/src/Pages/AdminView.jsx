import React, { useEffect, useState } from "react";
import "../css/AdminView.css";
import NavigationBar from "../components/navigationBar";
import { useSelector } from "react-redux";
import { notification } from "antd";
import ModalView from "../components/modal";
import { useNavigate } from "react-router-dom";
import {
    readWithPagination,
    readAllValues,
} from "../APIAccess/readWithPagination";
import TableView from "../components/table";
import { deleteValues, getValues } from "../APIAccess/APIAccess";
import { getSearchValues } from "../APIAccess/search";

function AdminView() {
    const navigate = useNavigate();
    const token = useSelector((state) => state.token.value);
    const [title, setTitle] = useState(null); //use to set the title of the table
    const [count, setCount] = useState(0); //use to set the count of the table
    const [pagination, setPagination] = useState(1); //use to set the pagination of the table
    const [limit, setLimit] = useState(10); //use to set the limit of the table
    const [defaultValues, setDefaultValues] = useState(undefined); //use to set the default values of the modal
    const [modalValues, setModalValues] = useState([]); //use to set the data of the modal
    const [values, setValues] = useState([]); //use to set the data of the table
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
    };

    const handleSearch = (value, title) => {
        if (value.length > 2) {
            getSearchValues(title, value, token)
                .then((response) => {
                    if (response !== undefined) {
                        const data = {};
                        data[title] = response;
                        setModalValues({ ...modalValues, ...data });
                    }
                })
                .catch((error) => {
                    handleErrors(error.response?.data.message.split(";"));
                });
        } else {
            if (defaultValues === undefined) {
                setDefaultValues(modalValues);
            } else {
                setModalValues(defaultValues);
            }
        }
    };

    useEffect(() => {
        if (!isModalOpen) {
            setDefaultValues(undefined);
        }
    }, [isModalOpen]);

    const handleModal = (modalTitle) => {
        readAllValues(modalTitle, token)
            .then((response) => {
                if (response !== undefined) {
                    setModalValues(response);
                }
                setIsModalOpen(true);
            })
            .catch((error) => {
                handleErrors(error.response?.data.message.split(";"));
            });
    };

    function handleErrors(response) {
        setError(true);
        setMessageError(response);
        if (response.some((e) => e.includes("JWT"))) {
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

    const fetchData = (page, limit) => {
        readWithPagination(title, { page, limit }, token)
            .then((response) => {
                setValues(response);
            })
            .catch((error) => {
                handleErrors([error.response?.data.message]);
            });
    };

    const fetchDataCount = () => {
        getValues(`${title}/count`, token)
            .then((response) => {
                setCount(response);
            })
            .catch((error) => {
                handleErrors([error.response?.data.message]);
            });
    };

    const handleDelete = (rowValue) => {
        deleteValues(title, token, rowValue.key.split("/"))
            .then(() => {
                setPagination(1);
                fetchDataCount();
                fetchData(1, limit);
            })
            .catch((error) => {
                handleErrors([error.response?.data.message]);
            });
    };

    useEffect(() => {
        if (title) {
            fetchDataCount();
            setPagination(1);
            fetchData(1, limit);
        }
    }, [title]);

    const handlePagination = (page, pageSize) => {
        setPagination(page);
        setLimit(pageSize);
        fetchData(page, pageSize);
    };

    return (
        <>
            {contextHolder}
            <NavigationBar
                setModalTitle={setModalTitle}
                setTitlePagination={setTitle}
                handleModal={handleModal}
            />
            <div className="table">
                <TableView
                    data={values}
                    totalData={count}
                    page={pagination}
                    onDelete={handleDelete}
                    onPaginationUpdate={handlePagination}
                />
            </div>
            <div className="modal">
                <ModalView
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    title={modalTitle}
                    data={modalValues}
                    handleErrors={handleErrors}
                    handleSearch={handleSearch}
                />
            </div>
        </>
    );
}

export default AdminView;
