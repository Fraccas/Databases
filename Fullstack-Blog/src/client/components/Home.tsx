import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

class Home extends React.Component<IAppProps, IAppState> {

    constructor(props: IAppProps) {
        super(props);
        this.state = {
            blogA: [],
            username: '',
            userid: ''
        };
    }

    async componentDidMount() {
        try {
            let r = await fetch('/api/blogs');
            let blogData = await r.json();
            console.log(blogData);

            // set blogdata to state for render
            this.setState({blogA: blogData});
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return ( //render boxes with blog data
            <div className='container d-flex flex-wrap'>  
                <div className='row w-100 justify-content-center'>
                    {this.state.blogA.map((blog, index) => {                      
                        if (blog.title) return (
                            <div key={'blog-' + index} className="card shadow m-4 p-0 col-md-3">
                                <div className="card-header"><h5 className="card-title bg-grey">Blog</h5></div>
                                <div className="card-body">
                                    <h5 className="card-text">{blog.title}</h5>
                                    <p className="card-text">{blog.authorid}</p>
                                    <p className="card-text">{blog._created}</p>
                                    <button type="submit" className="btn btn-secondary" onClick={() => { }}>
                                        View Blog
                                    </button>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        );
    }
}

interface BlogPreview {
    id: string,
    title: string,
    authorid: string,
    _created: string
}

export interface IAppProps extends RouteComponentProps {

}

export interface IAppState {
    blogA: Array<BlogPreview>;
    username: string;
    userid: string;
}

export default Home;