import { Modal } from "antd";
const DeleteModal = ({ open, hideModal, handleDelete, content }) => {
  return (
    <>
      <Modal
        open={open}
        title="Delete"
        onOk={handleDelete}
        onCancel={hideModal}
        okText="Delete"
        cancelText="Cancel"
      >
        {content}
      </Modal>
    </>
  );
};
export default DeleteModal;
