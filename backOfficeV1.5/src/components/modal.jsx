import { Modal, Button } from "antd";
import modalModeling from "../tools/modalModeling";
import postData from "../APIAccess/create";
function modal(
    isModalOpen,
    setIsModalOpen,
    title,
    data,
    ref,
    token,
    handleErrors
) {
    const handleOk = async () => {
        try {
            await postData(title, ref, token);
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
                {modalModeling(title, data, ref)}
            </Modal>
        </>
    );
}
export default modal;
