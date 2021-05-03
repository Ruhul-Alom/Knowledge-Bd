import React, { useContext, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import './Signup.css';
import facebook from '../../image/facebook.png';
import google from '../../image/google .png';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../Login/firebase.config';
import { UserContext } from '../../App';


const Signup = () => {

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

    const [user,setUser] =useState({
        isSignIn:false,
        name:'',
        email:'',
        photo:''
      })
    const handaleChange=(e)=>{
     
        let isFormValid =true;
        if(e.target.name==='email'){
           isFormValid= /\S+@\S+\.\S+/.test(e.target.value);
        
        }
        if(e.target.name==='password'){
         const isPasswordValid=e.target.value.length>6; 
        //  console.log(isPasswordValid);
         const passwordHasNumber=/\d{1}/.test(e.target.value);
         isFormValid=isPasswordValid &&  passwordHasNumber;
        }
        if(isFormValid){
          const newUserInfo={...user}
          newUserInfo[e.target.name]=e.target.value;
          setUser(newUserInfo)
        }
             }
             const handaleSubmit=(e)=>{
              if(user.email && user.password){
                firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res=>{
                  const newUserInfo={...user}
                  newUserInfo.error='';
                  newUserInfo.success=true;
                  setUser(newUserInfo);
                  alert("registraion succesfully done")
                })
          .catch((error) => {
            const newUserInfo={...user}
            newUserInfo.error=error.message;
            newUserInfo.success=false;
            setUser(newUserInfo);
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode ,errorMessage)
            // ..
          });
        
              }
              e.preventDefault();
            }


    
    return (
        <div className="signup-container">
            <div className="form-container">
                <h3 className="text-dark">Create an account</h3>
                <form onSubmit={handaleSubmit}>
                    <input type="text" name="name" placeholder="Name" required/>
                    <input type="email" name="email"  onBlur={handaleChange} placeholder="Username or Email" required/>
                    <input type="password" name="password"   onBlur={handaleChange} placeholder="Password" required/>
                    <input type="password" name="confirmPassword" placeholder="Confirm password" required/>
                    <input type="submit" className="btn btn-success mt-3" value="Signup"/>
                </form>
                <p className="text-center mt-2">Already have an account? <Link to="/login">Login</Link></p>
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

export default Signup;