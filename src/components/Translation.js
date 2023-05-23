import React from 'react'

function Translation({doStuff, setInput, textResult,result}) {
  return (
    <div className='translation'>
        <textarea className="text-area" cols={80} rows={20} onChange ={(e) =>{
            setInput(textResult+e.target.value)
        }} defaultValue={textResult}></textarea>
        <button className="action-btn" onClick={doStuff}>DO YOUR STUFF!</button>

        <h3 className='result-text'>{result.length>0 ? result:" "}</h3>
    </div>
  )
}

export default Translation;