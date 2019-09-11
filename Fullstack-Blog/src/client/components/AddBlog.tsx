import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { runInThisContext } from 'vm';

export default class AddBlog extends React.Component<IAddProps, IAddState> {
    constructor(props: IAddProps) {
        super(props);
        this.state = {
            name: '',
            blogTitle: '',
            blogContent: '', 
            tags: []
        }
    }

    async componentDidMount() {
        try {
            let r = await fetch('/api/blog/alltags');
            let tagsD = await r.json();
            console.log(tagsD);
        } catch (error) {
            console.log(error);
        }
    }

    render() {  
        return (
            <div className="input-container bg-light p-2 m-0">
                <div className="form-group m-4 rounded p-4 border shadow">
                    <h2 className="text-center p-2 rounded bg-secondary text-light">Add Blog</h2>
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" placeholder='username...'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ name: e.target.value })}></input>
                    <hr></hr>
                    <label htmlFor="blog">Blog Title</label>
                    <input type="text" className="form-control" placeholder='title...'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ blogTitle: e.target.value })}></input>
                    <hr></hr>
                    <label htmlFor="blog">Blog Content</label>
                    <textarea className="form-control" placeholder="write your blog..." cols={100}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({ blogContent: e.target.value })}></textarea>

                    <button className="btn btn-secondary mt-3 col-md-12 text-center" type="submit"
                        onClick={this.SubmitBlog}>Submit Chirp</button>
                </div>
            </div>
        );
    }

    // send user data to store on the backend
    SubmitBlog = async () => {
        if (this.state.name && this.state.blogTitle) {
            // get author id based on name given
            let authorID = '';
            let r = await fetch('/api/author/' + this.state.name);
            let res = await r.json();
            if (res[0]) authorID = res[0]['id'];

            // if name does not exist create new author and grab id
            if (!authorID) {
                const settings = {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                };
                let r2 = await fetch('/api/author/new/' + this.state.name, settings);
                let res2 = await r2.json();
                authorID = res2.toString();
            }

            let link = '/api/blog/post/' + this.state.blogTitle + '/' + this.state.blogContent + '/' + authorID + '/1';
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
    blogContent: string,
    tags: Array<string>
}