import { Cascader } from "antd";
import "../../css/form.css"
function MultipleScrollDown(
    label,
    placeHolder,
    options,
    onChange,
    defaultValue = undefined
) {
    const scrollDown = (
        <div className="form">
            <span>
                <label>{label.label}</label>
                {label.Required ? <label className="required">*</label> : null}
            </span>
            <Cascader
                options={options}
                style={{ width: "250px" }}
                placeholder={placeHolder}
                onChange={onChange}
                defaultValue={defaultValue}
            />
        </div>
    );
    return scrollDown;
}

export default MultipleScrollDown;
