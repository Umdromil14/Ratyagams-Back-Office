import { Button, Input, Space, Table, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

/**
 * Creates a table with pagination and search bar
 *
 * @param {Object} props
 * @param {Array} props.data the data that need to be display in the table
 * @param {number} props.dataCount the total number of data
 * @param {number} props.page the current page
 * @param {function} props.onDelete the function that delete a row
 * @param {function} props.onPaginationUpdate the function that update the pagination
 *
 * @returns {JSX.Element} a table with pagination and search bar
 */
const TableView = ({
    data,
    dataCount,
    page,
    onDelete,
    onUpdate,
    onPaginationUpdate,
}) => {
    if (data.length === 0) {
        return <Table />;
    }

    return (
        <Table
            columns={createColumns(
                Object.keys(data[0]), 
                onDelete, 
                onUpdate
            )}
            dataSource={data}
            scroll={{ y: 500 }}
            style={{
                overflow: "auto",
                background: "white",
                borderRadius: "30px",
            }}
            pagination={{
                defaultPageSize: 10,
                pageSizeOptions: ["10", "20", "30", "40", "50"],
                showSizeChanger: true,
                position: ["bottomCenter"],
                style: {
                    backgroundColor: "white",
                    borderTop: "2px solid #e8e8e8",
                    paddingTop: "10px",
                },
                total: dataCount,
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
 * Creates column for each header given in parameter
 *
 * @param {Array} headers the headers of the table
 * @param {Function} handleDelete the function that delete a row
 * @param {Function} handleUpdate the function that update a row
 *
 * @returns {Array} an array of columns
 */
function createColumns(headers, handleDelete, handleUpdate) {
    let columns = [];
    headers.forEach((element) => {
        if (element !== "key") {
            columns.push({
                align: "center",
                title: element,
                dataIndex: element,
                key: element,
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
                        onClick={() => handleUpdate(rowValue)}
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
