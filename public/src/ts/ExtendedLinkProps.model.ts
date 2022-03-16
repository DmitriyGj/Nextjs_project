import { LinkProps } from "next/link";

export interface IExtendedLinkProps extends LinkProps{
    displayName: string
}