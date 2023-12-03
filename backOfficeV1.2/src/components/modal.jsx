// https://ant.design/components/modal
import { Modal } from "antd";
import modalModeling from "../tools/modalModeling";

function modal(isModalOpen, setIsModalOpen, title, data, ref) {
    const handleOk = () => {
        //switch case to handle the different modals
        console.log(title);
        console.log(ref);
        setIsModalOpen(false);
        //clear the ref
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        //clear the ref
    };
    return (
        <>
            <Modal
                title={title}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                style={{width : "600px"}}
            >
                {modalModeling(title, data, ref)}
            </Modal>
        </>
    );
}
export default modal;
