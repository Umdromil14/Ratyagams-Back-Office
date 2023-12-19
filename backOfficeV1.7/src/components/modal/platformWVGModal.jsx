import { Button, Card, DatePicker, Form, Input, InputNumber } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { Image } from "../form/form";
import { layout } from "../../constants/layoutModal";

/**
 * Creates the form of the platform modal with video games
 *
 * @param {FormInstance} form the form data used in the modal
 *
 * @returns {JSX.Element} the form of the platform modal with video games
 */
function platformModalWithVideoGames(form) {
    return (
        <Form
            {...layout}
            preserve={false}
            form={form}
            name="platformWithVideoGames"
        >
            <Form.Item
                label="Code"
                name="code"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input placeholder="Code"/>
            </Form.Item>
            <Form.Item
                label="Description"
                name="description"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input placeholder="Description"/>
            </Form.Item>
            <Form.Item
                label="Abbreviation"
                name="abbreviation"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input placeholder="Abbreviation" />
            </Form.Item>
            <Form.Item
                label="Picture"
                name="platformPicture"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Image
                    onChange={(e) => {
                        form.setFieldsValue({
                            platformPicture: e.target.files[0],
                        });
                    }}
                />
            </Form.Item>

            <Form.Item
                name="video_games"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Form.List name="video_games">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map((field) => (
                                <Card
                                    key={field.key}
                                    title={`Video game ${field.key + 1}`}
                                    extra={
                                        <CloseOutlined
                                            onClick={() => {
                                                remove(field.name);
                                            }}
                                        />
                                    }
                                    style={{
                                        marginBottom: "1rem",
                                        width: "150%",
                                        backgroundColor: "#f0f2f5",
                                    }}
                                >
                                    <Form.Item
                                        label="Name"
                                        name={[field.name, "name"]}
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Code"/>
                                    </Form.Item>
                                    <Form.Item
                                        label="Description"
                                        name={[field.name, "description"]}
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <Input.TextArea
                                            showCount
                                            maxLength={1000}
                                            placeholder="Description"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Release date"
                                        name={[field.name, "release_date"]}
                                        getValueFromEvent={(date) => {
                                            return date;
                                        }}
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <DatePicker format="YYYY-MM-DD" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Release price"
                                        name={[field.name, "release_price"]}
                                    >
                                        <InputNumber
                                            min={0}
                                            max={100}
                                            placeholder="Price"
                                            step={0.01}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Store page url"
                                        name={[field.name, "store_page_url"]}
                                    >
                                        <Input placeholder="Store page url"/>
                                    </Form.Item>
                                    <Form.Item
                                        label="Image"
                                        name={[field.name, "videoGamePicture"]}
                                        getValueFromEvent={(e) => {
                                            return e.target.files[0];
                                        }}
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <Image
                                            onChange={(e) => {
                                                form.setFieldsValue({
                                                    videoGamePicture:
                                                        e.target.files[0],
                                                });
                                            }}
                                        />
                                    </Form.Item>
                                </Card>
                            ))}
                            {fields.length < 10 ? (
                                <Form.Item>
                                    <Button
                                        style={{
                                            width: "50%",
                                        }}
                                        type="dashed"
                                        onClick={() => {
                                            add();
                                        }}
                                        block
                                    >
                                        Add a video game
                                    </Button>
                                </Form.Item>
                            ) : null}
                        </>
                    )}
                </Form.List>
            </Form.Item>
        </Form>
    );
}

export default platformModalWithVideoGames;
