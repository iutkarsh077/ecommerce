import React from 'react'
import Jewellery from './Products/Jewellery'
import Electronics from './Products/Electronics'
import MenClothing from './Products/MenClothing'
import WomenClothing from './Products/WomenClothing'

const ProductListed = () => {
  return (
    <div>
     <Jewellery/>
     <Electronics/>
     <MenClothing/>
     <WomenClothing/>
    </div>
  )
}

export default ProductListed
