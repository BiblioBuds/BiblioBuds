import Link from 'next/link';
import style from './card.module.css';

const Card = ({id, title, author, image, price, pages}) =>{
    return(
        <div className={style.cardcontainer}>
            {/* <Link > */}
                <img src={image} alt={title}  className={style.cardimage}/>
                <section className={style.cardathor}>{author}</section>
                <section className={style.cardinfo}>
                    <span>Pages: {pages}</span>
                    <span>Price: ${price}</span>
                </section>
            {/* </Link> */}
        </div>
    )
}
export default Card;