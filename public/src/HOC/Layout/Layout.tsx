import { FC } from "react";
import { Header } from "./Header/Header";
import { LayoutProps } from "./Layout.props";
import { NavigationMenu } from "../../components/NavigationMenu/NavigationMenu";
import { Sidebar } from "./Sidebar/Sidebar";
import { StartndartLinks } from "../../constants";
import style from './Layout.module.scss';

const Layout = ({children} : LayoutProps) => {
    return(
        <div className={style.Layout}>
            <Header title="Ice And Fire" className ={style.Header} />
            <Sidebar className = {style.LeftSide}>
                <NavigationMenu isFixed ={true} LinkProps ={StartndartLinks} />
            </Sidebar>
            <div>
                <div className={style.Body}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export const withLayout = <T extends Record<string, unknown>>(Component: FC<T>) => {
	return function withLayoutComponent(props: T): JSX.Element {
		return (
				<Layout>
					<Component {...props} />
				</Layout>
		);
	};
};