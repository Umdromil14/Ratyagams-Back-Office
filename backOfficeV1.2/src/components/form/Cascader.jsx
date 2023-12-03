import { Cascader } from "antd";
function MultipleScrollDown (options,onChange,defaultValue = undefined) {
    const scrollDown = (
        <Cascader
            options={options}
            onChange={onChange}
            defaultValue={defaultValue}
        />
    );
    return scrollDown;

}

export default MultipleScrollDown;