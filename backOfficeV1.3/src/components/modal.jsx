import { Modal, Button } from "antd";
import modalModeling from "../tools/modalModeling";
import postData from "./create"

function modal(isModalOpen, setIsModalOpen, title, data, ref,token) {
    const handleOk = () => {
        //switch case to handle the different modals
        postData(title, ref,token);
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Modal
                title={`Add an/a ${title}`}
                open={isModalOpen}
                onOk={handleOk}
                style={{ top: 20 }}
                onCancel={handleCancel}
                footer={[
                    <label key="label" style={{display:"flex",left: "0px",color:"red"}}>*Required</label>,
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>,
                    <Button key="submit" type="primary"  onClick={handleOk}>
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
