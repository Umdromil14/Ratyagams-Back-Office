import { InputNumber } from "antd";
import "../../css/form.css";

function inputForNumber(label,onChange, min, max,placeHolder, step = undefined) {
    return (
        <div className="form">
            <span>
                <label>{label.label}</label>
                {label.Required ? <label className="required">*</label> : null}
            </span>
        <InputNumber
            min={min}
            max={max}
            placeholder={placeHolder}
            step={step ? step : undefined}
            onChange={onChange}
        />
        </div>
    );
}

export default inputForNumber;
