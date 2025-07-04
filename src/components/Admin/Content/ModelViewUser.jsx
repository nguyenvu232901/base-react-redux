import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import './ManageUser.scss'; // Assuming you have a CSS file for styling
import { FcPlus } from 'react-icons/fc';
import _ from 'lodash';

const ModelViewUser = props => {
  const { show, setShow, dataUpdate } = props; //object dung {}

  const handleClose = () => {
    setShow(false);
    setEmail('');
    setPassword('');
    setUsername('');
    setRole('USER');
    setPreviewImage('');
    props.resetUpdateData();
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('USER');
  const [preivewImage, setPreviewImage] = useState('');

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      //update state
      setEmail(dataUpdate.email);
      setUsername(dataUpdate.username);
      setRole(dataUpdate.role);
      if (dataUpdate.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
      }
    }
  }, [dataUpdate]);

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal
        show={show}
        onHide={handleClose}
        size='xl'
        backdrop='static'
        className='model-add-user'
      >
        <Modal.Header closeButton>
          <Modal.Title>Detail view a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='row g-3'>
            <div className='col-md-6'>
              <label className='form-label' htmlFor='email'>
                Email
              </label>
              <input
                type='email'
                className='form-control'
                value={email}
                disabled
                autoComplete='email'
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className='col-md-6'>
              <label className='form-label' htmlFor='password'>
                Password
              </label>
              <input
                type='password'
                className='form-control'
                value={password}
                disabled
                autoComplete='current-password'
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <div className='col-md-6'>
              <label className='form-label' htmlFor='username'>
                UserName
              </label>
              <input
                type='text'
                className='form-control'
                value={username}
                disabled
                autoComplete='username'
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div className='col-md-4'>
              <label className='form-label' htmlFor='role'>
                Role
              </label>
              <select
                className='form-select'
                value={role}
                disabled
                onChange={e => setRole(e.target.value)}
              >
                <option value={'USER'}>USER</option>
                <option value={'ADMIN'}>ADMIN</option>
              </select>
            </div>

            <div className='col-md-12'>
              <label className='form-label lable-upload' htmlFor='labelUpload'>
                <FcPlus /> Upload File Image
              </label>
              <input
                type='file'
                className='form-control'
                hidden
                id='labelUpload'
                disabled
                onChange={() => {}}
              />
            </div>

            <div className='col-md-12 img-preview'>
              {preivewImage ? <img src={preivewImage} alt='Preview' /> : <span>Preview Image</span>}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={() => handSubitCreateUser()}>
            Save
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

ModelViewUser.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  dataUpdate: PropTypes.shape({
    email: PropTypes.string,
    username: PropTypes.string,
    role: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  resetUpdateData: PropTypes.func.isRequired,
};

export default ModelViewUser;
