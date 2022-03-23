import  { ReactElement, useEffect, useRef, useState } from "react";
import { createPortal } from 'react-dom';

interface PortalProps {
    root :HTMLElement
    children:ReactElement   
};

export const Portal = ({root, children } : PortalProps) => {
    return createPortal(children, root);
};

