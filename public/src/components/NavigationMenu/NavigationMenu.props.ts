import { DetailedHTMLProps, HTMLAttributes } from "react";

import { IExtendedLinkProps } from "../../ts";

export interface INavigationMenuProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    isFixed?:  boolean | undefined
    LinkProps: IExtendedLinkProps[]
}
