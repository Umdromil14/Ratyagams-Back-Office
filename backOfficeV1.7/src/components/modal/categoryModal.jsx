import { Form } from "antd";
import { Dropdown } from "../form/form";
import * as Enum from "../../constants/enum";
import { layout } from "../../constants/layoutModal";

/**
 * Creates the form of the category modal
 *
 * @param {FormInstance} categoryForm the form data used in the modal
 * @param {object} modalValues the values used in the modal selects
 * @param {Array} modalValues.videoGames the video games used in the modal select
 * @param {Array} modalValues.genres the genres used in the modal select
 * @param {Function} handleSearch the function used to search in the modal select
 * @param {object} initialValues the initial values of the form
 * @param {number=} initialValues.video_game_id the initial video game id
 * @param {number=} initialValues.genre_id the initial genre id
 *
 * @returns {JSX.Element} the form of the category modal
 */
function categoryModal(categoryForm, modalValues, handleSearch, initialValues) {
    const { videoGames, genres } = modalValues;
    return (
        <Form
            {...layout}
            preserve={false}
            initialValues={initialValues}
            form={categoryForm}
            name="category"
        >
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
                    selectedkey={initialValues.video_game_id}
                    search={(e) => {
                        handleSearch(e.target.value, Enum.TITLE_VIDEO_GAME);
                    }}
                />
            </Form.Item>
            <Form.Item
                name="genre_id"
                label="Select a genre"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Dropdown
                    placeholder="Select a genre"
                    options={{
                        label: "name",
                        value: "id",
                    }}
                    values={genres}
                    selectedkey={initialValues.genre_id}
                    search={(e) => {
                        handleSearch(e.target.value, Enum.TITLE_GENRE);
                    }}
                />
            </Form.Item>
        </Form>
    );
}

export default categoryModal;
