import React, {useState,useRef, useEffect} from 'react';

import add from './img/add.png';
import { login_data } from './login_data';
import { Link } from 'react-router-dom';
import { AuthorizedUserData} from './contexts/UserContext';
import {useFetch} from './custom-hooks/useFetch';
import axios from 'axios';

const Login = () => {

    const {authorizedData,dispatch} = AuthorizedUserData();
    const [loginData, setLoginData] = useState(login_data);
    const {data: current_user_logged, loading} = useFetch('http://localhost:8000/users');
    useEffect(() => {
        window.alert("THIS PROJECT IS STILL ON WORK SOME FUNCTIONS ARE NOT AVAILABLE. \nFOR CHECKING, USE EXISTING ACCOUNTS AND USE USERS LASTNAME AS PASSWORD EX: zuckerberg (lowercase)");
    },[])
    const [passwords, setPassword] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const [showLabel, setShowLabel] = useState(false);
    
    const closeModal = () => {
        dispatch({type: 'CLOSE_MODAL'})
        setPassword('');
    }
    const loginProfile = (id) => {
        dispatch({type: "LOGIN_PROFILE", payload: id})
    }
    const removeProfile = (id) =>{
        const newProfiles = loginData.filter((data) => 
            data.id !== id
        )
        setLoginData(newProfiles);
    }
    const createAccount = () => {
        dispatch({type: 'CREATE_ACCOUNT'})
    }
    const addAccount = () => {
        dispatch({type: 'ADD_ACCOUNT'});
    }
    
    const [signup, setSignUp] = useState({
        fullName: '',
        userName: '',
        email: '',
        password: ''
    })
    // const {signup} = useAuth()
    const login_btn = useRef(null);
    const emailRef = useRef()
    const passRef = useRef()
    const confirmpassRef = useRef()
    const handleChangePass = (e) => {
        const pass = e.target.value;
        const correctpass = e.target.name;
        setPassword(pass);
        if(pass == correctpass)
        {
            console.log('correct');
            setIsCorrect(true);
        }
        else{
            console.log('wrong');
            setIsCorrect(false);
            
        }
        
    }
    const action = () =>{
        setShowLabel(!showLabel);
        setPassword('');
    }
    const handleChangeSignUp = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setSignUp({...signup, [name]:value})
    }
    const handleSubmitSignUp = (e) =>{
        e.preventDefault();

        const registered = {
            fullName: signup.fullName,
            userName: signup.userName,
            email: signup.email,
            password: signup.password
        }
        console.log(registered.fullName);
        axios.post('http://localhost:4000/app/signup', registered).then((response) => console.log(response.data)).catch(err => console.log("error " , err))
        setSignUp({fullName: '', userName: '', email: '', password: ''});
        dispatch({type: 'CLOSE_MODAL'})
    }
    return (
        <React.Fragment >
        
        <div  className="container">
        {authorizedData.isModalOpen && 
            <div className="modal-container">
            <form className="modal" onSubmit={handleSubmitSignUp}>
                    {/* {console.log("create " + isCreateAccount)}
                    {console.log("add " + isAddAccount)} */}
                    <button className="close-modal" onClick={() => closeModal()}>&times;</button>
                    {
                        authorizedData.isActive && authorizedData.activeAccount.map((data) => {
                            const {id,profile, username, lastname, password,email} = data;
                            return (
                                <React.Fragment key={id}>
                                    <div  className="modal-login">
                                        <img src={profile} className="profile"/>
                                        <p>{username + " " +lastname}</p>
                                        <input type="password" placeholder="Password" name={password}
                                        value={passwords} ref={login_btn}  onChange={handleChangePass}/>
                                        {showLabel && <p style={{marginRight:'auto', color: 'red'}}>Wrong password try again!</p> }
                                            {isCorrect ? <Link to={`/${email.substring(0, email.lastIndexOf("@"))}/`} className="login-btn" onClick={() => dispatch({type: "SET_AUTH", AUTH_ACCOUNT: authorizedData.activeAccount })} >Login</Link>
                                            :<Link to="/" onClick={action}  className="login-btn">Login</Link>
                                        }
                                    </div>
                                    </React.Fragment>
                            )
                        })
                    }
                    {authorizedData.isAddAccount && <div>
                        <h3 className="login-text">Login to facebook</h3>
                        <input type="email"/>
                        <input type="password" />
                        <button type="submit"><Link to="/user/">Login</Link></button>
                        <p>Forgot Password</p>
                    </div>}
                    {authorizedData.isCreateAccount && <div className="createAccount" >
                        <h2>Sign Up</h2>
                        <p>It's quick and easy</p>
                        <hr/>
                        <input name="fullName" id="fullName" type="text" placeholder="Fullname" value={signup.firstName} onChange={handleChangeSignUp} />
                        <input name="userName" id="userName" type="text" placeholder="Username" value={signup.userName} onChange={handleChangeSignUp}  />
                        <input name="email" id="email" type="email" placeholder="Email" ref={emailRef} value={signup.email} onChange={handleChangeSignUp}/>
                        <input name="password" id="signup_password" type="password" placeholder="Password" ref={passRef} value={signup.password} onChange={handleChangeSignUp} />
                        <input  type="submit" value="Sign Up"/>
                    </div>
                    } 
                    
                        
                    
                    </form>    
                </div>
            
    
        }
         
            <ProfilePreview loginProfile={loginProfile} dataProfile={loginData} removeProfile={removeProfile} addAccount={addAccount} createAccount={createAccount}/>
        </div>
        </React.Fragment>
    )
    
}
const ProfilePreview = (props) => {
    const [login, setLogin] = useState({username: '', password: ''});
    
    const handleChange = (e) => {
        const user = e.target.name;
        const pass = e.target.value;
        setLogin({...login, [user]: pass});
    }
    return (
        <>
            
            <div className="Login">
           
                <div className="logins">
                <h1 className="brand-title">fᾶcebook</h1>
                    <h3>Recent Logins</h3>
                    <p>Click your picture o add an account.</p>
                    <div className="profile-preview">
                        {props.dataProfile.map((data) => {
                            const {id} = data;
                            
                            return(
                                <div className="profile-preview-container" key={id} >
                                    <Profile   {...data } removeProfile={props.removeProfile} loginProfile={props.loginProfile} /> 

                                </div>
                            )
                            
                        })} 
                        <div className="addAccount" onClick={() => props.addAccount()}>
                            <img src={add} alt=""/>
                            <p>Add account</p>
                        </div>
                    </div>
                </div>
                <div className="login-container">
                    <form className="loginForm" >
                        <input type="text" name="username" id="username" value={login.username} onChange={handleChange} placeholder="Email or Phone Number"/>
                        <input type="password" name="password" id="password" value={login.password} onChange={handleChange} placeholder="Password"/>
                        <button type="submit"><Link to="/user/:id">Login</Link></button>
                        
                        <a href="#">Forgot Password</a>
                        <hr/>
                        <input type="button" name="" id="" value="Create New Account" onClick={() => props.createAccount()}/>
                    </form>
                </div>
            </div>
            
        </>
    )
}
const Profile = ({profile, id, username, removeProfile, loginProfile, profilePic}) =>  {
    

    
    return (
        <>
        
        
            <button className="close-btn" onClick={() => removeProfile(id)}>&times;</button>
            {/* when clicked the unique id will be sent to reducer and filter the data*/}
            <img src={profile} className="current_logged_profile_img" alt="" onClick={() =>  loginProfile(id)}/>
            <p>{username}</p>
        
    </>
    )
}

export default Login
