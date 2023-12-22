import React, { useEffect, useState } from "react";
import "../css/AdminView.css";
import NavigationBar from "../components/navigationBar";
import { useSelector } from "react-redux";
import { Button, notification } from "antd";
import ModalView from "../components/modal/modal";
import { useNavigate } from "react-router-dom";
import {
    readWithPagination,
    readAllValues,
} from "../APIAccess/readWithPagination";
import TableView from "../components/table";
import { deleteValues, getValues } from "../APIAccess/APIAccess";
import { getSearchValues } from "../APIAccess/search";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { clearToken } from "../store/slice/token";
import { useDispatch } from "react-redux";

/**
 * Admin view
 *
 * @returns {JSX.Element} The admin view
 */
function AdminView() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token.value);
    const [title, setTitle] = useState(null);
    const [dataCount, setDataCount] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [defaultValues, setDefaultValues] = useState(undefined);
    const [modalValues, setModalValues] = useState([]);
    const [tableValues, setTableValues] = useState([]);
    const [modalTitle, setModalTitle] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notifier, contextHolder] = notification.useNotification();
    const [modalDefaultValues, setModalDefaultValues] = useState({});

    useEffect(() => {
        if (!token) {
            navigate("/");
        }
    }, [token]);

    /**
     * Search for a value in the database
     *
     * @param {string} value the value to search
     * @param {string} title the title of the table
     *
     * @throws {Error} if the request failed
     *
     * @returns {void}
     */
    const handleSearch = (value, title) => {
        if (value.length > 2) {
            getSearchValues(title, value, token, modalDefaultValues)
                .then((response) => {
                    if (response !== undefined) {
                        setModalValues({ ...modalValues, ...response });
                    }
                })
                .catch((error) => {
                    handleNotification(error.response?.data.message.split(";"));
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

    /**
     *
     * @param {string} modalTitle the title of the modal
     * @param {object} rowValues the values of the row from the table
     *
     * @throws {Error} if the request failed
     *
     * @returns {void}
     */
    const handleModal = (modalTitle, rowValues = {}) => {
        setModalTitle(modalTitle);
        readAllValues(modalTitle, token, rowValues)
            .then((response) => {
                if (response !== undefined) {
                    setModalValues(response);
                }
                setModalDefaultValues(rowValues);
                setIsModalOpen(true);
            })
            .catch((error) => {
                handleNotification(error.response?.data.message.split(";"));
            });
    };

    /**
     * Open a notification
     *
     * @param {string[]=} descriptions The descriptions to display (if contains JWT and type is error, redirect to login)
     * @param {string=} type The type of notification (error or success or warning); default is error
     *
     * @returns {void}
     */
    const handleNotification = (descriptions, type = "error") => {
        if (descriptions === undefined) {
            descriptions = ["Unknown error"];
        }

        if (type === "error" && descriptions.some((e) => e.includes("JWT"))) {
            setTimeout(() => {
                navigate("/");
            }, 5000);
        }

        notifier[type]({
            message: type === "error" ? "Something went wrong" : "Success",
            description: (
                <ul>
                    {descriptions.map((element, index) => {
                        return <li key={index}>{element}</li>;
                    })}
                </ul>
            ),
            placement: "bottomRight",
            duration: 5,
            style: {
                width: 400,
            },
        });
    };

    /**
     * Fetch the data from the database
     *
     * @param {number} page number of the page from the table
     * @param {number} limit number of rows per page
     *
     * @throws {Error} if the request failed
     *
     * @returns {void}
     */
    const fetchData = (page, limit) => {
        readWithPagination(title, { page, limit }, token)
            .then((response) => {
                setTableValues(response);
            })
            .catch((error) => {
                handleNotification([error.response?.data.message]);
            });
    };

    /**
     * Fetch the data count from the database
     *
     * @throws {Error} if the request failed
     *
     * @returns {void}
     */
    const fetchDataCount = () => {
        getValues(`${title}/count`, token)
            .then((response) => {
                setDataCount(response);
            })
            .catch((error) => {
                handleNotification([error.response?.data.message]);
            });
    };

    /**
     * Reload the current values of the table
     *
     * @param {number=} page number of the page from the table; default to `1`
     *
     * @throws {Error} if the request failed
     *
     * @returns {void}
     */
    const reloadCurrentValues = (page = 1) => {
        setPage(page);
        fetchDataCount();
        fetchData(1, limit);
    };

    /**
     * Delete a row from the table
     *
     * @param {object} rowValues the values of the row from the table
     *
     * @throws {Error} if the delete request failed
     *
     * @returns {void}
     */
    const handleDelete = (rowValues) => {
        deleteValues(title, token, rowValues.key.split("/"))
            .then(() => {
                reloadCurrentValues();
                handleNotification(["Successfully deleted"], "success");
            })
            .catch((error) => {
                handleNotification([error.response?.data.message]);
            });
    };

    const handleUpdate = (rowValues) => {
        handleModal(title, rowValues);
    };

    useEffect(() => {
        if (title) {
            reloadCurrentValues();
        }
    }, [title]);

    /**
     * 
     * @param {number} page the page number 
     * @param {number} limit the limit of rows per page
     */
    const handlePagination = (page, limit) => {
        setPage(page);
        setLimit(limit);
        fetchData(page, limit);
    };

    return (
        <>
            {contextHolder}
            <NavigationBar
                setTitle={setTitle}
                handleModal={(modalTitle) => {
                    handleModal(modalTitle);
                }}
            />

            <TableView
                data={tableValues}
                dataCount={dataCount}
                page={page}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
                onPaginationUpdate={handlePagination}
            />

            <ModalView
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                modalTitle={modalTitle}
                modalValues={modalValues}
                handleNotification={handleNotification}
                handleSearch={handleSearch}
                initialValues={modalDefaultValues}
                setInitialValues={setModalDefaultValues}
                onUpdate={() => reloadCurrentValues(page)}
            />
            <Button
                onClick={() => {
                    dispatch(clearToken());
                    navigate("/");
                }}
                style={{
                    borderRadius: "30px",
                    backgroundColor: "#cc1616",
                    borderColor: "#cc1616",
                    color: "white",
                    position: "absolute",
                    left: "10px",
                }}
                icon={<ArrowLeftOutlined />}
            >
                Logout
            </Button>
        </>
    );
}

export default AdminView;
