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
  }, [from, to, fromValue, converstionRates])

  return (
    <>
      <div className='max-w-[1372px] flex justify-center py-10 h-screen bg-gradient-to-tr from-lime-100 to-slate-900 '>
        {
          (countryCodes.length) ? (
            <div className='shadow-md h-fit flex flex-col p-4 rounded-2xl bg-gradient-to-tr from-white to-black'>
              <h1 className='text-white shadow-sm text-center text-4xl font-bold py-2'> Currency Converter </h1>
              <CurrencyComponents 
                value={fromValue} 
                setValueMethod = {setFromValue} 
                setFromMethod = {setFrom}
                defaultValue = {from}
                isFrom = {true} 
                converstionRates={converstionRates}
              />
              <CurrencyComponents 
                  value={toValue} 
                  setValueMethod = {setToValue} 
                  setFromMethod = {setTo} 
                  defaultValue = {to}
                  isFrom = {false} 
                  converstionRates={converstionRates}
                />
            </div>
          ) : <Loader />
        }
      </div>
    </>
  )
}

export default App
