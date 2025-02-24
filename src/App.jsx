import { useState } from 'react';
import './App.css';
import ZombieFighters from './data/ZombieFighters'; // Seperating the data from App.jsx is much cleaner

const App = () => {
  const [team, setTeam] = useState([]);
  const [money, setMoney] = useState(100);
  const [zombieFighters, setZombieFighters] = useState(ZombieFighters);

  function handleAddFighter(fighter) {
    if(money < fighter.price) {
      console.log('No enough money to buy');
      return;
    }

    // If enough money, add the fighter to the team
    setTeam([...team, fighter]);
    
    // Remove the fighter from zombie fighters list
    const updatedZombieFighters = zombieFighters.filter((zFighter) => {
      return zFighter !== fighter.id; // Do nothing if IDs does not match
    });
    setZombieFighters(updatedZombieFighters); // Otherwise, remove and update zombieFighter's list
  }

  return (
    <>
      <div class="container">
        <h2>{ zombieFighters[0].name }</h2>
        <center><img src={ zombieFighters[0].img } alt={ zombieFighters[0].name } /></center>
        <div>
          <span>Price: ${ zombieFighters[0].price }</span>
          <span>Strength: { zombieFighters[0].strength }</span>
          <span>Agility: { zombieFighters[0].agility }</span>
        </div>
      </div>
    </>
  );
}

export default App;