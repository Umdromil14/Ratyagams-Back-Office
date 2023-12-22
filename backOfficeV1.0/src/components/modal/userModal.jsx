import { Form, Input, Switch, Cascader } from "antd";
import * as Enum from "../../constants/enum";
import "../../css/form.css";
import { layout } from "../../constants/layoutModal";

/**
 * Creates the form of the user modal
 *
 * @param {FormInstance} userForm the form data used in the modal
 * @param {object} initialValues the initial values of the form
 * @param {string=} initialValues.username the initial username
 * @param {string=} initialValues.email the initial email
 * @param {string=} initialValues.firstname the initial firstname
 * @param {string=} initialValues.lastname the initial lastname
 * @param {boolean=} initialValues.is_admin the initial is_admin value (true or false)
 * @param {object=} modalValues the values used in the modal cascader
 * @param {Array} modalValues.publications the publications used in the modal cascader
 * @param {Function=} handleSearch the function used to search in the modal cascader
 *
 * @returns {JSX.Element} the form of the user modal
 */
function userModal(userForm, initialValues, modalValues, handleSearch ) {
    /**
     * Gets the initial values of the form
     * 
     * @returns {object} the initial values of the form
     */
    const getInitialValues = () => {
        if (Object.keys(initialValues).length !== 0) {
            const { is_admin: isAdmin, ...defaultValues } = initialValues;
            return { is_admin: isAdmin === "true", ...defaultValues };
        }
        return initialValues;
    };

    let publications = [];
    if (modalValues) {
        ({ publications } = modalValues);
    }
    return (
        <Form
            {...layout}
            preserve={false}
            initialValues={getInitialValues()}
            form={userForm}
            name="user"
        >
            <Form.Item
                name="username"
                label="Username"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input placeholder="Username"/>
            </Form.Item>
            <Form.Item
                name="email"
                label="Email"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input placeholder="Email"/>
            </Form.Item>
            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item name="firstname" label="Firstname">
                <Input placeholder="Firstname"/>
            </Form.Item>
            <Form.Item name="lastname" label="Lastname">
                <Input placeholder="Lastname"/>
            </Form.Item>
            <Form.Item name="is_admin" valuePropName="checked" label="Is admin">
                <Switch
                    checkedChildren="Admin"
                    unCheckedChildren="User"
                    defaultChecked={getInitialValues().is_admin}
                />
            </Form.Item>
            {modalValues ? (
                <Form.Item
                    name="publications_ids"
                    label="select a publication"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Cascader
                        showSearch
                        placeholder="Select a game"
                        options={publications}
                        onKeyUp={(e) => {
                            handleSearch(e.target.value, Enum.TITLE_PUBLICATION);
                        }}
                        multiple={true}
                        showCheckedStrategy="SHOW_CHILD"
                    />
                </Form.Item>
            ) : null}
        </Form>
    );
}

export default userModal;