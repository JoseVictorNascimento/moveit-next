import { useState } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';

import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'
import { ChallengeBox } from '../components/ChallengeBox';

import styles from '../styles/pages/Home.module.css';

export default function Home(props) {
  const [theme, setTheme] = useState(false);

  function toggle() {

    setTheme(theme === false ? true : false)

    darkTheme()

    console.log(theme)
  }

 function darkTheme() {

  if(theme === false) {
    document.body.classList.add("dark-mode")
  } else if (theme === true) { 
    document.body.classList.remove("dark-mode") 
  }

 }

  
  return (
    <ChallengesProvider 
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>

        <div className={styles.toggle}>
          <input type="checkbox" name="theme" id="switch" onClick={toggle}/>
          <label htmlFor="switch">Toggle</label>
        </div>
      

        <ExperienceBar />

      <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}
