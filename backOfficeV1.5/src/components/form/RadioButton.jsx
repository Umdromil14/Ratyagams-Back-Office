import { Radio } from "antd";
import "../../css/RadioButton.css"
function RadioButton(label,values, onChange) {
    const radio = (
        <div className="form">
            <span>
                <label>{label.label}</label>
                {label.Required ? <label className="required">*</label> : null}
            </span>
        <Radio.Group
            onChange={onChange}
            optionType="button"
            buttonStyle="solid"
        >
            {Object.keys(values).map((key) => (
                <Radio.Button key={key} value={key}>
                    {values[key]}
                </Radio.Button>
            ))}
        </Radio.Group>
        </div>
    );
    return radio;
}

export default RadioButton;
