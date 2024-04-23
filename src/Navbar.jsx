import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from "./context/AuthContext";


function Navbar() {
  const { user,signOut } = useContext(AuthContext);
  return (
    <div className='bg-slate-200 w-full h-14 flex justify-center items-center font-sans text-lg text-black drop-shadow-lg'>
      {/* <h2 className='font-sans text-lg font-bold'>ToDoList Maker</h2> */}
      <ul className='flex gap-12 font-semibold'>
        <NavLink  className={(e)=>{return e.isActive? "bg-black text-amber-400": ""}} to={"/"}><li className='cursor-pointer hover:text-amber-400 hover:bg-black p-4'>Home</li></NavLink>
        <NavLink  className={(e)=>{return e.isActive? "bg-black text-amber-400": ""}} to={user?"/profile":"/login"}><li className='cursor-pointer hover:text-amber-400 hover:bg-black p-4'>{user? "Profile":"Log in"}</li></NavLink>
        <NavLink  className={(e)=>{return e.isActive? "bg-black text-amber-400": ""}} to={user?"/login":"/signup"}><li onClick={()=>signOut()} className='cursor-pointer hover:text-amber-400 hover:bg-black p-4'>{user? "Log out":"Sign up"}</li></NavLink>
        
      </ul>
      {/* <div></div> */}
    </div>
  )
}

export default Navbar
