import { Select, InputNumber } from "antd";
import "../../css/form.css";

/**
 * Creates an image input
 *
 *
 * @param {object} props
 * @param {Function} props.onChange function to be called when the value of the input changes
 *
 * @returns {JSX.Element} an image input
 */
function Image({ onChange }) {
    return (
        <input
            type="file"
            accept="image/*"
            onChange={onChange}
            placeholder="Select an image"
        />
    );
}

/**
 * Creates an input with a label
 *
 * @param {object} props
 * @param {string} props.label label for the input
 * @param {object} props.input input object
 * @param {string} props.input.type input type
 * @param {string} props.input.id input id
 * @param {string} props.input.ref input ref
 * @param {object} props.className class name for the label and input
 * @param {string} props.className.label class name for the label
 * @param {string} props.className.input class name for the input
 * @param {string=} props.placeholder placeholder for the input
 *
 * @returns {JSX.Element} a label and input
 */

function InputWithLabel({ label, input, className, placeholder }) {
    return (
        <div className={className.label}>
            <span>
                <label>{label}</label>
            </span>
            <input
                placeholder={placeholder}
                className={className.input}
                type={input.type}
                id={input.id}
                ref={input.ref}
            />
        </div>
    );
}

/**
 * Creates a dropdown
 *
 * @param {object} props
 * @param {array} props.values  values for the dropdown
 * @param {string=} props.placeholder  placeholder for the dropdown
 * @param {object} props.options  options for the dropdown
 * @param {string} props.options.value  value for the dropdown
 * @param {string} props.options.label  label for the dropdown
 * @param {Function} props.search  function to be called when the value of the input changes
 * @param {string|number} props.selectedkey  selected key for the dropdown
 * @param {Function} props.onChange  function to be called when the value of the dropdown changes
 *
 * @returns {JSX.Element} a scroll down
 */
function Dropdown({
    values,
    placeholder,
    options,
    search,
    selectedkey,
    onChange,
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
        <Select
            showSearch
            style={{ width: "200px" }}
            placeholder={placeholder}
            options={optionsInSelect}
            onKeyUp={search}
            optionFilterProp="children"
            filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
            }
            defaultValue={selectedkey}
            onChange={onChange}
        />
    );
}

export { Image, InputWithLabel, Dropdown };
