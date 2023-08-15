import style from './footer.module.css';
import Link from 'next/link';
import Image from 'next/image';

const participants = [
    {
        name: 'Alex',
        links:[
            {
                image: '/Media/IMG/github.png',
                route: 'https://github.com/ahlaulhee',
                label: 'github'
            },
            {
                image: '/Media/IMG/linkedin.png',
                route: 'https://ar.linkedin.com/in/alex-laulhe',
                label: 'Linkedin'
            },
            {
                image: '/Media/IMG/instagram.png',
                route: 'https://www.google.com/',
                label: 'Instagram'
            }
        ]
    },
    {
        name: 'Gonzalo',
        links:[
            {
                image: '/Media/IMG/github.png',
                route: 'https://www.google.com/',
                label: 'github'
            },
            {
                image: '/Media/IMG/linkedin.png',
                route: 'https://www.google.com/',
                label: 'Linkedin'
            },
            {
                image: '/Media/IMG/instagram.png',
                route: 'https://www.google.com/',
                label: 'Instagram'
            }
        ]
    },
    {
        name: 'Juan David',
        links:[
            {
                image: '/Media/IMG/github.png',
                route: 'https://github.com/juand2295',
                label: 'github'
            },
            {
                image: '/Media/IMG/linkedin.png',
                route: 'https://www.linkedin.com/in/juan-david-p%C3%A9rez-v%C3%A9lez-276090184',
                label: 'Linkedin'
            },
            {
                image: '/Media/IMG/instagram.png',
                route: 'https://www.google.com/',
                label: 'Instagram'
            }
        ]
    },
    {
        name: 'Julián',
        links:[
            {
                image: '/Media/IMG/github.png',
                route: 'https://github.com/Uruvsereg',
                label: 'github'
            },
            {
                image: '/Media/IMG/linkedin.png',
                route: 'https://www.linkedin.com/in/juli%C3%A1n-gonz%C3%A1lez-750aa6168/',
                label: 'Linkedin'
            },
            {
                image: '/Media/IMG/instagram.png',
                route: 'https://www.instagram.com/juliuzz9210/',
                label: 'Instagram'
            }
        ]
    },
]

const Footer = () => {
    return (
        <div className={style.footcontainer}>
            <div className={style.footerlogo}></div>
            {participants.map((participant, index) => (
                <div key={index} className={style.participantContainer}>
                    <h3>{participant.name}</h3>
                    <ul className={style.footul}>
                        {participant.links.map(({ image, route, label }) => (
                            <li key={route} className={style.footli}>
                                <Link href={route} target='_blank'>
                                    <Image src={image} width={26} height={26} alt={label} />
                                </Link>
                                <span className={style.footertooltip}>{label}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};
export default Footer