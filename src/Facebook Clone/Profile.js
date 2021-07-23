import React, { useEffect,useRef,useState, useReducer } from 'react';
import { Link, useParams } from 'react-router-dom';
import {login_data} from './login_data';
import {FcCompactCamera} from 'react-icons/fc';
import { FaPen  } from "react-icons/fa";
import { AiFillEye, AiFillCaretDown } from "react-icons/ai";
import {BsThreeDots} from 'react-icons/bs';
import { GrAddCircle,GrHome, GrGroup, GrNotification, GrWifi } from "react-icons/gr";
import {DisplayProfileNavbars} from './DisplayProfileNavbars'
import { FaFacebook, FaFacebookMessenger } from "react-icons/fa";
import { BsFlag } from "react-icons/bs";
import { MdOndemandVideo } from "react-icons/md";
import { BiStore , BiHomeSmile} from "react-icons/bi";
import {HiUserGroup} from 'react-icons/hi';
import {IoNotificationsCircle} from 'react-icons/io5';
import { reducer } from "./reducer";
import {GoDiffAdded} from 'react-icons/go';
import PostContent1 from './PostContent1';
import PostContent2 from './PostContent2';
import PropTypes from 'prop-types';
import defaultProfile from '../img/unknownboy.jpg';
import PostModal from './PostModal';

const defaultState = {
    login_dataS: login_data,
    isModalOpen: false,
    modalContent: '',
    isAddAccount: false,
    activeAccount: [],
    isCreateAccount: false,
    isActive: false,
    postModal: false
}
const Profile = () => {
    const [state, dispatch] = useReducer(reducer, defaultState);
    return (
            <div className="profile-container">
                <DisplayProfile/>
                
            </div>
    )
}

const Header = (props) => {
    return (
        <div className="nav-header">
        <div className="nav-links-0">
            <FaFacebook/>
            <input type="text" placeholder="Search Facebook"/>
        </div>
        <div className="nav-links-1">
            <BiHomeSmile/>
            <BsFlag/>
            <MdOndemandVideo/>
            <BiStore/>
            <HiUserGroup/>
        </div>
        <div className="nav-links-2">
            <div className="group">
                <img className="mini-pic" src={props.pic} alt=""/>
                <h6>{props.name}</h6>
            </div>
            
            <GoDiffAdded/>
            <FaFacebookMessenger/>
            <IoNotificationsCircle/>
            <AiFillCaretDown/>
        </div>

    </div>
    )
}
const DisplayProfileNavs = () => {
    const {id} = useParams();
    const refCont = useRef(null);
    
    useEffect(() => {
        console.log(refCont.current);
    })
    
    return (
        <>
        
        <nav className="DisplayProfileNav">
            <ul className="DisplayProfileLinks" ref={refCont} >
                {DisplayProfileNavbars.map((val,key) => {
                    
                    return (
                        <li key={key} >
                            <a  id={window.location.pathname == `/user/${parseInt(id) + val.link}` ? "active" : ""} onClick={() => {window.location.pathname = `/user/${parseInt(id) + val.link}`}}>{val.title}</a>
                        </li>
                    )
                })}
            </ul>
            <ul className="DisplayProfileActions">
                <li><a href="#"><GrAddCircle/>Add to Story</a></li>
                <li><a href="#"><FaPen/></a></li>
                <li><a href="#"><AiFillEye/></a></li>
                <li><a href="#"><BsThreeDots/></a></li>
            </ul>
        </nav>
        
        </>
    )
}
const DisplayProfile = () => {
    const {id} = useParams();
    const [state, dispatch] = useReducer(reducer, defaultState);
    useEffect(() => {

        dispatch({type: "FIND_DATA", payload: parseInt(id)});
        // const prof = login_data.find((data) => 
        // data.id === parseInt(id))
        
    },[])
    const {profile,username,lastname, lived, pic, job} = state.login_dataS;
    return (
        <>
        
        <Header pic={profile || defaultProfile} name={username}/>
        <div className="super-header">
            <div className="profile-timeline-container">
                <div className="profile-timeline">
                    <div className="profile-picture">
                        <img src={profile} alt=""/>
                        <div className="profile-name">
                            <h2>{username + " " + lastname}</h2>
                            <a href="#">Add Bio</a>
                        </div>
                    </div>
                    <button className="select-profile-cover-photo-btn"><FcCompactCamera className="icon"></FcCompactCamera> Add Cover Photo </button>
                </div>
            </div>
        </div>
        <DisplayProfileNavs/>
        <div className="Posts">
            <div className="posts-content1">
                <PostContent1 lived={lived} pic={pic} job={job}/>
            </div>
            <div className="posts-content2">
                
                <PostContent2 id={id} profile={profile} name={username} lastname={lastname}/>
            </div>
        </div>
        
        </>
    )
}

export default Profile
