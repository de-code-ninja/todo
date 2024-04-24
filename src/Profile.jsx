import React from "react";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, signOut } = useContext(AuthContext);
  const navigate = useNavigate();
function logout(){
  signOut()
  navigate("/login");
}
  if (!user) {
    return <div className="font-semibold flex justify-center mt-4"><h3>Opps you're not signed in</h3></div>;

  }
  return (
    <div className="flex justify-center w-full pt-32 selection:bg-amber-400 ">
      <div className="lg:w-3/4 2xl:w-2/4 w-full h-3/4 flex justify-center items-center gap-3 flex-col">
        
        <div
          id="name"
          className="w-4/5 h-40 bg-slate-50 mb-24 drop-shadow-lg flex justify-center items-center font-sans font-bold text-3xl lg:text-4xl"
        >
          
          <h1>{user.name}</h1>
        </div>
        <div
          id="email"
          className="w-3/5 h-20 border-b-2 pb-1 flex justify-between gap-2 md:gap-0 flex-col md:flex-row items-center font-sans  text-x"
        >
          <div className="flex gap-4 text-xl">
          <h4 className="font-bold">Email:</h4>
          <p className="font-semibold">{user.email}</p></div>
          <button onClick={()=>alert("This feature is not available yet.")} className="w-64 md:w-56 h-14 bg-amber-400 font-semibold rounded-md hover:bg-black hover:text-orange-300">Change email</button>
        </div>
        <div
          id="task"
          className="w-3/5 h-20 border-b-2 pb-1 flex justify-between gap-2 md:gap-0 flex-col md:flex-row items-center font-sans text-x"
        >
          <div className="flex gap-4 text-x1">
          <h4 className="font-bold ">Total tasks saved:</h4>
          <p className="font-semibold ">0</p></div>
          <button onClick={()=> navigate("/")} className="w-64 md:w-56 h-14 bg-amber-400 font-semibold rounded-md hover:bg-black hover:text-orange-300">Add task</button>
        </div>
        <div
          id="buttons"
          className="w-3/5 h-20  mt-6 flex justify-between gap-2 md:gap-0 flex-col md:flex-row items-center font-sans text-x"
        >
          
          <button onClick={()=>logout()} className="w-64 md:w-56 h-14 bg-black text-white font-semibold hover:bg-zinc-700 rounded-md hover:text-white">Log out</button>
          <button onClick={()=>alert("This feature is not available yet.")} className="w-64 md:w-56 h-14 bg-amber-400  font-semibold hover:bg-black rounded-md hover:text-orange-300">Change password</button>
        </div>
      </div>
    </div> 
  );
}

export default Profile;
