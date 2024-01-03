"use client"
import { decrement, increment } from '@/lib/feature/counterSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import React from 'react'

const HomePage = () => {

  const { value } = useAppSelector(state => state.counter);
  const dispatch = useAppDispatch();

  const increamentHandler = () => {
    dispatch(increment());
  }

  const decreamentHandler = () => {
    dispatch(decrement());
  }

  return (
    <div className='bg-yellow-300 text-black'>
      <p>{value}</p>
      <div>
        <button className='' onClick={increamentHandler}>Increment</button>
        <button className='' onClick={decreamentHandler}>Decreament</button>
      </div>
    </div>
  )
}

export default HomePage