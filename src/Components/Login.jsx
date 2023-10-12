import { useState } from "react"
import {auth, googleProvider} from "../firebase.js"
import {createUserWithEmailAndPassword,signInWithPopup,signInWithEmailAndPassword,signOut} from "firebase/auth"
function Login() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const change = (e)=>{
        const {name,value} = e.target;
        if (name==="email"){
            setEmail(value);
        }else{
            setPassword(value);
        }
    }
    const signIn = async ()=>{
        await signInWithEmailAndPassword(auth,email,password).then((res)=>{console.log(res)}).catch((err)=>{
            if  (err.code == "auth/invalid-login-credentials"){
                console.log("Invalid Credentials");
            }
        })
    };
    const signUp = async ()=>{
        await createUserWithEmailAndPassword(auth,email,password).then((res)=>{console.log(res)}).catch((err)=>{
            console.log(err.code);
        })
    }
    const google = async ()=>{
        await signInWithPopup(auth,googleProvider).then((res)=>{console.log(res)}).catch((err)=>{
            console.log(err);
        })
    }
    const logout = async ()=>{
        await signOut(auth).then((res)=>{console.log(res)}).catch((err)=>{console.log(err)});
    }
  return (
    <div>
        <input placeholder="Email" name="email" type="email" value={email} onChange={change}></input>
        <input placeholder="Password" name="password" type="password" value={password} onChange={change}></input>
        <button onClick={signIn}>Sign In</button>
        <button onClick={signUp}>Sign Up</button>
        <button onClick={logout}>Logout</button>
        <button onClick={google}>Sign in with google</button>
    </div>
  )
}
export default Login