import React, { useContext } from "react";
// import { Card, CardHeader} from "react-simple-card";
import {AppContext} from '../App'
import styles from './Interests.module.css'

const InterestCard = ({ info:{interest,idx}}) => {
  const {state, setState} = useContext(AppContext)
  let {interests: {all_interests : interests}} = state

  const card_clicked = (e)=>{
    const newCopy={}
    //need a duplicate so the arrays reference new/different locations in memory
    for (let key in interests) {
      newCopy[key] = [...interests[key]]
    }
    newCopy[idx][1] = !interests[idx][1]
    debugger
    let newInterests = state.interests
    newInterests.all_interests = newCopy
    setState({...state,...{interests:newInterests}})
  }

  return (
    <div className={styles.card}   onClick={card_clicked}>
			Please insert card here
      {/* <Card  className={styles.card_component} bgColor={interest[1] ? '#5fa83e' : '#fff'}>
        <CardHeader  style={{'border':'none'}} className={styles.header}>{interest[0]}</CardHeader>
      </Card> */}
    </div>
  );
};

export default InterestCard