
import './App.css';
import Post from './Post';
import React,{ useState, useEffect } from 'react';
import { db } from './firebase';

function App() {
  const [posts, setPosts] = useState([
    // {
    //   username:"Nadish",
    //   caption:"Wow Nice pic",
    //   imageUrl:"https://e7.pngegg.com/pngimages/712/1009/png-clipart-letter-instagram-font-instagram-text-logo.png"
    // },
    // {
    //   username:"Nizar",
    //   caption:"Hey lets do it",
    //   imageUrl:"https://e7.pngegg.com/pngimages/712/1009/png-clipart-letter-instagram-font-instagram-text-logo.png"
    // }
  ]);

  // USEEFFECT Runs a code based on some condition
  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    });
  }, []);

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
        posts.map(({id, post}) => (
          <Post
            key={id}
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
