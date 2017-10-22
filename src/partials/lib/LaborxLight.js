import React from 'react'
import styles from './LaborxLight.sass'

export default class LaborxLight extends React.Component {

  render () {
    return (
      <div className='root laborx-light'>
        <style jsx>{styles}</style>
        <div className='wrap'>
          <h2><img src='/static/images/logo2.png' srcSet='/static/images/@2x/logo2.png' />LaborX</h2>
          <div className='content'>
            <div className='left'>
              <div className='text'>
                <h3>LaborX — decentralised marketplace</h3>
                <p>LaborX is ChronoBank’s flagship platform for workers and clients: a place where employers can list jobs and freelancers can find employment from anywhere in the world, 24/7.</p>
                <p>It functions without any closures or outages, meaning work can be secured even at nights or on the weekends. LaborX’s reputation system will make the hiring process for every job fair. Every newcomer receives a neutral rating, which will change subject to feedback from the hiring counterparty. A net positive rating will enable workers to access better-paid jobs, whilst a negative rating will cause workers to drop down the ranks, and receive only offers for lower-paid work.</p>
                <p>For workers, delayed payment for a completed job becomes a thing of the past, because payment terms are registered in a smart contract from the outset. They can even be processed on a per-second basis.</p>
                <p>Another great feature for employers is the low commission fees - just 1% of a job’s overall pay. The difference between traditional hiring costs and LaborX’s hiring cost can be spent on improving working conditions or on pay bonuses.</p>
              </div>
            </div>
            <div className='right'><img src='/static/images/laborx.png' srcSet='/static/images/@2x/laborx.png 2x' /></div>
          </div>
        </div>
      </div>
    )
  }
}
