'use client'
import style from './userform.module.css';
import { useState } from "react"
import Validations from './Validations';
import Modal from 'react-modal';

const UserForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [newUser, setNewUser] = useState({
    mail: '',
    // confirmmail: '',
    password: '',
    // confirmpassword: '',
  })

  const [errors, setErrors] = useState({
    mail: '',
    // confirmmail: '',
    password: '',
    // confirmpassword: '',
  })
  
  const handleOnChange = (event) =>{
    setNewUser({
        ...newUser,
        [event.target.name]: event.target.value
    })
}

  const handleModalClose = () => {
      setIsModalOpen(false);
      setModalContent('');
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    
    const validationErrors = Validations(newUser);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setNewUser({
        mail: '',
        // confirmmail: '',
        password: '',
        // confirmpassword: '',
      });
      setModalContent(`Product created successfully`);
      setIsModalOpen(true);
    }
  }
  return (
    <div>
        <header>New user</header>
        <form  onSubmit={handlerSubmit} className={style.formnewusercontainer}>
          <section>
            <label htmlFor="mail"></label>
            <input type="text" name='mail' value='' placeholder='mail' autoComplete='off' onChange={handleOnChange}/>
          </section>
          {/* <section>
            <label htmlFor="confirmmail"></label>
            <input type="text" name='confirmmail' value='' placeholder='confirm mail' autoComplete='off' onChange={handleOnChange}/>
          </section> */}
          <section>
            <label htmlFor="password"></label>
            <input type="text" name='password' value='' placeholder='password' autoComplete='off' onChange={handleOnChange}/>
          </section>
          {/*
          <section>
            <label htmlFor="confimpassword"></label>
            <input type="text" name='confimpassword' value='' placeholder='Confirm password' autoComplete='off' onChange={handleOnChange}/>
          </section>
          */}
          <button type='submit'>Log in</button>
        </form>
            <div className={style.divmodal}>
                <Modal isOpen={isModalOpen} onRequestClose={handleModalClose} className={style.cardmodalcontainer}>
                    <div className={style.cmaviso}>
                        <div className={style.cmavisotit}>
                            <h3>Aviso</h3>
                        </div>
                        <div className={style.cmclosecont}>
                            <button onClick={handleModalClose} className={style.cmclose}>X</button>
                        </div>
                    </div>
                    <p className={style.textm}>{modalContent}</p>
                </Modal>
            </div>
    </div>
  )
}

export default UserForm