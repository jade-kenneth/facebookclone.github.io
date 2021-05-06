import React, {useState} from 'react';
import { FcHome, FcBriefcase } from "react-icons/fc";
import { photos } from "./Photosdata";
import { friend_data } from "./Frienddata";
import {  GrWifi } from "react-icons/gr";
const PostContent1 = ({lived, pic, job}) => {
    const LifeEvents = () => {
    
        return (
            <>
            <div className="life-events">
                <div>
                    <h2>Life Events</h2>
                </div>
                
                <div className="row">
                    <div className="lived">
                        
                        <img src={pic} alt=""/>
                        <div className="place">
                            <FcHome/>
                            <p>{lived} March 2, 1997</p>
                        </div>
                    </div>
                    <div className="job">
                            <FcBriefcase/>
                        <h5>Started Job At {job}</h5>
                    </div>
                </div>
            </div>
            <nav>
                <ul className="nav-policy">
                    <li><a href="">Privacy</a></li>
                    <li><a href="">Terms</a></li>
                    <li><a href="">Advertising</a></li>
                    <li><a href="">Ad Choices</a></li>
                    <li><a href="">Cookies</a></li>
                    <li><a href="">Facebook © 2021</a></li>
                </ul>
            </nav>
            </>
        )
    }
    const Friends = () => {
        return (
            <div className="friends">
                <div className="friend-nav">
                    <div className="row">
                        <h2>Friends</h2>
                        <a href="#">See All Friends</a>
                    </div>
                    <p>4,070 friends</p>
                </div>
                <div className="friend-lists">
                    {friend_data.map((data) => {
                        const {id, profile, fullname} = data;
                        return (
                            <div key={id} className="friend-list-container">
                                <img src={profile} className="friend-photo" alt=""/>
                                <p className="fullname">{fullname}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
    const Photos = () => {
        const [photoses, setPhotos] = useState(photos);
        return (
            <div className="photos">
            <div className="photo-nav">
                <h2>Photos</h2>
                <a href="#">See all photos</a>
            </div>
            <div className="photo-list" >
            {  photoses.map((data) => {
                const {id, photo} = data;
                return (
                    <img src={photo} key={id} alt="sahhsa"/>
                )
            })}
            </div> 
        </div>
        )
    }
    const PostContent = () =>{
        return (
            <div className="post-container-left">
                <div className="intro">
                    <h2>Intro</h2>
                    <h3><GrWifi className="rotate"/>Followed by 1,030,210 people</h3>
                    <button>Edit Details</button>
                    <button>Add Hobbies</button>
                    <button>Add Featured</button>
                </div>
                <Photos/>
                <Friends/>
                <LifeEvents />
            </div>
        )
    }
    
    return (
        <div className="post-container">
            <PostContent/>
        
        </div>
    )
}

export default PostContent1
