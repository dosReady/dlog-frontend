import React, { ErrorInfo } from 'react';


interface State {
    hasError : boolean
}

class ErrorBoundaryComp extends React.Component<{}, State> {
    state = {
        hasError: false,
    }


    static getDerivedStateFromError(error:Error):State {
        console.log(error);
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo):void {
        console.log("바운더리 에러")
    }

    render():JSX.Element {
        if(this.state.hasError) {
            return <div>"error as Error.toString()"</div>
        } else {
            return <>{this.props.children}</>;
        }
           
        
    }
}

export default ErrorBoundaryComp;