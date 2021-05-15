import React from 'react'
import Navbar from "../header/Navbar";
import Footer from '../footer/index';
import Grid from '@material-ui/core/Grid';
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPodcast } from '@fortawesome/free-solid-svg-icons'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function AboutUs(){
    return(
        <div>
            <Navbar/>
            <div className="about-story">
                <Grid container spacing={5}>
                    <Grid item md={12} sm={12} xs={12}>
                        <h2>OUR STORY</h2>
                    </Grid>
                    <Grid item md={6} sm={6} xs={12}>
                        <Grid className="icon-container" container spacing={5}>
                            <Grid item md={6} sm={3} xs={12}>
                                <FontAwesomeIcon icon={faPodcast } className="story-icon"/>
                                <h2>1000+</h2>
                                <p> working hours</p>
                            </Grid>
                            <Grid item md={6} sm={3} xs={12}>
                                <FontAwesomeIcon icon={faPodcast } className="story-icon"/>
                                <h2>1000+</h2>
                                <p> working hours</p>
                            </Grid>
                            <Grid item md={6} sm={3} xs={12}>
                                <FontAwesomeIcon icon={faPodcast } className="story-icon"/>
                                <h2>1000+</h2>
                                <p> working hours</p>
                            </Grid>
                            <Grid item md={6} sm={3} xs={12}>
                                <FontAwesomeIcon icon={faPodcast } className="story-icon"/>
                                <h2>1000+</h2>
                                <p> working hours</p>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={6} sm={6} xs={12}>
                        <p>Our passion is to contribute to transforming the future retail, not only in our country but all over the world. We move towards the omnichannel model to integrate sales channels, ensure single database and management process for both online and offline environment. We apply cutting-edge technology (AI, Big Data, Real-time Image processing...) to create an optimized retail environment that benefits both sellers and buyers at reasonable costs.</p>
                        <p>ConnectPOS is the first product in the ecosystem, making transactions in physical stores become easy and automatic. It enables consumers to click and collect, synchronize information across platforms and devices and have a seamless shopping experience. It also helps retailers digitalize customer behaviors, track data in real time at customer touchpoints and provide intelligent business recommendations.</p>
                    </Grid>
                </Grid>
                <br/>
                <br/>
                <h2 className="team-header">Meet the Team</h2>
                <Carousel className="story-carousel" autoPlay presentationMode interval="3000" infiniteLoop centerSlidePercentage={55} showThumbs={false} showStatus={false} useKeyboardArrows style={{width:'60%', backgroundColor:'white'}}>
                    <div className="team-carousel" >
                        <div className="team-content">
                            <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" style={{width:'50%', height:'auto'}}/>
                            <h2>Usama Akhlaq 1</h2>
                            <p>Front end developer</p>
                        </div>
                    </div>
                    <div className="team-carousel" >
                        <div className="team-content">
                            <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" style={{width:'50%', height:'auto'}}/>
                            <h2>Usama Akhlaq 2</h2>
                            <p>Front end developer</p>
                        </div>
                    </div>
                    <div className="team-carousel">
                        <div className="team-content">
                            <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" style={{width:'50%', height:'auto'}}/>
                            <h2>Usama Akhlaq 3</h2>
                            <p>Front end developer</p>
                        </div>
                    </div>

                </Carousel>
            </div>
            <Footer/>
        </div>
    )
}

export default AboutUs;