import { SidebarProps } from './Sidebar.props';
import cn from 'classnames'
import style from './Sidebar.module.scss';

export const Sidebar= ({children,className,...props}:SidebarProps) =>{
    return(
        <div className={cn(className, style.Sidebar)} {...props}>
                {children}
        </div>
    );
}