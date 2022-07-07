import React from 'react';
import axios from 'axios';

import './App.css';

class App extends React.Component {

  state = {
    title: '',
    author: '',
    content: '',
    posts: []
  };

  componentDidMount = () => {
    this.getBlogPost();
  };


  // gets data from server! :)
  getBlogPost = () => {
    axios.get('/api')
      .then((response) => {
        const data = response.data;
        this.setState({ posts: data });
        console.log('Data has been received!!');
      })
      .catch(() => {
        alert('COULD NOT GET YOUR DATA :( !!!');
      });
  }

  // handles user typing changes
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };



  // function after user presses submit
  submit = (event) => {
    event.preventDefault();

    const payload = {
      title: this.state.title,
      author: this.state.author,
      content: this.state.content
    };

    // makes HTTP calls
    axios({
      url: '/api/save',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('YAYYY DATA HAS BEEN SENT TO THE SERVER');
        this.resetUserInputs();
        this.getBlogPost();
      })
      .catch(() => {
        console.log('Beep Boop Beep something is not right...');
      });;
  };

  // resets form input 
  resetUserInputs = () => {
    this.setState({
      title: '',
      author: '',
      content: ''
    });
  };

  //displays posts function
  displayBlogPost = (posts) => {
    if (!posts.length) return null;

    return posts.map((post, index) => (
      <div key={index} className="blogsOnServer">
        <h3>{post.title}</h3>
        <p> Written by: {post.author}</p>
        <p>{post.content}</p>

      </div>
    ));
  };

  // JSX Content
  render() {
    console.log('State: ', this.state);
    return(
      <div className="main">
        <h2>Gio's MERN STACK Blog</h2>
        <form onSubmit={this.submit}>
          <div className="inputfromform">
            <input  
              type="text"
              name="title"
              placeholder="Title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <div className="inputfromform">
            <input 
              type="text"
              name="author"
              placeholder="Author"
              value={this.state.author}
              onChange={this.handleChange}
            />
          </div>
          <div className="inputfromform">
            <textarea
              placeholder="Content"
              name="content"
              cols="30"
              rows="10"
              value={this.state.content}
              onChange={this.handleChange}
            >
            </textarea>
          </div>
          <button>Submit</button>
        </form>

        <div className="blog-">
          {this.displayBlogPost(this.state.posts)}
        </div>
      </div>
    );
  }
}


export default App;