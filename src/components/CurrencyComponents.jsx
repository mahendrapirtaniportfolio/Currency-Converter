function CurrencyComponents({isFrom, value, defaultValue, setValueMethod, setFromMethod, converstionRates}) {
  return (
    <div className='py-2'>
        {/* <h3 className='text-center text-white text-xl font-medium mb-2'>{isFrom ? 'From' : 'To'}</h3> */}
        <input 
            type='text' 
            className='p-4 rounded-md' 
            value={value} 
            onChange={e => setValueMethod(e.target.value)}
            placeholder={isFrom ? 'From' : 'To'}
        
        />
        <select className='ml-4 p-4 rounded-md' defaultValue={defaultValue} onChange={e => setFromMethod(e.target.value)}>
            {
            Object.keys(converstionRates).map(code => <option className="outline-none" value = {code} key={code}>{code}</option>)
            }
        </select>
    </div>
  )
}

export default CurrencyComponents;
