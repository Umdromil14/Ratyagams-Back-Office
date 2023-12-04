import { DatePicker } from "antd";
import "../../css/form.css";

function Date(label,onChange) {
    return (
        <div className="form">
            <span>
                <label>{label.label}</label>
                {label.Required ? <label className="required">*</label> : null}
            </span>
            <DatePicker onChange={onChange} format={"YYYY/MM/DD"} />
        </div>
    );
}

export default Date;
