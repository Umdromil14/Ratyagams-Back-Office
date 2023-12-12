import { Select } from "antd";
import "../../css/RadioButton.css";
function ScrollDown(
    label,
    values,
    handleChange,
    placeholder,
    options,
    defaultValue = undefined
) {
    const scrollDown = (
        <div className="form">
            <span>
                <label>{label.label}</label>
                {label.Required ? <label className="required">*</label> : null}
            </span>
        <Select
            showSearch
            style={{ width: "200px" }}
            placeholder={placeholder}
            onChange={handleChange}
            optionFilterProp="children"
            defaultValue={defaultValue}
            filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
            }
        >
            {values.map((value) => (
                <Select.Option
                    key={value[options.value]}
                    value={value[options.value]}
                >
                    {value[options.label]}
                </Select.Option>
            ))}
        </Select>
        </div>
    );
    return scrollDown;
}

export default ScrollDown;
