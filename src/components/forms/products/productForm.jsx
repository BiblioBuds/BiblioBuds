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
    setUsuario({
        ...product,
        [event.target.name]: event.target.value
    })
}

const handleModalClose = () => {
    setIsModalOpen(false);
    setModalContent('');
};

const handlerSubmit = (event) =>{
    event.preventDefault();
    setErrors(
        Validations({
            ...product,
            [event.target.name]: event.target.value
        })
    )
    if(!errors){
        setProduct({
          name: '',
          image: '',
          description: '',
          cost: '',
        })
        setModalContent(`Usuario creado exitosamente`);
        setIsModalOpen(true);
    }
}
  return (
    <div>ProductForm
      <form onSubmit={handlerSubmit} className={sytle.formproductcontainer}>
        <div className={style.formproductsection}>
          <label htmlFor="name">Name: </label>
          <input type="text" name='' value={product.name} placeholder='' autoComplete='off' onChange={handleOnChange}/>
        </div>
        {errors.name && <p className={style.formproducterrors}>{errors.name}</p>}
        <div className={style.formproductsection}>
          <label htmlFor="image">Image: </label>
          <input type="text" name='' value={product.image} placeholder='' autoComplete='off' onChange={handleOnChange}/>
        </div>
        {errors.image && <p className={style.formproducterrors}>{errors.image}</p>}
        <div className={style.formproductsection}>
          <label htmlFor="description">Description: </label>
          <input type="text" name='' value={product.description} placeholder='' autoComplete='off' onChange={handleOnChange}/>
        </div>
        {errors.description && <p className={style.formproducterrors}>{errors.description}</p>}
        {/* <div className={style.formproductsection}>
          <label htmlFor=""></label>
          <input type="text" name='' value={product.} placeholder='' autoComplete='off' onChange={handleOnChange}/>
        </div>
        {errors. && <p className={style.formproducterrors}>{errors.cost}</p>} */}
        <div className={style.formproductsection}>
          <label htmlFor="cost">Cost: </label>
          <input type="text" name='' value={product.cost} placeholder='' autoComplete='off' onChange={handleOnChange}/>
        </div>
        {errors.cost && <p className={style.formproducterrors}>{errors.cost}</p>}
      </form>
            <div className={style.divmodal}>
                <Modal isOpen={isModalOpen} onRequestClose={handleModalClose} className={stylem.cardmodalcontainer}>
                    <div className={stylem.cmaviso}>
                        <div className={stylem.cmavisotit}>
                            <h3>Aviso</h3>
                        </div>
                        <div className={stylem.cmclosecont}>
                            <button onClick={handleModalClose} className={stylem.cmclose}>X</button>
                        </div>
                    </div>
                    <p className={stylem.textm}>{modalContent}</p>
                </Modal>
            </div>
    </div>
  )
}

export default ProductForm