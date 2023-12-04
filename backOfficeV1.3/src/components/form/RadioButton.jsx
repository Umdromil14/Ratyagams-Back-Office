import { Radio } from "antd";
import "../../css/RadioButton.css"
function RadioButton(values, onChange, title) {
    const radio = (
        <div>
            <label className={"black"}>{title}</label>
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
