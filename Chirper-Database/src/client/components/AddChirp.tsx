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
        if (this.state.chirp) {
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
                this.props.history.push('/');
            });
        } else {
            alert('Please enter a name and chirp.');
        }
    }
}

export interface IAddProps extends RouteComponentProps { }

export interface IAddState {
    name: string,
    chirp: string
}