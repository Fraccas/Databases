import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';

class ViewBlog extends Component<IViewProps, IViewState> {

    constructor(props: IViewProps) {
        super(props);
        this.state = {
            blog: {id: '', title: '', content: '', authorid: '', _created: ''},
            id: this.props.match.params.id,
            author: this.props.match.params.author,
            tag: 'empty'
        }
    }

    async componentDidMount() {
        try {
            let url = '/api/blog/' + this.state.id;
            let r = await fetch(url);
            let blogData = await r.json();
        
            this.setState({
                blog: blogData[0],
            });

            let r2 = await fetch('/api/blog/tags/' + this.state.id);
            let res = await r2.json();
            this.setState({tag: res[0][0]['name']});

        } catch (error) {
            console.log(error);
        }
    }

    // render the admin panel
    render() {
        if (this.state.blog) {
            return (
                <div className="input-container bg-light m-5 rounded p-4 border shadow">
                    <h2 className="text-center p-2 rounded bg-secondary text-light">Blog</h2>
                    <div className="form-group">
                        <h2>{this.state.blog.title}</h2>
                        <span className="badge badge-warning">{this.state.tag}</span>

                        <hr></hr>
                        <p>{this.state.blog.content}</p>
                        <hr></hr>

                        <h5>{this.state.author}</h5>
                        <h5>{this.state.blog._created.slice(0, 10)}</h5>

                        <button className="btn btn-warning ml-2 mt-3" type="submit"
                            onClick={() => {this.props.history.push('/blog/update/' + this.state.id)}}>  Edit Blog  </button>
                        
                        <button className="btn btn-secondary ml-2 mt-3" type="submit"
                        onClick={() => {this.props.history.push('/')}}>  Back  </button>
                        
                    </div>
                </div>
            );
        } else {
            return (<h1>No chirps returned. Invalid ID.</h1>)
        }
    }
}

interface IViewProps extends RouteComponentProps< {id: string, author: string} > {

}

interface Blog {
    id: string, 
    title: string,
    content: string,
    authorid: string,
    _created: string
}

interface IViewState {
    blog: Blog,
    id: string,
    author: string,
    tag: string
}

export default ViewBlog;