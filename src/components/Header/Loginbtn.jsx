import { LogInIcon } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button';

function Loginbtn() {
    const navigate=useNavigate();

  return (
    // <Button  variant="outline" size="icon">
    // {/* <LogInIcon/> */}Login
    // </Button>

  <Button onClick={()=>navigate('/login')}>
  <LogInIcon className="mr-2 w-3" /> Login
  </Button>
  )
}

export default Loginbtn