import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link, useNavigate } from 'react-router-dom';
import { logOut } from '../../services/operations/auth';
import { useDispatch } from 'react-redux';
export default function BasicSelect() {
  const [age, setAge] = React.useState('');
  const dispatch=useDispatch();
  const navigate=useNavigate();


  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleLogout=()=>{
    dispatch(logOut(navigate))
  }

  return (
    <div className='h-10 w-40  mb-4   '>
        <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth className=''>
        <InputLabel id="demo-simple-select-label">DropDown</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
          className="text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        >
          <MenuItem value={10} >
            <Link to="/dashboard/my-profile">
            DashBoard
            </Link>
          </MenuItem>
          <MenuItem value={20}><button onClick={handleLogout}  >
                                LogOut
                            </button></MenuItem>
          {/* <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
      </FormControl>
    </Box>
    </div>
  );
}
