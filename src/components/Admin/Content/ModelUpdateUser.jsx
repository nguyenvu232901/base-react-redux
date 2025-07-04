import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import './ManageUser.scss'; // Assuming you have a CSS file for styling
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { putUpdateUser } from '../../../services/apiServices';
import _ from 'lodash';

const ModelUpdateUser = props => {
  const { show, setShow, dataUpdate } = props; //object dung {}

  const handleClose = () => {
    setShow(false);
    setEmail('');
    setPassword('');
    setUsername('');
    setRole('USER');
    setImage('');
    setPreviewImage('');
    props.resetUpdateData();
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('USER');
  const [image, setImage] = useState('');
  const [preivewImage, setPreviewImage] = useState('');

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      //update state
      setEmail(dataUpdate.email);
      setUsername(dataUpdate.username);
      setRole(dataUpdate.role);
      setImage('');
      if (dataUpdate.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
      }
    }
  }, [dataUpdate]);

  const handleUploadImage = e => {
    if (e?.target?.files?.[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]); //goi len server
      //   console.log("helo");
    }
  };

  const validateEmail = email => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.\(".+"\))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handSubitCreateUser = async () => {
    //validate

    //call API

    // C1: Dùng cho các biến bình thường
    // let data = {
    //   email: email,
    //   password: password,
    //   username: username,
    //   role: role,
    //   userImage: image, //mau tim la gia lay tu const ben treen
    // };
    // console.log(data);

    const isValidateEmail = validateEmail(email);
    if (!isValidateEmail) {
      toast.error('Invalid Email');
      return;
    }

    // // Cách 2: dùng cho gửi file
    // const data = new FormData();
    // data.append("email", email);
    // data.append("password", password);
    // data.append("username", username);
    // data.append("role", role);
    // data.append("userIamge", image);

    const data = await putUpdateUser(dataUpdate.id, username, role, image);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      // await props.fetchListUsers();
      // props.setCurrentPage(1);
      await props.fetchListUsersPaginate(props.currentPage);
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  // console.log("check dataUpdate", dataUpdate);

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
          <Modal.Title>update a user</Modal.Title>
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
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div className='col-md-4'>
              <label className='form-label' htmlFor='role'>
                Role
              </label>
              <select className='form-select' value={role} onChange={e => setRole(e.target.value)}>
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
                onChange={handleUploadImage}
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
          <Button variant='primary' onClick={() => handSubitCreateUser()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

ModelUpdateUser.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  dataUpdate: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    email: PropTypes.string,
    username: PropTypes.string,
    role: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  resetUpdateData: PropTypes.func.isRequired,
  fetchListUsersPaginate: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default ModelUpdateUser;
