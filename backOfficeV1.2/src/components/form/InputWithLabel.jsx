import "../../css/InputWithLabel.css";
/**
 *
 * @param {Object} label
 * @param {string} label.htmlFor
 * @param {Object} input
 * @param {string} input.type
 * @param {string} input.id
 * @param {string} input.ref
 * @returns
 */

function InputWithLabel(label, input) {
    return (
        <div className="label">
            <label htmlFor={label.htmlFor}>{label.label}</label>
            <input
                className="input"
                type={input.type}
                id={input.id}
                ref={input.ref}
            />
        </div>
    );
}

export default InputWithLabel;
