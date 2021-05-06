import React, { useRef,useEffect,useState} from 'react'
import man from '../img/maninsuit1.png';
import js from '../img/js.jpg';
import css from '../img/css.png';
import html from '../img/html.jpg';
import nodejs from '../img/nodejs.png';
import react from '../img/react.png';
import { Button } from '@material-ui/core';
import {TweenMax,TimelineMax, Power3,Power0, Bounce, Power2, Powe} from 'gsap';
import gsap from 'gsap/gsap-core';
import { BsPlusSquareFill} from 'react-icons/bs'
const Home = () => {

    let refContainer = useRef(null);
    let refContainer1 = useRef(null);
    let refContainer2 = useRef(null);
    let refContainer3 = useRef(null);
    let refContainer4 = useRef(null);
    let caret = useRef(null);
    const [block,setBlock] = useState(false);
    const [doing,showDoings] = useState(false);
    const [from,showFrom] = useState(false);
    const [future,showFuture] = useState(false);
    var Window = window;
    let cover = useRef(null);
    let fact = document.getElementsByClassName('fact');
    let caret1 = document.getElementById('caret-down');
    let images = document.getElementsByClassName('imgs');
    let abouts = document.getElementsByClassName('abouts');
    let title = document.getElementsByClassName("title");
    useEffect(() => {
        
        var tl1= new TimelineMax({repeat:-1, yoyo:true});
        var tl2= new TimelineMax({repeat:-1, yoyo:true});
        var tl = gsap.timeline({default: {duration: 1 }});
        var tl3 =  new TimelineMax({repeat: 0, yoyo:true});
        

        tl1.fromTo(caret, 1,{
            
            y: '-30',
        },{y: '0',
        ease: Power0.easeNone})
        tl2.fromTo(images, 1,{
            
            y: '0', 
        },{y: '-30',
        ease: Power0.easeNone})
        tl.fromTo(abouts,{
            height: '0'
        },{height: '20%', ease: Power0.easeIn, stagger: 1.2})
        tl3.fromTo(title ,{
            y: '-20',
            opacity: "0"
        },{y: '0', opacity: '1', ease: Power0.easeIn, delay: 1.2, stagger: 1});
        

        
    }, [])
    
//     const Slidedown = () => {
//             TweenMax.to(cover, 1, {
//                 y: '100%' , 
//             ease: Power3.easeOut,})
//     }
//     const Slideup = () => {
//         TweenMax.to(cover, 1, {
//             y: '-100%' , 
//         ease: Power3.easeOut})
//         TweenMax.to(caret1, 1,{
//             y: '20',
//             repeat: -1,
//             ease: Bounce.easeInOut
//         })
// }
    return (
        <>
        <section className="nav-section">
            <nav className="nav">
                <div className="brand">
                    <a href="#">Brand</a>
                </div>
                <ul className="nav-links">
                    
                    
                    <li className="nav-item"><a href="#home">Home</a></li>
                    <li className="nav-item"><a href="#home">About</a></li>
                    <li className="nav-item"><a href="#home">Projects</a></li>
                    <li className="nav-item"><a href="#home">Journey</a></li>
                    <li className="nav-item"><a href="#home">Contact</a></li>
                    
                </ul>
            </nav>
        </section>
        {/* <div className="intro-section-img" ref={ el => {refContainer = el}} onMouseOver={() => Slidedown()} onMouseLeave={() => Slideup()}>
            <div className="text-container">
                <p>Hi, I'm Jade Kenneth. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo tempore eligendi perferendis voluptatum fugit quos enim non facere quisquam blanditiis.</p>
            </div>
            <img src={man} alt=""/>
            
            <div className="cover" ref={el => {cover = el}} >
                <Button variant='contained' color="primary">KNOW ME MORE</Button>
            </div>
            
        </div> */}
        <article className="intro">
            <div className="greeting">
                <p className="name">Hey, I'm Jade.</p>
                <p className="quote">A software engineer, focused on <span className="highlight">front-end engineering</span> . Creating websites and applications.</p>
                
                <button className="btn">Here's my works</button>
            </div>
            <div className="pic">
                <img className="imgs html" src={html} alt=""/>
                <img className="imgs css" src={css} alt=""/>
                <img className="imgs js" src={js} alt=""/>
                <img className="imgs react" src={react} alt=""/>
                <img className="imgs nodejs" src={nodejs} alt=""/>
            </div>
            <div id="caret-down" ref={el => {caret = el}}></div>
        </article>
        {/* <article className="fact1" ref={ el => {refContainer1 = el}}>
            <div className="fact factsContent">
                <h4 >Hi, I'm Jade Kenneth Darunday</h4>
                <h4>FRONT-END ENGINEER</h4>
            </div>
            
        </article>
        <article className="fact2" ref={ el => {refContainer2 = el}}>
            <div className="fact">
                <h2>dgs</h2>
            </div>
            
        </article>
        <article className="fact3" ref={ el => {refContainer3 = el}}>
            <div className="fact">
                <h2>fds</h2>
            </div>
        </article>
        <article className="fact4" ref={ el => {refContainer4 = el}}>
            <div className="fact">
                <h2>khsd</h2>
            </div>

            
        </article> */}
        <article className="about">
            
            <div className="abouts about-from">
                <div className="title-content">
                    <h4 className="title">WHERE I'VE BEEN <span onClick={() => showFrom(!from)}><BsPlusSquareFill/></span> </h4>
                </div>
                
                {from&& <p  className="content"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, voluptatum voluptatibus. Fuga officiis odio assumenda libero sit quod? Voluptate nostrum minus temporibus eum, aperiam expedita maxime enim aliquid est inventore.</p>}
            </div>
            <div className="abouts about-doings">
                <div className="title-content">
                    <h4 className="title">WHAT I'M DOING <span onClick={() => showFrom(!doing)}><BsPlusSquareFill/></span></h4>
                </div>
                {doing && <p  className="content"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, voluptatum voluptatibus. Fuga officiis odio assumenda libero sit quod? Voluptate nostrum minus temporibus eum, aperiam expedita maxime enim aliquid est inventore.</p>}
            </div>
            <div className="abouts about-future">
                <div className="title-content">
                    <h4 className="title">WHAT I HOPE TO DO<span onClick={() => showFrom(!future)}><BsPlusSquareFill/></span></h4>
                </div>
                {future && <p  className="content"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, voluptatum voluptatibus. Fuga officiis odio assumenda libero sit quod? Voluptate nostrum minus temporibus eum, aperiam expedita maxime enim aliquid est inventore.</p>}
                
            </div>
        </article>
        
        </>
    )
}

export default Home
