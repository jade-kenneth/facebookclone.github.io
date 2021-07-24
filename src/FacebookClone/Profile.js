import React, { useEffect,useRef,useState, useReducer } from 'react';
import {login_data} from './login_data';
import {FcCompactCamera} from 'react-icons/fc';
import { FaPen  } from "react-icons/fa";
import { AiFillEye, AiFillCaretDown, AiOutlineSearch } from "react-icons/ai";
import {BsThreeDots, BsFillHouseFill,BsHeart} from 'react-icons/bs';
import { GrAddCircle,GrHome, GrGroup, GrNotification, GrWifi } from "react-icons/gr";
import {GiHamburgerMenu} from "react-icons/gi";
import {DisplayProfileNavbars} from './DisplayProfileNavbars'
import { FaFacebook, FaFacebookMessenger, FaBriefcase } from "react-icons/fa";
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
import {RiFeedbackLine} from 'react-icons/ri'
import {ImExit} from 'react-icons/im';
import { Redirect, useHistory, matchPath, useLocation } from 'react-router-dom';
import {FriendsTabNavbars} from './FriendsTabNavbars';
import { friend_data } from "./Frienddata";
import {photos} from './Photosdata';
import {IoSchoolOutline} from 'react-icons/io5'
import {AuthorizedUserData, AuthorizedUserPosts} from './contexts/UserContext'
import SkeletonPhotos from './Skeletons/SkeletonPhotos';


const defaultState = {
    currentLoggedData: login_data,
    isModalOpen: false,
    modalContent: '',
    isAddAccount: false,
    activeAccount: [],
    isCreateAccount: false,
    isActive: false,
    postModal: false,
    isLogged: false
}
const Profile = React.memo(() => {
    
    

    const {authorizedData} = AuthorizedUserData();
    
    return (
            <div className="profile-container">
                
                {authorizedData.isLogged ?  <DisplayProfile authorizedData={authorizedData.activeAccount}/>  : <Redirect to="/facebook.com"/> }
                
                
                
            
            </div>
    )
})

const Header = React.memo((props) => {
    
    const [dropdown,setShowDropdown] = useState(false);
    let history = useHistory();
    const {authorizedData, dispatch} = AuthorizedUserData();
    const pushAndClear = async() => {
        const clear = await dispatch({type: "LOGGED_OUT"});
        const clearStorage = await history.push('/facebook.com');
    }
    
    
    return (
        
        <React.Fragment>
            
        <div className="nav-header">
            <div className="center">

            
                <div className="nav-links-0">
                    <FaFacebook className="facebook-logo"/>
                    <input type="text" placeholder="Search Facebook"/>
                    
                </div>
                <div className="nav-links-1">
                    
                    <BiHomeSmile className="fixed-size square-hover"/>
                    <BsFlag className="fixed-size square-hover"/>
                    <MdOndemandVideo className="fixed-size square-hover"/>
                    <BiStore className="fixed-size square-hover"/>
                    <HiUserGroup className="fixed-size square-hover"/>
                    <GiHamburgerMenu className="fixed-size show-hidden-burger square-hover" />
                    
                </div>
                <div className="nav-links-2">
                    
                    <div className="group  show-hidden-profile">
                            <img className="mini-pic" src={props.pic} alt=""/>
                            <h6>{props.name}</h6>
                    </div>
                    <GoDiffAdded className="fixed-size circle-hover"/>
                    <FaFacebookMessenger className="fixed-size circle-hover"/>
                    <IoNotificationsCircle className="fixed-size circle-hover"/>
                    <AiFillCaretDown className="fixed-size circle-hover" onClick={() => setShowDropdown(!dropdown)}/>

                </div>
            </div>
            {dropdown && <div className="dropdown " >
                <div className="profile">
                    <img src={props.pic} alt="" className="mini-pic" />
                    <div className="col">
                        <h5>{props.name + " " + props.lastname}</h5>
                        <h6>See Profile</h6>
                    </div>
                    
                </div>
                <div className="feedback">
                    <RiFeedbackLine/>
                    <div className="col">
                        <h5>Give Feedback</h5>
                        <h6>Help us improve the new Facebook.</h6>
                    </div>
                </div>
                <div className="logout" onClick={() => pushAndClear()}>
                    <ImExit/>
                    <h5 >Logout</h5>
                </div>
                
            </div>  }


    </div>
    
    </React.Fragment>
    )
})
const PhotosNavbars  = [
    
    {
        id: 1,
        title: 'Photos of You',
        link: '/photos' 
    },
    {
        id: 2,
        title: 'Your Photos',
        link: '/photos_by'
    },
    {
        id: 3,
        title: 'Albums',
        link: '/photos_albums'
    }
]
const AboutTabNavbar = [
    
    {
        id: 1,
        title: 'Overview',
        link: '/about' 
    },
    {
        id: 2,
        title: 'Work and Education',
        link: '/work_and_education'
    },
    {
        id: 3,
        title: 'Place Lived',
        link: '/place_lives'
    },
    {
        id: 4,
        title: 'Contact and Basic Info',
        link: '/contact_info'
    },
    {
        id: 5,
        title: 'Family and Relationships',
        link: '/family'
    },
    {
        id: 6,
        title: 'Details about You',
        link: '/details_about_you'
    },
    {
        id: 7,
        title: 'Life Events',
        link: '/life_events'
    },
]
const AboutTab = (props) => {
    const [changed, setChanged] = useState(false);
    return(
        <>
        <div className="AboutNavTab">
            
            <div className="about">
                
                <ul className="about-tab-navbar">
                    <h3>About</h3>
                    {AboutTabNavbar.map((val) => {
                        const {id} = val;
                    return (
                        <li key={id} >
                        <a  id={window.location.pathname == `/${props.email.substring(0, props.email.lastIndexOf("@")) + val.link}` ? "active" : ""} 
                        onClick={() => {window.history.replaceState(null,"",`/${props.email.substring(0, props.email.lastIndexOf("@")) + val.link}`); 
                        setChanged(!changed)}}>{val.title}</a>
                    </li>
                    )
                    })}
                </ul>       
                
            </div>
            <div className="about-tab-content">
                        <div className="overview-content">
                            <div className="works">
                                <FaBriefcase/>
                                <div>
                                    <h4>Works at {props.job}</h4>
                                    <h5>September 18, 2019 to present</h5>
                                </div>
                            </div>
                            <div className="studied">
                                <IoSchoolOutline/>
                                <h4>Studied Computer Science at Visayas State University</h4>
                            </div>
                            <div className="lived">
                                <BsFillHouseFill/>
                                <h4>Lives in {props.lived}</h4>
                                
                            </div>
                            <div className="status">
                                <BsHeart/>
                                <h4>Single</h4>
                                
                            </div>
                        </div>
            </div>
            
        </div>
        </>
    )
}
const PhotosTab = React.memo((props) => {
    const [changed, setChanged] = useState(false);
    return(
        <>
        <div className="NavTab">
            <div className="NavTabHeader">
                <h3>Photos</h3>
                
                <a href="#">Add Photos/Video</a>
                
            </div>
            <div className="friend-lists">
                <ul className="nav-friends">
                    {PhotosNavbars.map((val) => {
                        const {id} = val;
                    return(
                        
                        <li key={id} >
                            <a  id={window.location.pathname == `/${props.email.substring(0, props.email.lastIndexOf("@")) + val.link}` ? "active" : ""} 
                            onClick={() => {window.history.replaceState(null,"",`/${props.email.substring(0, props.email.lastIndexOf("@")) + val.link}`); 
                            setChanged(!changed)}}>{val.title}</a>
                        </li>
                        )
                    }) }
                    
                </ul>
        </div>
        <AllPhotos/>
        </div>
        
        </>
    )
})
const FriendsTab = React.memo((props) => {
    const [changed, setChanged] = useState(false);
    const [friendData, setFriendData] = useState(friend_data);kb
    const [searchFriends, setsearchFriends] = useState('');
    
    const handleChange = (e) => {
        setsearchFriends(e.target.value);
        console.log("changes");
    }
    
    const onKeyDown = (e) => {
        if(e.key === "Backspace"){
            setFriendData(friend_data);
        }
    }
    useEffect(()=> {
        const searchResults = friendData.filter(friend => friend.fullname.toString().toLowerCase().includes(searchFriends));
        setFriendData(searchResults);
        if(searchFriends.length == 0){
            setFriendData(friend_data);
        }
        
    },[searchFriends])
    return (
        <>
        <div className="NavTab">
            <div className="NavTabHeader">
                <h3>Friends</h3>
                <div className="search-friends-input">
                    <AiOutlineSearch className="search-icon"/>
                    <input type="text" placeholder="Search" value={searchFriends} onKeyDown={onKeyDown}  onChange={handleChange}/>
                </div>
                <a href="#">Friend Requests</a>
                <a href="#">Find Friends</a>
            </div>
            <div className="friend-lists">
                <ul className="nav-friends">
                    {FriendsTabNavbars.map((val) => {
                        const {id} = val;
                    return(
                        
                        <li key={id} >
                            <a  id={window.location.pathname == `/${props.email.substring(0, props.email.lastIndexOf("@")) + val.link}` ? "active" : ""} 
                            onClick={() => {window.history.replaceState(null,"",`/${props.email.substring(0, props.email.lastIndexOf("@")) + val.link}`); 
                            setChanged(!changed)}}>{val.title}</a>
                        </li>
                        )
                    }) }
                    
                </ul>
                <div className="three-dot">
                    <BsThreeDots/>
                </div>
            </div>
            <AllFriends friendData={friendData}/>
            
        </div>
        </>
    )
})
const AllPhotos = (props) => {
    return(
        <>
        <div className="photos">
            {photos.map((data) => {
                const {photo, id} = data;
                return(
                    <div className="each-photo" key={id}>
                        <img src={photo} alt="" className="pic"/>
                    </div>
                )
            })}
        </div>
        </>
    )
}
let AllFriends = (props) => {
    
    return (
        <div className="friend">
            {props.friendData.map((data) => {
                const {profile, fullname, id} = data;
                return (
                    <div className="each-friend" key={id}>
                        <img src={profile} alt="" className="pic"/>
                        <div>
                            <h4>{fullname}</h4>
                            <h5>303 mutual friends</h5>
                        </div>

                        
                    </div>
                )
            })}
        </div>
    )
}
const DisplayProfileNavs = ({id, profile, username, lastname, lived, job, pic,email}) => {
    
    const refCont = useRef(null);
    
    const [changed, setChanged] = useState({valueLink: '/facebook.com'});
    const SwitchTab = React.memo((props) => {
        
            switch(props.url){
                case `facebook.com/${email.substring(0, email.lastIndexOf("@")) + "/friends"}`:
                    return ( <> <FriendsTab email={email}/> 
                    <PhotosTab email={email}/>  <AboutTab email={email} lived={lived} job={job}/> </>)
                case `facebook.com/${email.substring(0, email.lastIndexOf("@")) + "/photos"}`:
                    return ( <> <PhotosTab email={email}/> <AboutTab email={email} lived={lived} job={job}/>  </>)
                case `facebook.com/${email.substring(0, email.lastIndexOf("@")) + "/about"}`:
                    return (<> <AboutTab email={email} lived={lived} job={job}/> <FriendsTab email={email}/> 
                        <PhotosTab email={email}/>  </>)
                default:
                    return (
                        // {PostTab(id:id,  profile:profile,  username:username, lastname:lastname, lived:lived, picpic} job={job})}
                        <PostTab lived={lived} pic={pic} job={job} />
                    )
            }
            
    })
    return (
        <React.Fragment >
        <nav className="DisplayProfileNav">
            <ul className="DisplayProfileLinks" ref={refCont} >
                {DisplayProfileNavbars.map((val) => {
                        const {id} = val;
                    return (
                        <React.Fragment key={id}>
                        <li >
                            <a  id={window.location.pathname == `/${email.substring(0, email.lastIndexOf("@")) + val.link}` ? "active" : ""} onClick={() => {window.history.replaceState(null,"",`/${email.substring(0, email.lastIndexOf("@")) + val.link}`); 
                            setChanged({valueLink: val.link})}}>{val.title}</a>
                        </li>
                        
                        </React.Fragment>
                    )
                })}
            </ul>
        </nav>
        <SwitchTab url={window.location.pathname}   id={id} profile={profile} username={username} lastname={lastname} lived={lived} pic={pic} job={job}/>
        </React.Fragment>
    )
}
const PostTab = React.memo((props) => {
    return (
        <>
        <div className="Posts">
                    <div className="posts-content1">
                        <PostContent1 lived={props.lived} pic={props.pic} job={props.job}/>
                    </div>
                    <div className="posts-content2">
                        <PostContent2 />
                    </div>
        </div>
        </>
    )
})
const ProfilePicture = React.memo(({username, profile, lastname})=> {

    return (
        <div className="super-header">
                    <div className="profile-timeline-container">
                        <div className="profile-timeline"    >
                            
                            <button className="select-profile-cover-photo-btn"><FcCompactCamera className="icon"></FcCompactCamera> Add Cover Photo </button>
                        </div>
                        <div className="profile-picture">
                                
                                    <img className="profile-img" src={profile} alt=""/>
                                
                                
                                <div className="profile-name">
                                    <h2>{username + " " + lastname}</h2>
                                    <h3>4k friends</h3>
                                    <div className="all-friends">
                                        {friend_data.map((data,key)=> {
                                            const {profile, id} = data;
                                            return (
                                                <div className="friends" key={id}>
                                                        <img src={profile} alt=""/>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    {/* <a href="#">Add Bio</a> */}
                                </div>
                                <ul className="DisplayProfileActions">
                                    <li><a href="#"><GrAddCircle/>Add to Story</a></li>
                                    <li><a href="#"><FaPen/>Edit Profile</a></li>
                                    {/* <li><a href="#"><AiFillEye/></a></li>
                                    <li><a href="#"></a></li> */}
                                </ul>
                        </div>
                    </div>
        </div> 
    )
})
Profile.protoTypes = {
    profile: PropTypes.object.isRequired
}
const DisplayProfile = (props) => {
    const [state, dispatch] = useReducer(reducer, defaultState);
    const [link, setLink] = useState('/facebook.com');
    return (
        <React.Fragment>
            
        {props.authorizedData.map((data) => {
            const {id, profile,username,lastname, lived, pic, job, isLogged, email} = data; 
            
            return (
                <React.Fragment key={id}>
                <div>

                
                <Header pic={profile} name={username} lastname={lastname}/>
                <ProfilePicture {...data}/>
                <DisplayProfileNavs {...data} />
                </div>
                </React.Fragment>
            )
        })}
        </React.Fragment>
    )
}
export default Profile
