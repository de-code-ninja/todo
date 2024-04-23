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
    console.log("Fetching data for user:", user);
    const response = await fetch(`https://todobackend-suuw.onrender.com/api/get/data/${user._id}`);
    const data = await response.json();
    console.log(data);
    
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
    console.log("Data sent successfully");
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
        console.log("Id sent successfully");
        fetchData();
      } else {
        console.error("Failed to send data");
      }
  }
  catch(err){
        console.log(err);
  }

console.log(id);
}

  return (
    <div className="flex items-center flex-col mt-8  drop-shadow-md selection:bg-amber-400 selection:text-black">
      <div
        className="w-2/4 h-60 flex justify-center items-center gap-3 flex-col "
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
          className="w-3/4 h-2/4 text-xl p-2 border-2 border-black rounded-xl"
        >
          
        </textarea>
        <button onClick={submitTask} disabled={!user} className="bg-amber-400 hover:bg-amber-300 hover:text-black text-white p-3 w-3/4 rounded-xl">
          Submit
        </button>
      </div>
<div id="center" className="w-2/4 h-10 flex  mt-10  mb-5 justify-center"> <div className="w-2/4 h-full bg-black flex justify-center text-white items-center font-semibold"><h3>{user ? `Hi ${user.name}, Here is your list`:"Not signed in! Please Log in or Sign up"}</h3></div> </div>
      <div
        id="lists-div"
        className="w-2/4 flex flex-col items-center mb-32 gap-4 pt-5"
      >

      
      {taskArr.map((item,index)=>(
 
      
         <div key={index} id="list" className="w-3/4 h-20 bg-slate-100 flex justify-between items-end">
          <div id="circle" className="w-20 h-20 bg-amber-400 rounded-r-full flex justify-center items-center text-5xl font-sans font-bold"> <h1>{index+1}</h1></div>
          <div id="text" className="w-3/4 h-20  flex justify-start items-center font-sans"> 
          <p>{item.task}</p></div>
          <div id="delBtn" className="w-8 h-8 bg-black flex justify-center items-center hover:cursor-pointer text-1xl font-sans hover:text-amber-400 text-white font-semibold" onClick={()=>{deleteBtn(item._id)}}> <h3>X</h3></div>
        </div>
    

      ))}
    
      
      </div>
      
    </div>
  );
}

export default Homepage;
