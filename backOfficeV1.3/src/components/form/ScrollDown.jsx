import { Select } from "antd";
function ScrollDown(
    values,
    handleChange,
    placeholder,
    options,
    defaultValue = undefined
) {
    const scrollDown = (
        <Select
            showSearch
            style={{ width: "300px" }}
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
    );
    return scrollDown;
}

export default ScrollDown;
