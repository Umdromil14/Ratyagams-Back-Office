import { DatePicker } from "antd";

function Date(onChange) {
    return <DatePicker onChange={onChange} format={"YYYY/MM/DD"} />;
}

export default Date;
