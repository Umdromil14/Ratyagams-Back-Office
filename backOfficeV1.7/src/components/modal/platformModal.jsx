import { Form, Input } from "antd";
import { Image } from "../form/form";
import { layout } from "../../constants/layoutModal";

/**
 * Creates the form of the platform modal
 *
 * @param {FormInstance} platformForm the form data used in the modal
 * @param {object} initialValues the initial values of the form
 * @param {string=} initialValues.code the initial code
 * @param {string=} initialValues.description the initial description
 * @param {string=} initialValues.abbreviation the initial abbreviation
 * @param {object=} modalValues the values used in the modal image
 * @param {Blob} modalValues.image the initial image of the platform
 *
 * @returns {JSX.Element} the form of the platform modal
 */
function platformModal(platformForm, initialValues, modalValues) {
    let image;
    if (modalValues && Object.keys(initialValues).length !== 0) {
        ({ image } = modalValues);
        image = URL.createObjectURL(image);
    }
    return (
        <Form
            {...layout}
            preserve={false}
            initialValues={initialValues}
            form={platformForm}
            name="platform"
            style={{
                maxWidth: 600,
            }}
        >
            <Form.Item
                name="code"
                label="Code"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input placeholder="Code"/>
            </Form.Item>
            <Form.Item
                name="description"
                label="Description"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input placeholder="Description" />
            </Form.Item>
            <Form.Item
                name="abbreviation"
                label="Abbreviation"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input placeholder="Abbreviation" />
            </Form.Item>
            <Form.Item
                name="picture"
                label="Picture"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Image
                    onChange={(e) => {
                        platformForm.setFieldsValue({
                            picture: e.target.files[0],
                        });
                    }}
                />
            </Form.Item>
            {image ? (
                <div style={{display:"flex",justifyContent:"center"}}>
                    <img
                        src={image}
                        alt="platform"
                        style={{ width: "150px" }}
                    />
                </div>
            ) : null}
        </Form>
    );
}

export default platformModal;
