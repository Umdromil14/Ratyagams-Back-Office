import { Form, Input } from "antd";
import { Image } from "../form/form";
import { layout } from "../../constants/layoutModal";

/**
 * Creates the form of the genre modal
 *
 * @param {FormInstance} genreForm the form data used in the modal
 * @param {object} initialValues the initial values of the form
 * @param {string=} initialValues.name the initial name
 * @param {string=} initialValues.description the initial description
 * @param {object=} modalValues the values used in the modal image
 * @param {Blob} modalValues.image the initial image
 *
 * @returns {JSX.Element} the form of the genre modal
 */
function genreModal(genreForm, initialValues, modalValues) {
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
            form={genreForm}
            name="genre"
        >
            <Form.Item
                name="name"
                label="Name"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input placeholder="Name" />
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
                <Input.TextArea showCount maxLength={500} placeholder="Description" />
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
                        genreForm.setFieldsValue({
                            picture: e.target.files[0],
                        });
                    }}
                />
            </Form.Item>
            {image ? (
                <div style={{display:"flex",justifyContent:"center"}}>
                    <img
                        src={image}
                        alt="genre"
                        style={{ width: "150px" }}
                    />
                </div>
            ) : null}
        </Form>
    );
}

export default genreModal;
