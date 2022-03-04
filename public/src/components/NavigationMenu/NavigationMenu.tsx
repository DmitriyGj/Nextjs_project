import {INavigationMenuProps} from './NavigationMenu.props';
import Link from "next/link";
import cn from 'classnames';
import style from './NavigationMenu.module.scss';
import {v4 as uuid} from 'uuid';

export const NavigationMenu = ({isFixed, LinkProps, className}: INavigationMenuProps) =>{
    return(
        <nav className={cn(className, style.Navigation, isFixed && style.fixed)}>
            {LinkProps.map(lp => 
            <Link key = {uuid()} href = {lp.href}>
                <a >{lp.displayName}</a>
            </Link>)}
        </nav>
    )
}