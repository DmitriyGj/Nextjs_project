import {INavigationMenuProps} from './NavigationMenu.props';
import Link from "next/link";
import cn from 'classnames';
import style from './NavigationMenu.module.scss';

export const NavigationMenu = ({isFixed, LinkProps, className}: INavigationMenuProps) =>{
    return(
        <nav className={cn(className, style.Navigation, isFixed && style.fixed)}>
            {LinkProps.map((lp, index) => 
            <Link key={index} href={lp.href}>
                <a >{lp.displayName}</a>
            </Link>)}
        </nav>
    );
};