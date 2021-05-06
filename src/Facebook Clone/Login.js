import React, {useState, useReducer} from 'react';
import {login_data} from './login_data';
import add from '../img/add.png';
import {reducer} from './reducer';
import Modal from './Modal'
import { Link } from 'react-router-dom';
const defaultState = {
    login_dataS: login_data,
    isModalOpen: false,
    modalContent: '',
    isAddAccount: false,
    activeAccount: [],
    isCreateAccount: false,
    isActive: false
}
const Login = () => {


    
    const [state, dispatch] = useReducer(reducer, defaultState);
    const [login, setLogin] = useState({username: '', password: ''});
    // const [valid, setValid] = useState(false);
    const closeModal = () => {
        dispatch({type: 'CLOSE_MODAL'})
    }
    // const handleSubmit = (e) => {
    //     e.preventDedault();
    //     if(login.username && login.password)
    //     {
    //         return (
    //             state.login_dataS.map((data) => {
    //                 const {username} = data;
    //                 if(username == login.username){
    //                     setValid(true);
    //                 }
    //             })
    //         )
    //     }
        
    // }
    const handleChange = (e) => {
        const user = e.target.name;
        const pass = e.target.value;
        setLogin({...login, [user]: pass});
    }
    
    return (
        <>
        
        <div  className="container">
        {state.isModalOpen && <Modal isActive={state.isActive} closeModal={closeModal} isAddAccount={state.isAddAccount} activeAccount={state.activeAccount} isCreateAccount={state.isCreateAccount}></Modal>}
        <h1 className="brand-title">fᾶcebook</h1>
            <div className="Login">
                <div className="logins">
                    
                    <h3>Recent Logins</h3>
                    <p>Click your picture o add an account.</p>
                    <div className="profile-preview">
                        {state.login_dataS.map((data) => {
                            const {id,profile, username} = data;
                            return(
                                <div className="profile-preview-container" key={id} >
                                    <button className="close-btn" onClick={() => dispatch({type: 'REMOVE_PROFILE', payload: id})}>&times;</button>
                                    <img src={profile} alt="" onClick={() =>  dispatch({type: "LOGIN_PROFILE", payload: id})}/>
                                    <p>{username}</p>
                                </div>
                            )
                            
                        })}
                        <div className="addAccount" onClick={() => dispatch({type: 'ADD_ACCOUNT'})}>
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
                        <input type="button" name="" id="" value="Create New Account" onClick={() => dispatch({type: 'CREATE_ACCOUNT'})}/>

                    </form>
                </div>
            </div>
            
        
        </div>
        </>
    )
    
}

export default Login
