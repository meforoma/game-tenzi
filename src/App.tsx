import React, { useEffect, useState } from 'react';
import './styles/general.scss';

import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import { Die } from './components/Die';

export const App = () => {
  const [dice, setDice] = useState(generateDice());
  const [userWon, setUserWon] = useState(false);

  const [stats, setStats] = useState({
    rollsCount: 0,
    bestRolls: localStorage.getItem('bestRolls'),
  });

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const allSameValue = dice.every(die => die.value === dice[0].value);

    if (allHeld && allSameValue) {
      setUserWon(true);

      const prevBestRolls = localStorage.getItem('bestRolls') || 100;

      if (stats.rollsCount < +prevBestRolls) {
        localStorage.setItem('bestRolls', stats.rollsCount.toString());
      }
    }
  }, [dice]);

  function generateDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function generateDice() {
    const newDice = [];

    for (let i = 0; i < 10; i++) {
      newDice.push(generateDie());
    }

    return newDice;
  }

  const increaseRollCount = () => {
    setStats(prevStats => (
      {
        ...prevStats,
        rollsCount: prevStats.rollsCount + 1,
      }
    ));
  };

  const resetStats = () => {
    setStats({
      rollsCount: 0,
      bestRolls: localStorage.getItem('bestRolls'),
    });
  };

  function buttonClick() {
    if (userWon) {
      setUserWon(false);
      setDice(generateDice());
      resetStats();
    } else {
      setDice(oldDice => oldDice.map(die => (
        die.isHeld
          ? die
          : generateDie()
      )));

      increaseRollCount();
    }
  }

  function holdDice(id: string) {
    setDice(oldDice => oldDice.map(die => (
      die.id === id
        ? { ...die, isHeld: !die.isHeld }
        : die
    )));
  }

  const diceElements = dice.map(die => (
    <Die
      key={nanoid()}
      die={die}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      {userWon && <Confetti />}
      <h1 className="title">Tenzi game</h1>

      <div className="stats">
        <div className="stats-rolls">
          Best rolls:
          {' '}
          {stats.bestRolls}
        </div>
      </div>

      <p className="instructions">
        Roll and freeze until all dice are of the same value.
        Click die to freeze/unfreeze it from rolling.
      </p>

      <div className="dice-container">
        {diceElements}
      </div>

      <button
        type="button"
        className="roll-dice"
        onClick={buttonClick}
      >
        {userWon ? 'New Game' : 'Roll'}
      </button>
    </main>
  );
};
