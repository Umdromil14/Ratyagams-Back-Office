import { Modal, Button } from "antd";
import modalModeling from "../tools/modalModeling";
import postData from "../APIAccess/create";

/**
 * create a modal with the data given in parameter
 * 
 * @param {boolean} isModalOpen is the modal open
 * @param {function} setIsModalOpen set the modal open or not
 * @param {string} title the title of the modal
 * @param {Array} data the data that need to be display in the modal
 * @param {Object} form the object that contain the input of the right modal
 * @param {string} token the token of the user
 * @param {function} handleErrors handle the errors
 * 
 * @returns a modal with the data in parameter
 */
function modal(
    isModalOpen,
    setIsModalOpen,
    title,
    data,
    form,
    token,
    handleErrors
) {
    const handleOk = async () => {
        try {
            await postData(title, form, token);
            setIsModalOpen(false);
        } catch (error) {
            handleErrors(error.data.message.split(";"));
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Modal
                destroyOnClose={true}
                title={`Add a new ${title}`}
                open={isModalOpen}
                onOk={handleOk}
                style={{ top: 20 }}
                onCancel={handleCancel}
                footer={[
                    <label
                        key="label"
                        style={{ display: "flex", left: "0px", color: "red" }}
                    >
                        *Required
                    </label>,
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOk}>
                        Submit
                    </Button>,
                ]}
            >
                {modalModeling(title, data, form)}
            </Modal>
        </>
    );
}
export default modal;
