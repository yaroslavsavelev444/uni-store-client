import React from 'react'

export default function ItemDescription({description}) {
  return (
    <div>
        <h2>Описание</h2>
        <p style={{whiteSpace: 'pre-line', padding: '10px'}}>{description}</p>
    </div>
  )
}
