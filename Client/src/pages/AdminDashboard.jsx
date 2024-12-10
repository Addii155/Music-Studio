import React,{useState} from 'react';
import AddSong from '../components/adminupload/AddSong';
import Addartist from '../components/adminupload/Addartist';
import Addalbum from '../components/adminupload/Addalbum';

const AdminDashboard = () => {
  const [activetab, setactivetab] = useState(0);
  
  const arr=[
    {
      tag:"add song",
      name:<AddSong/>,
    },
    {
      tag:"add artist",
      name:<Addartist/>,
    },
    {
      tag:"add album",
      name: <Addalbum/>,
    }
  ]

  return (
    <div className="p-6 text-black text-bold">
      <h1 className="text-3xl text-center text-white mb-4">Admin Dashboard</h1>
      <div>
        <div className="grid grid-cols-3 gap-4">
          {arr.map((item,index)=>
          <div className={`bg-gray-200 p-4 rounded-lg   cursor-pointer
           ${activetab===index ? "bg-green-400":"bg-gray-200"}`} key={index} onClick={()=>setactivetab(index)} >
            {item.tag}</div>  ) }
        
      </div>
      <div className="mt-4">
        {arr[activetab].name}
      </div>
    </div>
    </div>
  );
};

export default AdminDashboard;
