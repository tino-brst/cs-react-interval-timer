import React from 'react'
import { useInterval } from './useInterval'
import './styles.css'

const workTime = 5
const restTime = 3
const rounds = 3

export default function App() {
  const [currentRound, setCurrentRound] = React.useState(1)
  const [isWorking, setIsWorking] = React.useState(true)
  const [timeRemainig, setTimeRemaining] = React.useState(workTime)
  const [isTimerRunning, setIsTimerRunning] = React.useState(false)

  function tick() {
    const isLastTickInInterval = timeRemainig === 1
    if (isLastTickInInterval) {
      console.log(`${isWorking ? 'Work' : 'Rest'} Interval Complete`)
      setTimeRemaining(isWorking ? restTime : workTime)
      setIsWorking((isWorking) => !isWorking)
      const isRestIntervalEnd = isWorking === false
      if (isRestIntervalEnd) {
        console.log(`Round ${currentRound} Complete`)
        const isWorkoutComplete = currentRound === rounds
        if (isWorkoutComplete) {
          console.log('Workout Complete')
          setIsTimerRunning(false)
        } else {
          setCurrentRound((currentRound) => currentRound + 1)
        }
      }
    } else {
      setTimeRemaining((timeRemainig) => timeRemainig - 1)
    }
  }

  useSecondInterval(tick, isTimerRunning)

  function toggleIsTimerRuning() {
    setIsTimerRunning((isTimerRunning) => !isTimerRunning)
  }

  function reset() {
    setTimeRemaining(isWorking ? workTime : restTime)
  }

  return (
    <div className="App">
      <h5>{`${currentRound}/${rounds}`}</h5>
      <h4>{isWorking ? 'Work' : 'Rest'}</h4>
      <h1>{timeRemainig}</h1>
      <button onClick={toggleIsTimerRuning}>play/pause</button>
      <button onClick={reset} disabled={isTimerRunning}>
        reset
      </button>
    </div>
  )
}

const useSecondInterval = (callback: () => void, isRunning: boolean) => {
  const delay = 1000
  useInterval(callback, isRunning ? delay : null)
}
