import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

export default class AddBlog extends React.Component<IAddProps, IAddState> {
    constructor(props: IAddProps) {
        super(props);
        this.state = {
            name: '',
            blogTitle: '',
            blogContent: ''
        }
    }

    render() {  
        return (
            <div className="input-container bg-light p-2 m-0">
                <div className="form-group m-4 rounded p-4 border shadow">
                    <h2 className="text-center p-2 rounded bg-secondary text-light">Add Blog</h2>
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ name: e.target.value })}></input>
                    <hr></hr>
                    <label htmlFor="blog">Blog Title</label>
                    <input type="text" className="form-control" defaultValue=""
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ blogTitle: e.target.value })}></input>
                    <hr></hr>
                    <label htmlFor="blog">Blog Content</label>
                    <input type="text" className="form-control" defaultValue=""
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ blogContent: e.target.value })}></input>

                    <button className="btn btn-secondary mt-3 col-md-12 text-center" type="submit"
                        onClick={this.SubmitBlog}>Submit Chirp</button>
                </div>
            </div>
        );
    }

    // send user data to store on the backend
    SubmitBlog = () => {
        if (this.state.name && this.state.blogTitle) {
            let link = 'http://localhost:3000/api/blog/post/' + this.state.blogTitle + '/' + this.state.blogContent + '/1/1';
            return fetch(link, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                credentials: 'same-origin',
            }).then(response => {    
                this.props.history.push('/');       
            });                     
        } else {
            alert('Please enter a name and blog info.');
        }
    }
}

export interface IAddProps extends RouteComponentProps { }

export interface IAddState {
    name: string,
    blogTitle: string,
    blogContent: string
}