import React from "react";
import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarker, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import './style.css'

function Footer(){
    return(
        <div className="footer-section">
            <Grid className="footer" container spacing={5}>
                <Grid item md={4} sm={4} xs={12}>
                    <h2>About Connect PoS</h2>
                    <p>ConnectPOS is a cloud-based POS software compatible with multiple platforms including Magento, Shopify, and BigCommerce.</p>

                </Grid>
                <Grid item md={4} sm={4} xs={12}>
                    <p>demo</p>
                </Grid>
                <Grid item md={4} sm={4} xs={12}>
                    <div style={{marginBottom:'5px', display:'flex'}}>
                            <FontAwesomeIcon icon={faMapMarker} className="iconfont" />
                            <p>City, Country</p>
                        </div>
                        <div style={{marginBottom:'5px', display:'flex'}}>
                            <FontAwesomeIcon icon={faPhone} className="iconfont"/>
                            <p> (+00) 0000 000 000</p>
                        </div>
                        <div style={{marginBottom:'5px', display:'flex'}}>
                            <FontAwesomeIcon icon={faEnvelope} className="iconfont"/>
                            <p><a href="#"> office@company.com</a></p>
                        </div>
                </Grid>
            </Grid>
        </div>

    )
}

export default Footer;