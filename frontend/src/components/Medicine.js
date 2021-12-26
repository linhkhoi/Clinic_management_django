import React from 'react'

export default function Medicine( props ) {
    const { medicine, onAdd } = props
    return (
        <div>
      <img className="small" src={medicine.image} alt={medicine.name} />
      <h3>{medicine.name}</h3>
      <div>${medicine.price}</div>
      <div>
        <button onClick={() => onAdd(medicine)}>Add To Cart</button>
      </div>
    </div>
    )
}
