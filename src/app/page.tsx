import Header from '@/components/all-pages/Header'
import Cart from '@/components/special/Cart'
import Products from '@/components/special/Products'
import React from 'react'

const page = () => {
  return (
    <div>
      <Header/>
      <Products/>
      <Cart/>
    </div>
  )
}

export default page