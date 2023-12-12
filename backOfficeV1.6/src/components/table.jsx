import { SearchOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { readWithPagination } from "../APIAccess/readWithPagination";


const createTable = (
    { data },
    totalData,
    title,
    page,
    setPagination,
    setLimit,
    setValues,
    token
) => {
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
    const columns = createColumn(Object.keys(data[0]), getColumnSearchProps);
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
                onChange: async (page, pageSize) => {
                    setPagination(page);
                    setLimit(pageSize);
                    setValues(
                        await readWithPagination(
                            title,
                            { page, pageSize },
                            token
                        )
                    );
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
 *
 * @returns an array of columns for the table
 *
 */
function createColumn(header, getColumnSearchProps) {
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
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<DeleteOutlined />}
                        onClick={() => {
                            console.log(rowValue);
                        }}
                    />
                </Space>
            ),
        }
    );

    return columns;
}
export default createTable;
