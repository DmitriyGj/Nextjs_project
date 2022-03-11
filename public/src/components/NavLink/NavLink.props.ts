import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

import { LinkProps } from "next/link";

export interface INavLinkProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, LinkProps {
    href: string
    content?: string
    children?: ReactNode
}