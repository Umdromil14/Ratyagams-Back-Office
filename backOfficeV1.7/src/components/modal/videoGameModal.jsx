import { Form, Input } from "antd";
import { Image } from "../form/form";
import { layout } from "../../constants/layoutModal";


/**
 * Creates the form of the video game modal
 *
 * @param {FormInstance} videoGameForm the form data used in the modal
 * @param {object} initialValues the initial values of the form
 * @param {number=} initialValues.name the initial name of the video game
 * @param {number=} initialValues.description the initial description of the video game
 * @param {object=} modalValues the values used in the modal image
 * @param {Blob} modalValues.image the initial image of the video game
 *
 * @returns {JSX.Element} the form of the video game modal
 */
function videoGameModal(videoGameForm, initialValues, modalValues) {
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
            form={videoGameForm}
            name="videoGame"
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
                <Input placeholder="Name"/>
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
                <Input.TextArea showCount maxLength={1000} placeholder="Description"/>
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
                        videoGameForm.setFieldsValue({
                            picture: e.target.files[0],
                        });
                    }}
                />
            </Form.Item>
            {image ? (
                <div style={{display:"flex",justifyContent:"center"}}>
                    <img
                        src={image}
                        alt="video game"
                        style={{ width: "150px" }}
                    />
                </div>
            ) : null}
        </Form>
    );
}

export default videoGameModal;
