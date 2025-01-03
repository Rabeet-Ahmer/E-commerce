"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { client } from "@/sanity/lib/client";

interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const ClientCard = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleAddToCart = async (productId: number) => {
    try {
        const cartItems = await client.fetch(`*[_type == "cartItem" && productId == $productId][0]`, {productId});
        if (cartItems) {
            await client.patch(cartItems._id).inc({quantity: 1}).commit();
          }

          alert("Product added to cart!")
    } catch (error) {
        console.error('Error adding to cart:', error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Error in fetching data");
        }
        const res: IProduct[] = await response.json();
        console.log(res);
        setProducts(res);
      } catch (error) {
        console.error("Error in fetching data", error);
      }
      finally{
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading){
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-900"></div>
      </div>
    );
  }
    

  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-4 font-play place-items-center ">
      {products.map((item) => (
        <Card key={item.id} className="p-5 h-[580px] max-w-[337px] flex flex-col justify-between items-center bg-chart-2/80">
          <div className="bg-white w-full h-[300px] overflow-hidden flex items-center justify-center max-h-[200px] rounded-md">
          <Image src={item.image} alt={item.title} width={300} height={300} className="w-auto h-auto max-h-[200px]"/>
          </div>
          <CardHeader className="w-full">
            <div className="flex justify-between font-poppins">
              <p className="opacity-70">{item.category}</p>
              <p>{item.rating.rate}⭐</p>
            </div>
            <CardTitle className="leading-relaxed">{item.title}</CardTitle>
          </CardHeader>
          <CardContent className="max-h-20 space-y-3 ">
            <CardDescription className="h-full overflow-hidden font-sans text-slate-700">{item.description}</CardDescription>
            <p className="font-poppins">{item.rating.count} Sold</p>
          </CardContent>
          <CardFooter className="flex justify-between w-full ">
            <div className="flex gap-2 font-poppins">
              <p>Price:</p>
              <p>${item.price}</p>
            </div>
            <Button onClick={() => handleAddToCart(item.id)} variant={"destructive"} className="p-5 py-6 rounded-e-3xl bg-slate-800 font-bold">Buy Now</Button>
          </CardFooter>
        </Card>
      ))}
    </main>
  );
};

export default ClientCard;
