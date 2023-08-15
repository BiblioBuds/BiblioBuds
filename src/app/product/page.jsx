import ProductForm from '@/components/forms/products/productForm';
import style from './product.module.css';

const Product = () => {
  return (
    <div className={style.productmain}>
        <ProductForm/>
    </div>
  )
}

export default Product