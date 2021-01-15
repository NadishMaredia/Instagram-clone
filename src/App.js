
import './App.css';
import Post from './Post';
import React,{ useState, useEffect } from 'react';
import { db, auth } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';

// STYLES FOR MODAL
function getModalStyle() {
  const top = 50 ;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //log in
        console.log(authUser);
        setUser(authUser);
      } else {
        //logged out
        setUser(null);
      }
    });

    return () => {
      unsubcribe();
    };
  }, [user, username]);

  // USEEFFECT Runs a code based on some condition
  useEffect(() => {
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    });
  }, []);

  const signup = (event) => {
    event.preventDefault();

    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message));

    setOpen(false);
  };

  const signin = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch(error => alert(error.message));

    setOpenSignIn(false);
  };

  return (
    <div className="app">

      <Modal
        open={open}
        onClose={() => setOpen(false)}>
          <div style={modalStyle} className={classes.paper}>
            <form className="app__signup">
            <center>
              <img className="app__headerImage" 
                height="40px"
                alt="abc" 
                src="https://e7.pngegg.com/pngimages/712/1009/png-clipart-letter-instagram-font-instagram-text-logo.png" 
                />
            </center>
              <Input 
                placeholder="username"
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input 
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input 
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signup}>Sign Up</Button>
            </form>
          </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}>
          <div style={modalStyle} className={classes.paper}>
            <form className="app__signup">
            <center>
              <img className="app__headerImage" 
                height="40px"
                alt="abc" 
                src="https://e7.pngegg.com/pngimages/712/1009/png-clipart-letter-instagram-font-instagram-text-logo.png" 
                />
            </center>
              <Input 
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input 
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signin}>Sign In</Button>
            </form>
          </div>
      </Modal>
      {/* Header */}
      <div className="app__header">
      <img className="app__headerImage" 
        height="40px"
        alt="abc" 
        src="https://e7.pngegg.com/pngimages/712/1009/png-clipart-letter-instagram-font-instagram-text-logo.png"></img>
        {
        user ? (
          <Button onClick={() => auth.signOut()}>Log out</Button>
        ): (
          <div className="app_loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )}
      </div>      

      
      
      <h1>Hello World</h1>
      {/* Posts */}
      {
        posts.map(({id, post}) => (
          <Post
            key={id}
            username={post.username}
            caption={post.caption}
            imageUrl={post.imageUrl} />
        ))
      }
      
      

      {/* Upload Post */}
      {user ? (
        <ImageUpload username={user.email} />
      ) : (
        <h3>Sorry you need to login to upload</h3>
      )}
     
    </div>
  );
}

export default App;
