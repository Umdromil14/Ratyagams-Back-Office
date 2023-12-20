import { Form, Input, InputNumber, DatePicker } from "antd";
import { Dropdown } from "../form/form";
import dayjs from "dayjs";
import * as Enum from "../../constants/enum";
import { layout } from "../../constants/layoutModal";

/**
 * Creates the form of the publication modal
 *
 * @param {FormInstance} publicationForm the form data used in the modal
 * @param {object} modalValues the values used in the modal selects
 * @param {Array} modalValues.videoGames the video games used in the modal select
 * @param {Array} modalValues.platforms the platforms used in the modal select
 * @param {Function} handleSearch the function used to search in the modal select
 * @param {object} initialValues the initial values of the form
 * @param {number=} initialValues.video_game_id the initial video game id
 * @param {number=} initialValues.platform_code the initial platform code
 * @param {string=} initialValues.release_date the initial release date
 * @param {number=} initialValues.release_price the initial release price
 * @param {string=} initialValues.store_page_url the initial store page url
 *
 * @returns {JSX.Element} the form of the publication modal
 */
function publicationModal(publicationForm, modalValues, handleSearch, initialValues) {
    const { videoGames, platforms } = modalValues;
    
    const getInitialValues = () => {
        if (Object.keys(initialValues).length !== 0) {
            return {
                ...initialValues,
                release_date: dayjs(initialValues.release_date, "DD/MM/YYYY"),
                store_page_url: initialValues.store_page_url.props.href,
            };
        }
        return initialValues;
    };

    return (
        <Form
            {...layout}
            preserve={false}
            initialValues={getInitialValues()}
            form={publicationForm}
            name="publication"
            style={{
                maxWidth: 600,
            }}
        >
            <Form.Item
                name="platform_code"
                label="Select a platform"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Dropdown
                    placeholder="Select a platform"
                    options={{
                        label: "code",
                        value: "code",
                    }}
                    values={platforms}
                    search={(e) => {
                        handleSearch(e.target.value, Enum.TITLE_PLATFORM);
                    }}
                    selectedkey={initialValues.platform_code}
                />
            </Form.Item>
            <Form.Item
                name="video_game_id"
                label="Select a video game"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Dropdown
                    placeholder="Select a video game"
                    options={{
                        label: "name",
                        value: "id",
                    }}
                    values={videoGames}
                    search={(e) => {
                        handleSearch(e.target.value, Enum.TITLE_VIDEO_GAME);
                    }}
                    selectedkey={initialValues.video_game_id}
                />
            </Form.Item>
            <Form.Item
                name="release_date"
                label="Release date"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <DatePicker
                    format="YYYY-MM-DD"
                    onChange={(date) => {
                        publicationForm.setFieldsValue({
                            release_date: date,
                        });
                    }}
                />
            </Form.Item>
            <Form.Item name="release_price" label="Release price" >
                <InputNumber
                    min={0}
                    max={999.99}
                    placeholder="Price"
                    step={0.1}
                />
            </Form.Item>
            <Form.Item name="store_page_url" label="Store page url">
                <Input placeholder="Store page url" />
            </Form.Item>
        </Form>
    );
}

export default publicationModal;