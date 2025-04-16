import React from 'react'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useNavigate } from 'react-router-dom';
import { green } from '@mui/material/colors';
import { Button } from '@mui/material';
const PaymentSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className='min-h-screeen px-5'>
      <div className='flex flex-col items-center justify-center h-[90vh]'>
         <div className='box w-full lg:w-1/4 flex flex-col items-center rounded-md'>
             <TaskAltIcon sx={{fontSize:'5rem',color:green[500]}}/>
             <h1 className='py-5 text-2xl font-semibold'>Order Success</h1>
             <p>Thank you for choosing our restaurant! We appreciate your order</p>
             <Button onClick={()=>navigate("/")} variant="contained" className="py-5" sx={{margin:"1rem 0rem"}}>Go To Home</Button>
         </div>
      </div>
    </div>
  )
}

export default PaymentSuccess