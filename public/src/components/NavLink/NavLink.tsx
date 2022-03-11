import { INavLinkProps } from "./NavLink.props";
import Link from "next/link";
import style from './NavLink.module.scss';

export const NavLink = ({ children, href, content }: INavLinkProps) => {
    return(
        <Link href={ href } passHref>
            <a  className={style.NavLink}>{ content || children }</a>
        </Link>
    );
};