import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';

class Mentions extends Component<IMenProps, IMenState> {

    constructor(props: IMenProps) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            username: this.props.match.params.username,
            chirps: [],
            postnames: [],
            refresh: false
        }
    }

    // load all mentions by id
    async componentDidMount() {
        try {
            let url = '/api/chirpr/mentions/' + this.state.id;
            let r = await fetch(url);
            let chirpData = await r.json();

            this.setState({
                chirps: chirpData[0], 
            });

            // get all of the names of posters
            let postnameHolder = [];
            for (let chirp of this.state.chirps) {
                this.GetUserIdByName(chirp.userid).then((val) => {
                    postnameHolder.push(val[0].name);
                    this.setState({refresh: true});
                });    
            }
            postnameHolder.sort((a,b) => (a.id - b.id) ? 1 : ((b.id - a.id) ? -1 : 0)); // make sure post names are in order
            this.setState({postnames: postnameHolder});
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        if (this.state.chirps.length > 0) {   
            return (
            <>
            <h2 className="text-center my-4 p-4 rounded bg-deep-teal text-light">Chirps for {this.state.username}</h2>
            {this.state.chirps.map((chirp, index) => {   
                    return (
                        <div key={'mention-' + chirp._created} className="card m-4 shadow">
                            <div className="card-header"><h5 className="card-title bg-grey">{this.state.postnames[index]}</h5></div>
                            <div className="card-body">
                                <p className="card-text">{chirp.text}</p>
                            </div>
                            <div className="card-footer">
                            </div>
                        </div>
                    )
            })}
            </>);
        } else {
            return (
                <div key={'mention-solo'} className="card m-4 shadow">
                    <div className="card-header"><h5 className="card-title bg-grey">Error</h5></div>
                    <div className="card-body">
                        <p className="card-text">There were no mentions for this user...</p>
                    </div>
                    <div className="card-footer">
                    </div>
                </div>
            )
        }
    }

    // get any username by userid
    GetUserIdByName = async (id: string) => {
        let uname = await fetch('/api/chirpr/user/byid/' + id);
        return await uname.json();
    }
}

interface IMenProps extends RouteComponentProps< {id: string, username: string} > {

}

interface Chirp {
    id: string, 
    userid: string,
    text: string,
    _created: string
}

interface IMenState {
    id: string,
    username: string,
    chirps: Array<Chirp>,
    postnames: Array<string>,
    refresh: boolean
}

export default Mentions;