import { InputNumber } from "antd";

function inputForNumber(onChange, min, max, defaultValue, step = undefined) {
    return (
        <InputNumber
            min={min}
            max={max}
            step={step ? step : undefined}
            defaultValue={defaultValue}
            onChange={onChange}
        />
    );
}

export default inputForNumber;
