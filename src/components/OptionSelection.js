import React from 'react'

function OptionSelection({arrayItems, selectOption}) {
  return (
    <div>
        <div>DANTE'S AI</div>
        <div className='grid-main'>
            {

                arrayItems.map((item) => {
                    return (
                        <div  className='grid-child' onClick={() => selectOption(item.option)}>
                            <h4>{item.name}</h4>
                            <p>{item.description}</p>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default OptionSelection