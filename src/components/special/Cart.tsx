'use client'
import { client } from '@/sanity/lib/client';
import React, { FC, useEffect, useState } from 'react'

interface ICart {
    productId: number;
    quantity: number;
}

const Cart: FC = () => {
    const [cart, setCart] = useState<ICart[]>([]);

    useEffect(() => {
        const cartData = async () => {
            try {
                const response = await client.fetch(`*[_type == "cartItem"]`);
                setCart(response);
            } catch (error) {
                console.error("Error fetching cart items",error);
            }
        }

        cartData();
    }, []);

  return (
    <div>
         <h1 className="text-2xl font-bold mb-4">Cart</h1>
      {cart.map((item, i) => (
        <div key={i} className="border p-4 rounded mb-2">
          <p>Product ID: {item.productId}</p>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}
    </div>
  )
}

export default Cart