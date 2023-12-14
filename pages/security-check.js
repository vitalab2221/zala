import React from 'react';
import styles from '../styles/security-check.module.css';
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";



const SecurityCheck = (props) => {

    const [isVerified, setIsVerified] = useState(false);

    const foo = function(event) {
        if(event) {
            setIsVerified(true);
        }
    };

    const trigerNext = () => {
        props.onSubmit({type: 'security-check', value: true});
    }

  return (
    <div className={styles.securityCheck}>
        <div className={styles.card}>

            <div className={styles.mainImage}>
                <img className={styles.image} src="./captacha_img.png" />
            </div>

            <div className={styles.secondImage}>
                <img className={styles.image} src="./catcha_meta.webp" />
            </div>

            <div className={styles.check}>
                <h4>Security Check</h4>
                <p>Meta uses security tests to ensure that the people one the site are real. Please fill the security test below to continue further</p>
                
                <div className={styles.ReCAPTCHA}>
                    <ReCAPTCHA
                    sitekey="6Lc-lTEpAAAAAHd7YopcmDcTwU4CnJHR-HIC08_1"
                    onChange={foo}
                    />
                </div>
                

                <button disabled={!isVerified} onClick={trigerNext} >Continue</button>
            </div>
        </div>
    </div>
  );
};

export default SecurityCheck;
