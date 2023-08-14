import style from './footer.module.css';
import Link from 'next/link';
import Image from 'next/image';

const links = [
    {
        image: '/Media/IMG/whatsapp.webp',
        route: 'https://github.com/Uruvsereg',
        label: 'Github'
    },
    {
        image: '/Media/IMG/facebook.png',
        route: 'https://github.com/ahlaulhee',
        label: 'Linkedin'
    },
    {
        image: '/Media/IMG/twitter.png',
        route: 'https://github.com/juand2295',
        label: 'Twitter'
    },
    {
        image: '/Media/IMG/instagram.png',
        route: 'https://www.google.com/',
        label: 'Twitter'
    }
]

const Footer = () =>{
    return(
        <div className={style.footcontainer}>
            <ul className={style.footul}>
                {links.map(({image, route, label}) =>(
                    <li key={route} className={style.footli}>
                        <Link href={route} target='_blank'>
                            <Image src={image} width={26} height={26} alt={label}/>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default Footer