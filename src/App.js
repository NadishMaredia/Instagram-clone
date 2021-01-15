
import './App.css';
import Post from './Post';
import React,{ useState } from 'react';

function App() {
  const [posts] = useState([
    {
      username:"Nadish",
      caption:"Wow Nice pic",
      imageUrl:"https://e7.pngegg.com/pngimages/712/1009/png-clipart-letter-instagram-font-instagram-text-logo.png"
    },
    {
      username:"Nizar",
      caption:"Hey lets do it",
      imageUrl:"https://e7.pngegg.com/pngimages/712/1009/png-clipart-letter-instagram-font-instagram-text-logo.png"
    }
  ]);
  return (
    <div className="app">
      {/* Header */}
      <div className="app__header">
      <img className="app__headerImage" 
        height="40px"
        alt="abc" 
        src="https://e7.pngegg.com/pngimages/712/1009/png-clipart-letter-instagram-font-instagram-text-logo.png"></img>
      </div>      

      <h1>Hello World</h1>
      {
        posts.map(post => (
          <Post
            username={post.username}
            caption={post.caption}
            imageUrl={post.imageUrl} />
        ))
      }
      {/* Posts */}
      
     
    </div>
  );
}

export default App;
