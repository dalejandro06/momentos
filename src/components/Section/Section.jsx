import React, { useEffect, useState } from 'react'
import './Section.sass'
import SectionProduct from '../SectionProduct'
import { db } from '../../db/formController'
import Loading from '../Loading'

function Section() {
  const [products, setProducts] = useState()
  useEffect(() => {
    db.collection('Productos')
      .onSnapshot((querySnapshot) => {
        setProducts(querySnapshot.docs)
      })
  }, [])

  return (
    <div className='Section'>
      <h2>Productos</h2>
      <p>Cada uno para un momento especial!</p>
      <div className='Section-grid'>
        {products ? (
          products.map((product) => (
            <SectionProduct
              key={product.id}
              image={product.data().image || cupcake}
              title={product.data().title}
              route={product.data().route}
              description={product.data().description}
            />
          ))
        ) : <Loading className='Loading-products' />}
      </div>
    </div>
  )
}

export default Section