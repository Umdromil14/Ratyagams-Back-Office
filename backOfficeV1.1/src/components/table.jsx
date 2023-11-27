import { SearchOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

/**
 * create the table with the data given in parameter
 * if the data is empty return an empty table
 * 
 * @param {Array} data that need to be display in the table
 * 
 * @returns a table with the data in parameter
 */
const createTable = ({ data }) => {
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
                {/* input au dessus = label de recherche pour la colonnse selectionné */}
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
            pagination={{ pageSize: 7 }}
            scroll={{ x: 1000, y: 500 }}
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
        columns.push({
            align: "center",
            title: element,
            dataIndex: element,
            sorter: true,
            key: element, //change it to be more unique
            ...getColumnSearchProps(element),
        });
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
                        onClick={() => {console.log(rowValue)}}
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
                        onClick={() => {console.log(rowValue)}}
                    />
                </Space>
            ),
        }
    );

    return columns;
}
export default createTable;
