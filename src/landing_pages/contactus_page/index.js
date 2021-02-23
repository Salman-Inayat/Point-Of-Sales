import React from 'react'
import Navbar from "../header/Navbar";
import Footer from '../footer/index';
import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPodcast } from '@fortawesome/free-solid-svg-icons'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "./style.css"

const handleChange = (event) => {
    let { name, value } = event.target;

  };

const handleSubmit = () => {
    return true;
}


function ContactUs(){
    return(
        <div>
            <Navbar/>
            <div className="contactForm">
                <Grid container>
                    <Grid item md={4} sm={12} xs={12}></Grid>
                    <Grid item md={4} sm={12} xs={12}>
                    <form style={{margin:'40px 0px'}}>
                    <input
                        name="name"
                        type="text"
                        placeholder="Name*"
                        variant="outlined"
                        onChange={handleChange}
                        className="contact-form-input"
                        style={{width:'100%'}}
                    />
                    <input
                        name="email"
                        placeholder="Email*"
                        type="email"
                        variant="outlined"
                        className="contact-form-input"
                        onChange={handleChange}
                    />
                    <br />
                    <input
                        name="subject"
                        placeholder="Subject*"
                        type="text"
                        variant="outlined"
                        className="contact-form-input"
                        onChange={handleChange}
                        style={{width:"100%", marginTop:'0px'}}
                    />
                    <br />
                    <textarea
                        name="message"
                        variant="outlined"
                        aria-label="message"
                        placeholder="Your Message*"
                        rows={10}
                        className="message-text"
                        style={{width:'100%', padding:'10px', borderRadius:"5px", border:'1px solid #cc19ff'}}
                    />
                    <br />
                    <button >
                        <a style={{ textDecoration: "none", color: "#800080", textAlign:'center', fontSize:'17px'}} href="/">Contact Us</a>
                    </button>
                    </form>
                </Grid>
                <Grid item md={4} sm={12} xs={12}></Grid>
                </Grid>
            </div>
            <Footer/>
        </div>
    )
}

export default ContactUs;