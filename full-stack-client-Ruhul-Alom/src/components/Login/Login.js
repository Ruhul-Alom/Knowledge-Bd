import React, { useContext } from 'react';
import './Login.css';
import facebook from '../../image/facebook.png';
import google from '../../image/google .png';
import { Link, useHistory, useLocation } from 'react-router-dom';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../Login/firebase.config';
import { UserContext } from '../../App';



const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };


    // Google authentication
    const provider = new firebase.auth.GoogleAuthProvider();
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

    // User login by google authentication
    const handleGoogleLogIn = () => {
        firebase.auth().signInWithPopup(provider)
            .then(res => {
                const { displayName, email, photoURL } = res.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setLoggedInUser(signedInUser);
                history.replace(from);
                // console.log(displayName, email, photoURL);
            }).catch(e => {
                console.log(e.message);
            });
    }


   var Fbprovider = new firebase.auth.FacebookAuthProvider();

    const handleFacebookLogIn = () => {
        firebase
         .auth()
         .signInWithPopup(Fbprovider)
  
            .then((res) => {
                const { displayName, email, photoURL } = res.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
            
                setLoggedInUser(signedInUser);
                history.replace(from);
                console.log(displayName, email, photoURL);
                // ...
            }).catch((e) => {
                console.log(e.message);
            });

    }
    

    const handleSubmitForm = () => {
        var e = document.getElementById('email').value;
  var p = document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(e, p)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    alert(user)
   
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage)
  });
  }
    return (
        <div className="login-container">
            <div className="form-container">
                <h3 className="text-dark">Login</h3>
               <form >
                    <input type="email" name="email" placeholder="Email" id="email" required />
                    <input type="password" name="password" placeholder="Password"id="password" required />
                    <div className="select-command mb-3 mt-3">
                        <p><input type="checkbox" /> Remember Me</p>
                        <p className="forgot-password">Forgot Password</p>
                    </div>
                    <button type="button"  onClick={handleSubmitForm} className="btn btn-success mt-2">Login</button>
                    {/* <input type="submit" className="btn btn-success mt-2" value="Login" /> */}
                </form>
                {/* <p className="text-danger">{user.error}</p> */}
                <p className="text-center mt-2">Don't have an account? <Link to="/signup">Create an account</Link></p>
                <h6 className="text-center">------ Or ------</h6>
                <button className="mt-3 p-1" onClick={handleGoogleLogIn}>
                    <img src={google} alt="" width="35" height="35" /> Continue with Google
                </button>
                <button className="mt-3 mb-2 p-1" onClick={handleFacebookLogIn}>
                    <img src={facebook} alt="" width="40" height="40" /> Continue with Facebook
                </button>
                
            </div>
        </div>

    );
};

export default Login;