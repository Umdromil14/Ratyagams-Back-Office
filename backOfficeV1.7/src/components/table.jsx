import { SearchOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

/**
 * Create a table with pagination and search bar
 *
 * @param {Array} data the data that need to be display in the table
 * @param {number} totalData the total number of data
 * @param {number} page the current page
 * @param {function} onDelete the function that delete a row
 * @param {function} onPaginationUpdate the function that update the pagination
 *
 * @returns {JSX.Element} a table with pagination and search bar
 */
const TableView = ({
    data,
    totalData,
    page,
    onDelete,
    onPaginationUpdate,
}) => {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{
                        marginBottom: 8,
                        display: "block",
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() =>
                            clearFilters && handleReset(clearFilters)
                        }
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? "#1677ff" : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: "#ffc069",
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });

    if (data.length === 0) {
        return <Table />;
    }

    // const handleDelete = (rowValue) => {
    //     deleteValues(title, token, rowValue.key.split("/"))
    //         .then(() => {
    //             setPagination(1);
    //         })
    //         .catch((error) => {
    //             handleErrors([error.response?.data.message]);
    //         });
    // };

    const columns = createColumns(
        Object.keys(data[0]),
        getColumnSearchProps,
        onDelete
    );
    return (
        <Table
            columns={columns}
            dataSource={data}
            scroll={{ x: 1000, y: 500 }}
            style={{
                overflow: "auto",
                background: "#ffff",
                borderRadius: "30px",
            }}
            pagination={{
                defaultPageSize: 10,
                pageSizeOptions: ["10", "20", "30", "40", "50"],
                showSizeChanger: true,
                position: ["bottomCenter"],
                style: {
                    backgroundColor: "#ffff",
                    borderTop: "2px solid #e8e8e8",
                    paddingTop: "10px",
                },
                total: totalData,
                current: page,
                showTotal: (total, range) =>
                    `${range[0]}-${range[1]} of ${total} items`,
                onChange: (page, pageSize) => {
                    onPaginationUpdate(page, pageSize);
                },
            }}
        />
    );
};

/**
 * Create column for each header given in parameter
 *
 * @param {Array} dataEntry
 * @param {Function} getColumnSearchProps
 * @param {Function} handleDelete
 *
 * @returns an array of columns for the table
 *
 */
function createColumns(header, getColumnSearchProps, handleDelete) {
    let columns = [];
    header.forEach((element) => {
        if (element !== "key") {
            columns.push({
                align: "center",
                title: element,
                dataIndex: element,
                key: element,
                ...getColumnSearchProps(element),
            });
        }
    });
    columns.push(
        {
            title: "Update",
            key: "Update",
            fixed: "right",
            width: 80,
            render: (rowValue) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<EditOutlined />}
                        onClick={() => {
                            console.log(rowValue);
                        }}
                    />
                </Space>
            ),
        },
        {
            title: "Delete",
            key: "Delete",
            fixed: "right",
            width: 80,
            render: (rowValue) => (
                <Space size="middle">
                    <Popconfirm
                        title="Are you sure to delete this row?"
                        onConfirm={() => handleDelete(rowValue)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<DeleteOutlined />}
                        />
                    </Popconfirm>
                </Space>
            ),
        }
    );

    return columns;
}
export default TableView;
