/* eslint-disable no-undef */
import React from 'react'
import { useSelector } from 'react-redux'
import IconButton from '../../../common/iconButton'
import cartSlice from '../../../../slices/cartSlice'

const RendertotalAmount = () => {
    const{total}=useSelector((state)=>state.cart)
    const handleByCourse=()=>{
        const courses=cart.map((course)=>course._id)
        console.log("Payment GateWay",courses)
    }
  return (
    <>
    <p>Total</p>
    <p>Rs:</p>
    <IconButton
    text={"Buy Now"}
    onClick={handleByCourse}
    />
    </>
  )
}

export default RendertotalAmount