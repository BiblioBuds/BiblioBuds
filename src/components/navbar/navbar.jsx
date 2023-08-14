'use client'
import style from './navbar.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavBar = () =>{
    const pathname = usePathname();
    const getLinks = () => {
        if (pathname === '/') {
            return [
                {
                  label: 'Signup',
                  route: '/signup'
                },
                {
                    label: 'Login',
                    route: '/login'
                },
                // {
                //   label: 'Logout',
                //   route: '/api/auth/signout'
                // },
            ];
        } 
        else if (pathname === '/home') {
            return [
                {
                  label: 'Profile',
                  route: '/profile'
                },
                {
                    label: 'My purashes',
                    route: '/purashes'
                },
                {
                  label: 'About',
                  route: '/about'
                },
                {
                    label: 'Cart',
                    route: '/cart'
                },
                {
                    label: 'Logout',
                    route: '/'
                },
                // {
                //   label: 'Logout',
                //   route: '/api/auth/signout'
                // },
            ];
        }
        else if (pathname === '/profile') {
            return [
                {
                  label: 'Home',
                  route: '/home'
                },
                {
                  label: 'About',
                  route: '/about'
                },
                {
                    label: 'Cart',
                    route: '/cart'
                },
                {
                    label: 'Logout',
                    route: '/'
                },
                // {
                //   label: 'Logout',
                //   route: '/api/auth/signout'
                // },
            ];
        }
        else if (pathname === '/purashes') {
            return [
                {
                  label: 'Home',
                  route: '/home'
                },
                {
                    label: 'Profile',
                    route: '/profile'
                },
                {
                  label: 'About',
                  route: '/about'
                },
                {
                    label: 'Cart',
                    route: '/cart'
                },
                {
                    label: 'Logout',
                    route: '/'
                },
                // {
                //   label: 'Logout',
                //   route: '/api/auth/signout'
                // },
            ];
        }
        else{
            return [
                {
                  label: 'Landing',
                  route: '/'
                },
            ];
        }
    }
    const links = getLinks();
    return(
        <nav className={style.navcontainer}>
            <ul className={style.navul}>
                {links.map(({label, route}) =>(
                    <li key={route}>
                        <Link href={route}>
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
export default NavBar;