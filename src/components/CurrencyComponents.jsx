function CurrencyComponents(props) {
  const {isFrom, value, defaultValue, setValueMethod, setFromMethod, converstionRates, hasDisabled = false, className = ""} = props;
  const defaultClass = `p-4 rounded-md ${className}`
  return (
    <div className='py-2'>
        <input 
            type='text' 
            className= {defaultClass} 
            value={value} 
            onChange={e => setValueMethod(e.target.value)}
            placeholder={isFrom ? 'From' : 'To'}
            disabled = {hasDisabled}
        
        />
        <select className='ml-4 p-4 rounded-md' value={defaultValue["defaultValue"]} onChange={e => setFromMethod(e.target.value)}>
            {Object.keys(converstionRates).map(code => <option 
                className="outline-none" 
                value = {code}
                key={code}>
                {code}
            </option>)}
        </select>
    </div>
  )
}

export default CurrencyComponents;
