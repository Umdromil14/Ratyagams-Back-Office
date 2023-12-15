import { Modal, Button } from "antd";
import createModal from "./createModal";
import postForm from "../APIAccess/create";
import { useSelector } from "react-redux";

/**
 * create a modal with the data given in parameter
 *
 * @param {boolean} isModalOpen is the modal open
 * @param {function} setIsModalOpen set the modal open or not
 * @param {string} title the title of the modal
 * @param {Array} data the data that need to be display in the modal
 * @param {Object} form the object that contain the input of the right modal
 * @param {function} handleErrors handle the errors
 *
 * @returns a modal with the data in parameter
 */
function ModalView({
    isModalOpen,
    setIsModalOpen,
    title,
    data,
    handleErrors,
    handleSearch,
}) {
    const token = useSelector((state) => state.token.value);
    const formData = new FormData();
    const handleSubmit = async () => {
        try {
            await postForm(title, formData, token);
            setIsModalOpen(false);
        } catch (error) {
            console.log(error);
            handleErrors(error.data.message.split(";"));
        }
    };

    return (
        <>
            <Modal
                destroyOnClose={true}
                title={`Add a new ${title}`}
                open={isModalOpen}
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
                        key="back"
                        onClick={() => {
                            setIsModalOpen(false);
                        }}
                    >
                        Return
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleSubmit}>
                        Submit
                    </Button>,
                ]}
            >
                {createModal(title, data, formData, handleSearch)}
            </Modal>
        </>
    );
}
export default ModalView;
