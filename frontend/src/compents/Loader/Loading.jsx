import React from 'react';
import Loader from "../../assets/Loading.gif";

const Loading = () => {
  return (
    <div className='w-full mx-auto'><img src={Loader} alt="Loader" className='w-[50px] block mx-auto'></img></div>
  )
}

export default Loading