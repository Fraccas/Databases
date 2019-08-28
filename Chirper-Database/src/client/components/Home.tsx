import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

class Home extends React.Component<IAppProps, IAppState> {

    constructor(props: IAppProps) {
        super(props);
        this.state = {
            chirpsA: [],
            username: '',
            userid: ''
        };
    }

    async componentDidMount() {
        try {
            let r = await fetch('/api/chirpr');
            let chirpsData = await r.json();

            // convert json object to array for state
            let chirpArray = Object.keys(chirpsData).map(function (k) { // k is id/key
                if (chirpsData[k].UserName != "undefined") {
                    let cObj = { key: chirpsData[k].ChirpID, name: chirpsData[k].UserName, text: chirpsData[k].ChirpText }
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
        if (localStorage.getItem('username')) { // show all chirps
            return (
                <div>
                    {this.state.chirpsA.map((chirp, index) => {                      
                        if (chirp.name) return (
                            <div key={'chirp-' + index} className="card m-4 shadow">
                                <div className="card-header"><h5 className="card-title bg-grey">{chirp.name}</h5></div>
                                <div className="card-body">
                                    <p className="card-text">{this.CheckMention(chirp.text, chirp.key)}</p>
                                </div>
                                <div className="card-footer">
                                    <button type="submit" className="btn btn-deep-purple" onClick={() => { this.SendToAdmin(chirp.key) }}>
                                        Admin
                                    </button>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            );
        } else { // show login box
            return (
                <div className="input-container bg-light p-2 m-0">
                    <div className="form-group m-4 rounded p-4 border shadow">
                        <h2 className="text-center p-2 rounded bg-deep-purple text-light">Please login to view chirper!</h2>
                        <label htmlFor="name">Username</label>
                        <input type="text" className="form-control" defaultValue=""
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { this.setState({ username: e.target.value }); }}></input>

                        <label htmlFor="pass">Password</label>
                        <input type="password" className="form-control" defaultValue=""></input>

                        <button className="btn btn-deep-purple mt-3 col-md-12 text-center" type="submit"
                            onClick={() => {
                                if (this.state.username) {
                                    localStorage.setItem('username', this.state.username);
                                    this.GetUserId();
                                }
                            }}>Login</button>
                    </div>
                </div>
            );
        }
    }

    CheckMention = (chirpT: string, chirpID: string) => {
        // check if post has a mention
        let aText = '';
        if (chirpT.includes("@")) {
            let cArr = chirpT.split(' ');
            let returnedText = (<></>);
            let username, preName, postName;
            for (let c of cArr) {
                if (c.includes("@")) { // found @ tag
                    username = c.substring(1);
                    let nameJSX = (
                        <button type="submit" className="btn btn-sm btn-light" onClick={() => { this.props.history.push('/mentions/' + chirpID) }}>
                            {c}
                        </button>
                    );
                    returnedText = <>{returnedText} {nameJSX}</>;
                } else {
                    returnedText = <>{returnedText} {c}</>;
                }             
            }
            return returnedText
        } else { // no mentions return normal text
            return chirpT;
        }
    }

    GetUserId = async () => {
        try {
            let r = await fetch('/api/chirpr/user/' + localStorage.getItem('username'));
            let userData = await r.json();
            if (userData[0]) {
                localStorage.setItem('id', userData[0].id); // user data returns array of ids. just need one
                window.location.reload();
            } else { // user doesn't exist so store new user into db 
                let r2 = await fetch('/api/chirpr/user/add/' + localStorage.getItem('username'));
                this.GetUserId(); // recursively call function to get id from new user
            }
        } catch (error) {
            console.log(error);
        }
    }

    SendToAdmin(id: string) {
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
    username: string;
    userid: string;
}

export default Home;