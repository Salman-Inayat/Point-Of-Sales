import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "../style.css"
import Grid from '@material-ui/core/Grid';


class TestimonialCarousel extends Component {
    render() {
        return (
            <Carousel autoPlay showThumbs={false} showStatus={false} useKeyboardArrows className="presentation-mode testimonial-section">
                <div className="testimonial-carousel">
                    <Grid container spacing={5}>
                        <Grid className="content-parent" item md={7} sm={7} xs={12}>
                            <div className="testimonial-content">
                                <h1>Hear our cutomer stories</h1>
                                <p>I tried this app for the first time. Trust me this is way better than other POS software in the market. It is simple and powerful. Also, the customer’s assistance is amazing and super cooperative. It's really worth the money.</p>
                                <h3>Food and drink retail, Pakistan</h3>
                            </div>
                        </Grid>
                        <Grid item md={5} sm={5} xs={12}>
                            <div className="testimonial-image-container">
                                <img className="testimonial-image" src="https://www.connectpos.com/wp-content/themes/connectSpos/images/testimonial-1.png" alt="img"/>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                {/* <div className="testimonial-carousel">

                </div>
                <div className="testimonial-carousel">

                </div> */}
            </Carousel>
        );
    }
};

export default TestimonialCarousel;