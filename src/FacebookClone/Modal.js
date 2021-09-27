import React , {useRef, useState, useContext}from 'react';
import {Link} from 'react-router-dom';
import PostContent2 from './PostContent2';
// import  {useAuth } from  '../Facebook Clone/contexts/AuthContext'

const Modal = ({closeModal, isAddAccount, activeAccount,isCreateAccount, isActive}) => {
    
   
    
    const [passwords, setPassword] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const [showLabel, setShowLabel] = useState(false);
    // const {signup} = useAuth()
    const login_btn = useRef(null);
    const emailRef = useRef()
    const passRef = useRef()
    const confirmpassRef = useRef()
    const handleChange = (e) => {
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
    // const handleSubmit = (e) => {
    //     e.preventDefault()

    //     signup(emailRef.current.value, passRef.current.value)
    // }
    return (    
        <React.Fragment>
        <div className="modal-container">
            
        </div>
        <form className="modal">
                {console.log("create " + isCreateAccount)}
                {console.log("add " + isAddAccount)}
                <button className="close-modal" onClick={() => closeModal()}>&times;</button>
                {
                    isActive && activeAccount.map((data) => {
                        const {id,profile, username, lastname, password} = data;
                        return (
                            
                                <div key={id} className="modal-login">
                                <img src={profile} className="profile"/>
                                <p>{username + " " +lastname}</p>
                                <input type="password" name={password} value={passwords} ref={login_btn}  onChange={handleChange}/>
                                {showLabel && <p style={{marginRight:'auto', color: 'red'}}>Wrong password try again!</p> }
                                {isCorrect ? <Link to={`/user/${id}/posts`}  className="login-btn">Login</Link>  :
                                    
                                    <Link  onClick={action}  className="login-btn">Login</Link>
                                    }
                                </div>
                            
                        )
                    })
                }
                {isAddAccount && <div>
                    <h3 className="login-text">Login to facebook</h3>
                    <input type="email"/>
                    <input type="password" />
                    <button type="submit"><Link to="/user/">Login</Link></button>
                    <p>Forgot Password</p>
                </div>}
                {isCreateAccount && <div className="createAccount">
                    <h2>Sign Up</h2>
                    <p>It's quick and easy</p>
                    <hr/>
                    <input type="email" ref={emailRef}/>
                    <input type="password" ref={passRef}/>
                    <input type="password" ref={confirmpassRef} />
                </div>
                } 
                
                    
                
        </form>
    </React.Fragment>
    )
}

export default Modal