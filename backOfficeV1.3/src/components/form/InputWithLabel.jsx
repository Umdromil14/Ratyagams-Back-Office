import "../../css/InputWithLabel.css";
import "../../css/modal.css";
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

function InputWithLabel(label, input, className, placeholder) {
    return (
        <div className={className.label}>
            <label htmlFor={label.htmlFor}>{label.label}</label>
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

export default InputWithLabel;
