import { Cascader, Select, DatePicker, InputNumber, Radio } from "antd";
import "../../css/form.css";

/**
 * function to create a cascader scroll
 * @param {object} props
 * @param {string} props.label  label name
 * @param {boolean=} props.required  if the input is required or not
 * @param {string=} props.placeholder  placeholder for the input
 * @param {array} props.options  options for the scroll down
 * @param {Function} props.onChange  function to be called when the value of the input changes
 * @param {Function} props.search  function to be called when the value of the input changes
 *
 * @returns {JSX.Element}
 */
function CascaderScroll({
    label,
    required,
    placeholder,
    options,
    onChange,
    search,
}) {
    return (
        <div className="form">
            <span>
                <label>{label}</label>
                {required ? <label className="required">*</label> : null}
            </span>
            <Cascader
                showSearch
                options={options}
                style={{ width: "250px" }}
                placeholder={placeholder}
                onChange={onChange}
                onKeyUp={search}
            />
        </div>
    );
}

/**
 * function to create a date picker
 *
 * @param {object} props
 * @param {string} props.label  label name
 * @param {boolean=} props.required  if the input is required or not
 * @param {Function} props.onChange  function to be called when the value of the input changes
 *
 * @returns {JSX.Element}
 */
function Date({ label, required, onChange }) {
    return (
        <div className="form">
            <span>
                <label>{label}</label>
                {required ? <label className="required">*</label> : null}
            </span>
            <DatePicker onChange={onChange} format={"YYYY/MM/DD"} />
        </div>
    );
}

/**
 * function that returns an image input
 *
 * @param {object} props
 * @param {string} props.label label name
 * @param {boolean=} props.required if the input is required or not
 * @param {Function} props.onChange function to be called when the value of the input changes
 *
 * @returns {JSX.Element} an image input
 */
function Image({ label, required, onChange }) {
    return (
        <div className="image">
            <span>
                <label>{label}</label>
                {required ? <label className="required">*</label> : null}
            </span>
            <input
                className="image-input"
                type="file"
                accept="image/*"
                onChange={onChange}
                required
                multiple={false}
            />
        </div>
    );
}

/**
 * function that returns a label and input
 *
 * @param {object} props
 * @param {string} props.label label name
 * @param {boolean=} props.required if the input is required or not
 * @param {object} props.input input object
 * @param {string} props.input.type input type
 * @param {string} props.input.id input id
 * @param {string=} props.input.ref input ref
 * @param {string} props.className class name for the label and input
 * @param {string=} props.placeholder placeholder for the input
 * @param {Function=} props.onChange function to be called when the value of the input changes
 *
 * @returns {JSX.Element} a label and input
 */

function InputWithLabel({
    label,
    required,
    input,
    className,
    placeholder,
    onChange,
}) {
    return (
        <div className={className.label}>
            <span>
                <label>{label}</label>
                {required ? <label className="required">*</label> : null}
            </span>
            <input
                placeholder={placeholder}
                className={className.input}
                type={input.type}
                id={input.id}
                ref={input.ref}
                onChange={onChange}
            />
        </div>
    );
}

/**
 * function to create a number input
 *
 * @param {object} props
 * @param {string} props.label  label name
 * @param {boolean=} props.required  if the input is required or not
 * @param {Function} props.onChange  function to be called when the value of the input changes
 * @param {number=} props.min  minimum value for the input
 * @param {number=} props.max  maximum value for the input
 * @param {string=} props.placeHolder  placeholder for the input
 * @param {number=} props.step  step for the input
 *
 * @returns {JSX.Element}
 */
function NumberInput({
    label,
    required,
    onChange,
    min,
    max,
    placeHolder,
    step = 1,
}) {
    return (
        <div className="form">
            <span>
                <label>{label}</label>
                {required ? <label className="required">*</label> : null}
            </span>
            <InputNumber
                min={min}
                max={max}
                placeholder={placeHolder}
                step={step}
                onChange={onChange}
            />
        </div>
    );
}

/**
 * function to create a radio button
 *
 * @param {object} props
 * @param {string} props.label  label name
 * @param {boolean=} props.required  if the input is required or not
 * @param {object} props.choices  choices for the radio button
 * @param {Function} props.onChange  function to be called when the value of the input changes
 *
 *
 * @returns {JSX.Element} a radio button
 */
function RadioButton({ label, required, choices, onChange }) {
    return (
        <div className="form">
            <span>
                <label>{label}</label>
                {required ? <label className="required">*</label> : null}
            </span>
            <Radio.Group
                onChange={onChange}
                optionType="button"
                buttonStyle="solid"
            >
                {Object.keys(choices).map((choice) => (
                    <Radio.Button key={choice} value={choice}>
                        {choices[choice]}
                    </Radio.Button>
                ))}
            </Radio.Group>
        </div>
    );
}

/**
 * function to create a scroll down
 * 
 * @param {object} props
 * @param {string} props.label  label name
 * @param {boolean=} props.required  if the input is required or not
 * @param {array} props.values  values for the scroll down
 * @param {Function} props.handleChange  function to be called when the value of the input changes
 * @param {string=} props.placeholder  placeholder for the input
 * @param {object} props.options  options for the scroll down
 * @param {string} props.options.value  value for the scroll down
 * @param {string} props.options.label  label for the scroll down
 * @param {Function} props.search  function to be called when the value of the input changes
 *
 * @returns {JSX.Element} a scroll down
 */
function ScrollDown({
    label,
    required,
    values,
    handleChange,
    placeholder,
    options,
    search,
}) {
    const optionsInSelect = [];
    values.map((value) =>
        optionsInSelect.push({
            key: value[options.value],
            value: value[options.value],
            label: value[options.label],
        })
    );
    return (
        <div className="form">
            <span>
                <label>{label}</label>
                {required ? <label className="required">*</label> : null}
            </span>
            <Select
                showSearch
                style={{ width: "200px" }}
                placeholder={placeholder}
                onChange={handleChange}
                options={optionsInSelect}
                onKeyUp={search}
                optionFilterProp="children"
                filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                }
            />
        </div>
    );
}

export {
    CascaderScroll,
    Date,
    Image,
    InputWithLabel,
    NumberInput,
    RadioButton,
    ScrollDown,
};
