import "../../css/form.css";
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
            <span>
            <label>{label.label}</label>
            {label.Required ? <label className="required">*</label> : null}
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

export default InputWithLabel;
