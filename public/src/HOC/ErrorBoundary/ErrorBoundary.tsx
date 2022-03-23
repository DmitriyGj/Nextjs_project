import { Props } from "next/script";
import React, { PropsWithChildren, ReactNode } from "react";

interface IErrorState {
    hasError: boolean
}

interface IErrorBoundaryProps{
    children: ReactNode
}

class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorState> {
    constructor(props: IErrorBoundaryProps) {
        super(props);

        // Define a state variable to track whether is an error or not
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: any) {
        // Update state so the next render will show the fallback UI
        console.error(error);
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        // You can use your own error logging service here
        console.error({ error, errorInfo });
    }
    
    render() {
        // Check if the error is thrown
        if (this.state.hasError) {
        // You can render any custom fallback UI
            return (<div>
                    <h2>Oops, there is an error!</h2>
                    <p>Try reload page</p>
                </div>);
        }

        // Return children components in case of no error

        return this.props.children;
    }
}

export default ErrorBoundary;