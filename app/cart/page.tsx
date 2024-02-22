"use client";
import React from 'react'
import { makeStore, AppStore } from '@/lib/store';
import { Container } from '@radix-ui/themes';

const CartPage = () => {
  const store: AppStore = makeStore();
  const carts = store.getState().carts.carts;
  // console.log(carts);
  return (
    <Container>CartPage</Container>
  )
}

export default CartPage