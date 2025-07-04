import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import { deleteUsers } from '../../../services/apiServices';
import { toast } from 'react-toastify';

const ModelDeleteUser = props => {
  const { show, setShow, dataDelete } = props;

  const handleClose = () => setShow(false);

  const handleSubmitDeleteuser = async () => {
    const data = await deleteUsers(dataDelete.id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      // await props.fetchListUsers();
      props.setCurrentPage(1);
      await props.fetchListUsersPaginate(1);
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete User ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this user email ={' '}
          <b>{dataDelete && dataDelete.email ? dataDelete.email : ''}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant='primary'
            onClick={() => {
              handleSubmitDeleteuser();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

ModelDeleteUser.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  dataDelete: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    email: PropTypes.string,
  }).isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  fetchListUsersPaginate: PropTypes.func.isRequired,
};

export default ModelDeleteUser;
