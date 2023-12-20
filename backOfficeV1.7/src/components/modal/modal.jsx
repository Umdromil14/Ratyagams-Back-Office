import { Modal, Button } from "antd";
import post from "../../APIAccess/create";
import { useSelector } from "react-redux";
import { Form } from "antd";
import update from "../../APIAccess/update";
import userModal from "./userModal";
import gameModal from "./gameModal";
import publicationModal from "./publicationModal";
import platformModal from "./platformModal";
import categoryModal from "./categoryModal";
import videoGameModal from "./videoGameModal";
import genreModal from "./genreModal";
import platformModalWithVideoGames from "./platformWVGModal";
import "../../css/form.css";
import * as Enum from "../../constants/enum";

/**
 * Creates a modal with the data given in parameter
 *
 * @param {Object} props
 * @param {boolean} props.isModalOpen `true` if the modal is open, `false` otherwise
 * @param {function} props.setIsModalOpen set the modal open or not
 * @param {string} props.modalTitle the title of the modal
 * @param {Array} props.modalValues the data that need to be display in the modal selects, cascaders or images
 * @param {Object} props.form the object that contain the input of the right modal
 * @param {function} props.handleNotification handle the response
 * @param {function} props.handleSearch handle the search in the modal selects, cascaders or images
 * @param {Object=} props.initialValues the initial values of the modal
 * @param {function} props.onUpdate the function to call when the modal is updated
 *
 * @returns a modal with the data in parameter
 */
function ModalView({
    isModalOpen,
    setIsModalOpen,
    modalTitle,
    modalValues,
    handleNotification,
    handleSearch,
    initialValues = {},
    onUpdate,
}) {
    const token = useSelector((state) => state.token.value);
    const [form] = Form.useForm();
    const action =
        Object.keys(initialValues).length !== 0 ? "Update" : "Create";

    const getModalTitle = () => {
        if (modalTitle) {
            let title = modalTitle.replace(/([A-Z])/g, " $1");
            title = title.charAt(0).toUpperCase() + title.slice(1);

            return `${action} a/an ${title}`;
        }
    };

    const handleSubmit = () => {
        if (Object.keys(initialValues).length !== 0) {
            update(
                modalTitle,
                token,
                form.getFieldsValue(),
                initialValues.key.split("/")
            )
                .then(() => {
                    setIsModalOpen(false);
                    handleNotification(["Update successful"], "success");
                    onUpdate();
                })
                .catch((error) => {
                    console.log(error);
                    handleNotification(error.response?.data.message.split(";"));
                });
        } else {
            post(modalTitle, form.getFieldsValue(), token)
                .then(() => {
                    setIsModalOpen(false);
                    handleNotification(["Creation successful"], "success");
                })
                .catch((error) => {
                    console.log(error);
                    handleNotification(error.response?.data.message.split(";"));
                });
        }
    };

    return (
        <>
            <Modal
                destroyOnClose={true}
                title={getModalTitle()}
                open={isModalOpen}
                afterClose={() => {
                    form.resetFields();
                }}
                style={{ top: 20 }}
                onCancel={() => {
                    setIsModalOpen(false);
                }}
                footer={[
                    <label
                        key="label"
                        style={{ display: "flex", left: "0px", color: "red" }}
                    >
                        *Required
                    </label>,
                    <Button
                        key="reset"
                        onClick={() => {
                            handleSearch("", modalTitle);
                            form.resetFields();
                        }}
                    >
                        Reset
                    </Button>,
                    <Button
                        key="back"
                        onClick={() => {
                            setIsModalOpen(false);
                        }}
                    >
                        Return
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        htmlType="submit"
                        onClick={handleSubmit}
                    >
                        {action}
                    </Button>,
                ]}
            >
                {isModalOpen &&
                    createModal(
                        modalTitle,
                        modalValues,
                        form,
                        handleSearch,
                        initialValues
                    )}
            </Modal>
        </>
    );
}

/**
 * Creates a modal based on the title
 *
 * @param {string} modalTitle the title of the modal
 * @param {object} modalValues the values of the modal selects or cascaders
 * @param {FormInstance} form the form data used in the modal
 * @param {Function} handleSearch the function used to search in the modal selects or cascaders
 * @param {object} initialValues the initial values of the form
 *
 * @returns {JSX.Element} a modal
 */
function createModal(
    modalTitle,
    modalValues,
    form,
    handleSearch,
    initialValues
) {
    switch (modalTitle) {
        case Enum.TITLE_PUBLICATION:
            return publicationModal(
                form,
                modalValues,
                handleSearch,
                initialValues
            );
        case Enum.TITLE_GAME:
            return gameModal(form, modalValues, handleSearch, initialValues);
        case Enum.TITLE_PLATFORM:
            return platformModal(form, initialValues, modalValues);
        case Enum.TITLE_USER:
            return userModal(form, initialValues, );
        case Enum.TITLE_CATEGORY:
            return categoryModal(
                form,
                modalValues,
                handleSearch,
                initialValues
            );
        case Enum.TITLE_VIDEO_GAME:
            return videoGameModal(form, initialValues, modalValues);
        case Enum.TITLE_GENRE:
            return genreModal(form, initialValues, modalValues);
        case Enum.TITLE_USER_WITH_GAME:
            return userModal(form,initialValues ,modalValues, handleSearch);
        case Enum.TITLE_PLATFORM_WITH_VIDEO_GAMES:
            return platformModalWithVideoGames(form);
    }
}
export default ModalView;
