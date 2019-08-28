import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

export default class AddChirp extends React.Component<IAddProps, IAddState> {
    constructor(props: IAddProps) {
        super(props);
        this.state = {
            name: '',
            chirp: ''
        }
    }

    render() {
        if (localStorage.getItem('username')) {
            return (
                <div className="input-container bg-light p-2 m-0">
                    <div className="form-group m-4 rounded p-4 border shadow">
                        <h2 className="text-center p-2 rounded bg-deep-teal text-light">Add Chirp</h2>
                        <label htmlFor="name">Name</label>
                        <input type="text" disabled className="form-control" defaultValue={localStorage.getItem('username')}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ name: e.target.value })}></input>

                        <label htmlFor="chirp">Chirp</label>
                        <input type="text" className="form-control" defaultValue=""
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ chirp: e.target.value })}></input>

                        <button className="btn btn-deep-teal mt-3 col-md-12 text-center" type="submit"
                            onClick={this.SubmitChirp}>Submit Chirp</button>
                    </div>
                </div>
            );
        } else {
            return <button className="btn btn-deep-teal mt-3 col-md-12 text-center" type="submit"
                onClick={() => {this.props.history.push('/')}}>Click here to login</button>
        }
    }

    // send user data to store on the backend
    SubmitChirp = () => {
        if (this.state.chirp && localStorage.getItem('id')) {
            let chirpO = { UserID: localStorage.getItem('id'), ChirpText: this.state.chirp };
            //console.log(JSON.stringify(chirpO));
            return fetch('http://localhost:3000/api/chirpr/post/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                credentials: 'same-origin',
                body: JSON.stringify(chirpO),
            }).then(response => {
                this.CheckMentions();        
                this.props.history.push('/');       
            });                     
        } else {
            alert('Please enter a name and chirp.');
        }
    }

    CheckMentions = async() => {
        // check if post has a mention
        let chirpT = this.state.chirp;
        if (chirpT.includes("@")) {
            let cArr = chirpT.split(' ');
            for (let c of cArr) {
                if (c.includes("@")) { // found @ tag
                    let username = c.substring(1);
                    let r = await fetch('/api/chirpr/user/' + username);
                    let userData = await r.json();
                    let userid = userData[0].id;
                    if (userid) { // found user id, now add chirp info to mentions
                        // get our chirp id
                        let r2 = await fetch('/api/chirpr');
                        let chirpsData = await r2.json();

                        // look through chirps for our chirp to find id
                        let chirpid = -1;
                        Object.keys(chirpsData).map(function (k) { // k is id/key
                            if (chirpsData[k].UserName != "undefined") {
                                let cObj = { key: chirpsData[k].ChirpID, name: chirpsData[k].UserName, text: chirpsData[k].ChirpText }
                                if (chirpsData[k].ChirpText == chirpT) {
                                    chirpid = chirpsData[k].ChirpID;
                                    return;
                                }
                            }
                        });

                        // post mention to db
                        let m = await fetch('/api/chirpr/mentions/post/' + userid + '/' + chirpid);
                        let data = await m.json();
                    } else {
                        console.log('Error getting user id!');
                    }
                }
            }
        }     
    }
}

export interface IAddProps extends RouteComponentProps { }

export interface IAddState {
    name: string,
    chirp: string
}