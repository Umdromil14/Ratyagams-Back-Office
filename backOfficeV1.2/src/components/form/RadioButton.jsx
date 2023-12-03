import { Radio } from "antd";
function RadioButton(values, onChange) {
    const radio = (
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
    );
    return radio;
}

export default RadioButton;
