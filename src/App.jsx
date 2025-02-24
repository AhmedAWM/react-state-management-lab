import { useState } from 'react';
import './App.css';
import ZombieFighters from './data/ZombieFighters'; // Seperating the data from App.jsx is much cleaner

const App = () => {
  const [team, setTeam] = useState([]);
  const [money, setMoney] = useState(100);
  const [zombieFighters, setZombieFighters] = useState(ZombieFighters);

  function handleAddFighter(addFighter) {
    if(money < addFighter.price) {
      console.log('No enough money to buy');
      return;
    }

    // If enough money, add the fighter to the team
    setTeam([...team, addFighter]);

    // Remove the fighter from zombie fighters list
    const updatedZombieFighters = zombieFighters.filter((oneFighter) => {
      return oneFighter.id !== addFighter.id;
    });

    // Otherwise, remove and update zombieFighter's list
    setZombieFighters(updatedZombieFighters);

    // Deduct money from money account
    setMoney(money - addFighter.price);
  }

  // Removeing fighters from team
  function handleRemoveFromTeam(removedFighter) {
    // Remove fighter from team
    setTeam(
      team.filter((oneFighter) => {
        return oneFighter.id !== removedFighter.id;
      })
    )

    // Add fighter back to the zombieFighters list
    setZombieFighters([...zombieFighters, removedFighter]);

    // Refund the money to the account
    setMoney(money + removedFighter.price);
  }

  // Calculate total strength and agility
  const totalStrength = team.reduce((total, fighter) => total + fighter.strength, 0);
  const totalAgility = team.reduce((total, fighter) => total + fighter.agility, 0);

  return (
    <>
      <center><h1>Available Fighters</h1></center>
      <div className='container'>
        {
          zombieFighters.map((fighter) => (
            <section key={ fighter.id }>
              <h2>{ fighter.name }</h2>
              <center><img src={ fighter.img } alt={ fighter.name } /></center>
              <div>
                <span>Price: ${ fighter.price }</span>
                <span>Strength: { fighter.strength }</span>
                <span>Agility: { fighter.agility }</span>
              </div>
              <button onClick={ () => handleAddFighter(fighter) }>Add</button>
            </section>
          )) 
        }
      </div>

      <center><h1>Team Fighters</h1></center>
      <div className='container'>
        {
          team.map((fighter) => (
            <section key={ fighter.id }>
              <h2>{ fighter.name }</h2>
              <center><img src={ fighter.img } alt={ fighter.name } /></center>
              <div>
                <span>Price: ${ fighter.price }</span>
                <span>Strength: { fighter.strength }</span>
                <span>Agility: { fighter.agility }</span>
              </div>
              <button onClick={ () => handleRemoveFromTeam(fighter) }>Delete</button>
            </section>
          )) 
        }
      </div>
    </>
  );
}

export default App;