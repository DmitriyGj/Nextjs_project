import { IHeaderProps } from './Header.props'
import cn from 'classnames'
import style from './Header.module.scss'

export const Header = ({title,className,...props }: IHeaderProps)  => {
    return(<div className={cn(style.Header, className)} {...props} >
        <h1>{title}</h1>
    </div>)
}