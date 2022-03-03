import Link from 'next/link';
import { SidebarProps } from './Sidebar.props';
import cn from 'classnames'
import style from './Sidebar.module.scss';

export const Sidebar= ({className,...props}:SidebarProps) =>{
    return(
        <div className={cn(className, style.Sidebar)} {...props}>
            <nav className={style.Navigation}>
                <Link href = 'https://prikolov.net'><a>ssss</a></Link>
            </nav>
        </div>
    );
}