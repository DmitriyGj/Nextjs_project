import { useEffect, useState } from "react";

import { FC } from "react";
import { Header } from "./Header/Header";
import { LayoutProps } from "./Layout.props";
import { Loader } from "../../components/Loader/Loader";
import { NavigationMenu } from "../../components/NavigationMenu/NavigationMenu";
import { Sidebar } from "./Sidebar/Sidebar";
import { StartndartLinks } from "../../constants";
import style from './Layout.module.scss';
import { useRouter } from "next/router";

const Layout = ({children} : LayoutProps) => {
    const router = useRouter(); 

    const [isLoad, setIsLoad] = useState(false);  

    useEffect(() => {
        const routeChangeStartHandler = () => {
            document.body.style.overflow = 'hidden';
            setIsLoad(true);
        };
    
        const routerChangeCompleteHandler = () => {
            document.body.style.overflow = 'visible';
            setIsLoad(false);
        };

        router.events.on('routeChangeStart', routeChangeStartHandler );
        router.events.on('routeChangeComplete', routerChangeCompleteHandler );
        
        return() => {
            router.events.off('routeChangeStart', routeChangeStartHandler);
            router.events.off('routeChangeComplete', routerChangeCompleteHandler);
        };
    });



    return(
        <div className={style.Layout}>
            <Header title='Ice And Fire' className={style.Header} />
            <Sidebar className={style.LeftSide}>
                <NavigationMenu isFixed LinkProps={StartndartLinks} />
            </Sidebar>
            <div>
                <div className={style.Body}>
                    {isLoad && <Loader />}
                    {!isLoad && children}
                </div>
            </div>
        </div>
    );
};

export const withLayout = <T extends Record<string, unknown>>(Component: FC<T>) => {
	return function withLayoutComponent(props: T): JSX.Element {
		return (
				<Layout>
					<Component {...props} />
				</Layout>
		);
	};
};