import Link from 'next/link';
import style from './card.module.css';

const Card = ({id, title, author, image, price, pages}) =>{
    return(
        <div className={style.cardcontainer}>
            {/* <Link > */}
                <img src={image} alt={title}  className={style.cardimage}/>
                <section className={style.cardinfo}>
                    <span className={style.cardathor}>{title}</span>
                    <span className={style.cardathor}>{author}</span>
                    <section className={style.bookinfo}>
                        <span>Pages: {pages}</span>
                        <span>Price: ${price}</span>
                    </section>

                </section>
            {/* </Link> */}
        </div>
    )
}
export default Card;