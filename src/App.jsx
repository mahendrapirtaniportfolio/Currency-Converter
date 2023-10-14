import { useState, useEffect } from 'react'
import './App.css'
import CurrencyComponents from './components/CurrencyComponents'
import Loader from './components/Loader'

function App() {
  const [from, setFrom] = useState('INR')
  const [fromValue, setFromValue] = useState(1)
  const [to, setTo] = useState('USD')
  const [toValue, setToValue] = useState(83.2949);
  const [converstionRates, setConvertionRates] = useState({})

  useEffect(() => {
    fetch(`https://v6.exchangerate-api.com/v6/fda85281ecdb66810f56cbca/latest/${from}`)
    .then(response => response.json())
    .then(res => setConvertionRates(res["conversion_rates"]));
}, [from, to])

  const countryCodes = Object.keys(converstionRates);
  const convertCurrency = () => {
    if(countryCodes.length) {
      const priceValue = fromValue * converstionRates[to];
      setToValue(priceValue);
    }
  }

  useEffect(() => {
    convertCurrency();
  }, [from, to, fromValue, converstionRates, setToValue])

  const swap = () => {
    const temp = from;
    setFrom(prev => to);
    setTo(prev => temp);
  }

  return (
    <>
      <div className='max-w-[1372px] flex justify-center items-center py-10 h-screen bg-gradient-to-tr from-lime-100 to-black '>
        {
          (countryCodes.length) ? (
            <div className='shadow-2xl relative h-fit flex flex-col p-4 rounded-2xl bg-gradient-to-tr from-lime-300 to-slate-900'>
              <button 
                className='absolute bg-gradient-to-tr from-lime-500 to-black px-4 py-2 text-lg font-medium text-white rounded-md top-[55%] left-[56%] shadow-lg'
                onClick={swap}
              >
                swap
              </button>
              <h1 className='text-white shadow-sm text-center text-4xl font-bold py-2'> Currency Converter </h1>
              <CurrencyComponents 
                value={fromValue} 
                setValueMethod = {setFromValue} 
                setFromMethod = {setFrom}
                defaultValue = {{"defaultValue": from}}
                isFrom = {true} 
                converstionRates={converstionRates}
              />
              <CurrencyComponents 
                  value={toValue} 
                  setValueMethod = {setToValue} 
                  setFromMethod = {setTo} 
                  defaultValue = {{"defaultValue": to}}
                  isFrom = {false} 
                  converstionRates={converstionRates}
                  hasDisabled = {true}
                  className = "bg-white"
                />
            </div>
          ) : <Loader />
        }
      </div>
    </>
  )
}

export default App
