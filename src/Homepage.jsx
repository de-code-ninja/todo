import React, { useEffect, useState,useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function Homepage(props) {
  const [task, settask] = useState("");
  const [taskArr, settaskArr] = useState([])
  const { user } = useContext(AuthContext);
  
  function handleChanges(e){
    const data = e.target.value;
    settask(data);
  }
  async function fetchData(){
    try{
      if (!user || !user._id) {
        // User or user._id is null or undefined
        console.error("User not available");
        return;
      }
    // const userId = user._id;
   
    const response = await fetch(`https://todobackend-suuw.onrender.com/api/get/data/${user._id}`);
    const data = await response.json();
   
    
    settaskArr(data);
  }catch(err){
    console.error(err);
  }
}
useEffect( () => {
  if (user && user._id) {
    fetchData();
  }
}, [user])

async function submitTask(){
  const dataToSend = {
    inputTask: task
  }
  settask("");
  try{
  const userId = user._id;
  const response = await fetch(`https://todobackend-suuw.onrender.com/api/task/data/${userId}`,{
    method: "POST",
    headers:{ 'Content-Type': 'application/json'},
    body: JSON.stringify(dataToSend)
  })
  if (response.ok) {
   
    fetchData();
  } else {
    console.error("Failed to send data");
  }
  }
  catch(err){
    console.log(err);
  }

}
async function deleteBtn(id){
    const sendId = {taskId: id};
  try{
      const response = await fetch("https://todobackend-suuw.onrender.com/delete/task",{
        method:"DELETE",
        headers:{ 'Content-Type': 'application/json'},
        body: JSON.stringify(sendId)
      })
      if (response.ok) {
        
        fetchData();
      } else {
        console.error("Failed to send data");
      }
  }
  catch(err){
        console.log(err);
  }


}

  return (
    <div className="flex items-center flex-col mt-8  drop-shadow-md selection:bg-amber-400 selection:text-black">
      <div
        className="lg:w-2/4 w-full h-60 flex justify-center items-center gap-3 flex-col "
        id="textarea"
      >
        <textarea
          name=""
          id=""
          cols="20"
          rows="4"
          maxLength={200}
          onChange={handleChanges}
          value={task}
          placeholder="Type here..."
          className="lg:w-full xl:w-3/4 w-5/6 md:w-3/4 h-2/4 text-xl p-2 border-2 border-black rounded-xl"
        >
          
        </textarea>
        <button onClick={submitTask} disabled={!user} className="bg-amber-400 hover:bg-amber-300 hover:text-black text-white p-3 lg:w-full xl:w-3/4 w-5/6 md:w-3/4 rounded-xl">
          Submit
        </button>
      </div>
<div id="center" className="xl:w-2/4 lg:w-3/4 sm:w-3/4 w-full h-10 flex  mt-10  mb-5 justify-center"> <div className="lg:w-2/4 w-5/6 h-full bg-black flex justify-center text-white text-xs md:text-sm lg:text-md items-center font-semibold"><h3>{user ? `Hi ${user.name}, Here is your list`:"Not signed in! Please Log in or Sign up"}</h3></div> </div>
      <div
        id="lists-div"
        className="lg:w-2/4 w-full flex flex-col items-center mb-32 gap-4 pt-5"
      >


      {taskArr.map((item,index)=>(
 
      
         <div key={index} id="list" className="lg:w-full xl:w-3/4 w-5/6 md:w-3/4 h-20 bg-slate-100 flex justify-between items-end">
          <div id="circle" className="w-10 sm:w-12 lg:w-16 xl:w-20 h-20 bg-amber-400 rounded-r-full flex justify-center items-center text-4xl lg:text-5xl font-sans font-bold"> <h1>{index+1}</h1></div>
          <div id="text" className="sm:w-3/4 w-3/4 h-20 text-sm flex justify-start items-center font-sans"> 
          <p>{item.task}</p></div>
          <div id="delBtn" className="w-6 lg:w-8 lg:h-8 h-6 bg-black flex justify-center items-center hover:cursor-pointer text-sm lg:text-xl font-sans hover:text-amber-400 text-white font-semibold" onClick={()=>{deleteBtn(item._id)}}> <h3>X</h3></div>
        </div>
    

      ))}
    
      
      </div>
      
    </div>
  );
}

export default Homepage;
