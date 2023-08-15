'use client'
import style from './product.module.css';
import { useState } from "react"
import Validations from './Validations';
import Modal from 'react-modal';

const ProductForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [product, setProduct] = useState({
    name: '',
    image: '',
    description: '',
    cost: '',
  });
  
  const [errors, setErrors] = useState({
    name: '',
    image: '',
    description: '',
    cost: '',
  })
  
  const handleOnChange = (event) =>{
    setProduct({
        ...product,
        [event.target.name]: event.target.value
    })
}

  const handleModalClose = () => {
      setIsModalOpen(false);
      setModalContent('');
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    
    const validationErrors = Validations(product);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setProduct({
        name: '',
        image: '',
        description: '',
        cost: '',
      });
      setModalContent(`Product created successfully`);
      setIsModalOpen(true);
    }
  }
  return (
    <div>
      <form onSubmit={handlerSubmit} className={style.formproductcontainer}>
        <div className={style.formproductsection}>
          <label htmlFor="name">Name: </label>
          <input type="text" name='name' value={product.name} placeholder='' autoComplete='off' onChange={handleOnChange}/>
        </div>
        {errors.name && <p className={style.formproducterrors}>{errors.name}</p>}
        <div className={style.formproductsection}>
          <label htmlFor="image">Image: </label>
          <input type="text" name='image' value={product.image} placeholder='' autoComplete='off' onChange={handleOnChange}/>
        </div>
        {errors.image && <p className={style.formproducterrors}>{errors.image}</p>}
        <div className={style.formproductsection}>
          <label htmlFor="description">Description: </label>
          <input type="text" name='description' value={product.description} placeholder='' autoComplete='off' onChange={handleOnChange}/>
        </div>
        {errors.description && <p className={style.formproducterrors}>{errors.description}</p>}
        {/* <div className={style.formproductsection}>
          <label htmlFor=""></label>
          <input type="text" name='' value={product.} placeholder='' autoComplete='off' onChange={handleOnChange}/>
        </div>
        {errors. && <p className={style.formproducterrors}>{errors.cost}</p>} */}
        <div className={style.formproductsection}>
          <label htmlFor="cost">Cost: </label>
          <input type="text" name='cost' value={product.cost} placeholder='' autoComplete='off' onChange={handleOnChange}/>
        </div>
        {errors.cost && <p className={style.formproducterrors}>{errors.cost}</p>}
        <button type='submit'>Post</button>
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

export default ProductForm