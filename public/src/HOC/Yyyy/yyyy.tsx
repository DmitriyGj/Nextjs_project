import {Component, FC} from "react";


export function Shablon(WrappedComponent : FC, props:){
    return class Page extends Component{
        constructor(props){
            super(props);
            this.state= {
                loading: true
            };

            this.toggleLoadingStateHandler = this.toggleLoadingStateHandler.bind(this);
        }

        componentDidMount(){
            
        }

        toggleLoadingStateHandler(){
            this.setState(prevState=>({ loading: !prevState.loading}));
        }

        render(){
            return this.state.loading?
                    <p>Loading...</p>:
                    <WrappedComponent {...this.props} />;
        }
    };
}