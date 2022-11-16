import { useState } from 'react'


const StatisticLine = (props) => {

  const {text, value} = props;


  return (
    <tr><td>{text}</td><td>{value}</td></tr>
  )
 
}



const Statistics = (props) => {

  const {good, neutral, bad} = props;
  const all = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1)/(all === 0 ? 1:all)
  const positive = good/(all === 0 ? 1:all)   * 100;

 
  return (
    all !== 0 ? <div>
      <h1>statistics</h1>
      <table><tbody>
      <StatisticLine text="good" value ={good} />
      <StatisticLine text="neutral" value ={neutral} />
      <StatisticLine text="bad" value ={bad} />
      <StatisticLine text="all" value ={all} />
      <StatisticLine text="average" value ={average} />
      <StatisticLine text="positive" value ={positive + ' %'} />
      </tbody></table>
    </div> : <h2>No feedback given</h2>
  )


 
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)



  return (
      <div>
        <h1>give feedback</h1>
        <button onClick={() => setGood(good + 1)}>good</button>&nbsp;
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>&nbsp;
        <button onClick={() => setBad(bad + 1)}>bad</button>
        <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
      </div>

  )
}

export default App