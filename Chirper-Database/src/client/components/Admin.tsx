import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';

class Admin extends Component<IAdminProps, IAdminState> {

    constructor(props: IAdminProps) {
        super(props);
        this.state = {
            chirp: {name: '', text: ''},
            id: this.props.match.params.id,
            nName: '',
            nText: ''
        }
    }

    async componentDidMount() {
        try {
            let url = '/api/chirps/' + this.state.id;
            let r = await fetch(url);
            let chirpData = await r.json();
        
            this.setState({
                chirp: chirpData,
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        if (this.state.chirp.name) {
            return (
                <div className="input-container bg-light m-5 rounded p-4 border shadow">
                <h2 className="text-center p-2 rounded bg-deep-teal text-light">Edit Chirp</h2>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" defaultValue={this.state.chirp.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({nName: e.target.value})}></input>

                    <label htmlFor="chirp">Chirp</label>
                    <input type="text" className="form-control" defaultValue={this.state.chirp.text}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({nText: e.target.value})}></input>

                    <button className="btn btn-warning ml-0 mt-3" type="submit"
                    onClick={this.UpdateChirp}>Update Chirp</button>

                    <button className="btn btn-danger ml-2 mt-3" type="submit"
                    onClick={this.DeleteChirp}>Delete Chirp</button>

                    <button className="btn btn-deep-teal ml-2 mt-3" type="submit"
                    onClick={() => {this.props.history.push('/')}}>  Back  </button>
                </div>
            </div>
            );
        } else {
            return (<h1>No chirps returned. Invalid ID.</h1>)
        }
    }

    // update user chirpstore on the backend
    UpdateChirp = () => {       
        // make sure new text is not empty (make sure an update occured from input)
        if (this.state.nName) this.state.chirp.name = this.state.nName;
        if (this.state.nText) this.state.chirp.text = this.state.nText;

        let url = '/api/chirps/update/' + this.state.id;
        return fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: 'same-origin',
            body: JSON.stringify(this.state.chirp),
        }).then(response => {           
            this.props.history.push('/');
        });
    }

    DeleteChirp = () => {
        let url = '/api/chirps/delete/' + this.state.id;
        return fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: 'same-origin'
        }).then(response => {           
            this.props.history.push('/');
        });
    }
}

interface IAdminProps extends RouteComponentProps< {id: string} > {

}

interface Chirp {
    name: string,
    text: string;
}

interface IAdminState {
    chirp: Chirp,
    id: string,
    nName: string,
    nText: string
}

export default Admin;