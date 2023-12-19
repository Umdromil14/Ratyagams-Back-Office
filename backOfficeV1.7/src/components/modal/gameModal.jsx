import { Form, Input, Switch, DatePicker, InputNumber, Cascader } from "antd";
import { Dropdown } from "../form/form";
import * as Enum from "../../constants/enum";
import dayjs from "dayjs";
import { layout } from "../../constants/layoutModal";

/**
 * Creates the form of the game modal
 *
 * @param {FormInstance} gameForm the form data used in the modal
 * @param {object} modalValues the values used in the modal select and cascader
 * @param {Array} modalValues.users the users used in the modal select
 * @param {Array} modalValues.publications the publications used in the modal cascader
 * @param {Function} handleSearch the function used to search in the modal select and cascader
 * @param {object} initialValues the initial values of the form
 * @param {number=} initialValues.user_id the initial user id
 * @param {number=} initialValues.publication_id the initial publication id
 * @param {string=} initialValues.is_owned the initial is_owned value (true or false)
 * @param {string=} initialValues.review_date the initial review date
 * @param {number=} initialValues.review_rating the initial review rating
 * @param {string=} initialValues.review_comment the initial review comment
 *
 * @returns {JSX.Element} the form of the game modal
 */
function gameModal(gameForm, modalValues, handleSearch, initialValues) {
    const { users, publications } = modalValues;
    
    const getInitialValues = () => {
        if (Object.keys(initialValues).length !== 0) {
            return {
                ...initialValues,
                is_owned: initialValues.is_owned === "true",
                review_date: initialValues.review_date ? dayjs(initialValues.review_date, "DD/MM/YYYY") : null,
                publication_id: getCascadeurDefaultValue(),
            };
        }
        return initialValues;
    };

    const getCascadeurDefaultValue = () => {
        if (publications && initialValues.publication_id) {
            const platform = publications.find((platform) => {
                return platform.children.some(
                    (game) => game.value === initialValues.publication_id
                );
            });

            return platform !== undefined
                ? [platform.value, initialValues.publication_id]
                : null;
        }
    };

    return (
        <Form
            {...layout}
            preserve={false}
            initialValues={getInitialValues()}
            form={gameForm}
            name="game"
        >
            <Form.Item
                name="user_id"
                label="select a username"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Dropdown
                    placeholder="select a username"
                    options={{
                        label: "username",
                        value: "id",
                    }}
                    values={users}
                    search={(e) => {
                        handleSearch(e.target.value, Enum.TITLE_USER);
                    }}
                    selectedkey={initialValues.user_id}
                />
            </Form.Item>
            <Form.Item
                name="publication_id"
                label="select a publication"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Cascader
                    showSearch
                    expandTrigger="hover"
                    placeholder="Select a game"
                    options={publications}
                    onKeyUp={(e) => {
                        handleSearch(e.target.value, Enum.TITLE_PUBLICATION);
                    }}
                    onChange={(value) => {
                        gameForm.setFieldsValue({
                            publication_id: value,
                        });
                    }
                    }
                />

            </Form.Item>
            <Form.Item
                valuePropName="checked"
                name="is_owned"
                label="Is owned"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Switch
                    checkedChildren="Yes"
                    unCheckedChildren="No"
                    defaultChecked={getInitialValues().is_owned}
                />
            </Form.Item>
            <Form.Item name="review_date" label="review date">
                <DatePicker
                    format="YYYY-MM-DD"
                    onChange={(date) => {
                        gameForm.setFieldsValue({
                            release_date: date,
                        });
                    }}
                />
            </Form.Item>
            <Form.Item name="review_rating" label="review rating">
                <InputNumber min={0} max={5} placeholder={"Rating"} step={1} />
            </Form.Item>
            <Form.Item name="review_comment" label="review comment">
                <Input.TextArea showCount maxLength={5000} placeholder="Your review comment"/>
            </Form.Item>
        </Form>
    );
}

export default gameModal;