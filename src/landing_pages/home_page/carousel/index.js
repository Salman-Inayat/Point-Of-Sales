import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "../style.css"

class HomeCarousel extends Component {
    render() {

        // const carousel_data = [
        //     {
        //         image:'https://images.unsplash.com/photo-1592488874899-35c8ed86d2e3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjB8fHBvc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        //         title:'Apply the most advanced technology in POS system',
        //         paragraph:''
        //     }
        // ]

        return (
            <Carousel autoPlay showThumbs={false} showStatus={false} useKeyboardArrows className="landing-carousel presentation-mode">
                <div className="carousel landing-carousel ">
                    <img className="carousel-image" src="https://images.unsplash.com/photo-1592488874899-35c8ed86d2e3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjB8fHBvc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
                    <div className="carousel-content">
                        <h1>Apply the most advanced technology in POS system</h1>
                        <p>Trusted by 2000+ retailers around the world</p>
                        <button className="landing-carousel-button"><a href="#" style={{pointer:'cursor', color: 'white'}}>Explore Now  <span>&rarr;</span></a></button>
                    </div>
                </div>
                {/* <div className="carousel">
                    <img className="carousel-image" src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8cG9zfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
                    <div className="carousel-content">
                        <h1>Demo content 2</h1>
                        <p>Demo paragraph</p>
                    </div>
                </div>
                <div className="carousel">
                    <img className="carousel-image" src="https://images.unsplash.com/photo-1556740714-a8395b3bf30f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cG9zfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
                    <div className="carousel-content">
                        <h1>Demo content 3</h1>
                        <p>Demo paragraph</p>
                    </div> 
                </div> */}
            </Carousel>
        );
    }
};

export default HomeCarousel;