import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

class Home extends React.Component<IAppProps, IAppState> {

    constructor(props: IAppProps) {
        super(props);
        this.state = {
            chirpsA: []
        };
    }

    async componentDidMount() {
        try {
            let r = await fetch('/api/chirps');
            let chirpsData = await r.json();

            // convert json object to array for state
            let chirpArray = Object.keys(chirpsData).map(function(k) { // k is id/key
                 if (chirpsData[k].name != "undefined") {
                     let cObj = { key: k, name: chirpsData[k].name, text: chirpsData[k].text}
                     return cObj;
                 }
            });        
            
            this.setState({
                chirpsA: chirpArray
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div>
            {this.state.chirpsA.map((chirp, index) => {
                if (chirp.name) return (          
                    <div key={'chirp-' + index} className="card m-4 shadow">
                        <div className="card-header"><h5 className="card-title bg-grey">{chirp.name}</h5></div>
                        <div className="card-body">
                            <p className="card-text">{chirp.text}</p>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-deep-purple" onClick={() => {this.SendToAdmin(chirp.key)}}>
                            Admin
                            </button>
                        </div>
                    </div>
                )
            })
            }
            </div>
        );
    }

    SendToAdmin(id: string) {
        console.log(id);
        this.props.history.push('/admin/' + id);
    }
}

interface Chirp {
    key: string,
    name: string,
    text: string
}

export interface IAppProps extends RouteComponentProps {

}

export interface IAppState {
    chirpsA: Array<Chirp>;
}

export default Home;