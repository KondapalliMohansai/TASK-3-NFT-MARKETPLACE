import PageIntro from "../components/PageIntro";
import { useState } from "react";

const tabs=["Profile","Application","Security","Activity","Payment Method","API"];

export default function Settings(){
  const [active,setActive]=useState("Profile");
  const [saved,setSaved]=useState(false);
  const [form,setForm]=useState({name:"John Smith",email:"",password:"",info:["","","","","",""]});
  const save=()=>{setSaved(true);setTimeout(()=>setSaved(false),2200)};
  const setInfo=(i,value)=>setForm(f=>({...f,info:f.info.map((x,idx)=>idx===i?value:x)}));
  return <>
    <PageIntro title="Setting" subtitle="Welcome Setting Page"/>
    <div className="mb-10 flex gap-5 overflow-x-auto pb-2 text-[14px] whitespace-nowrap sm:gap-7">{tabs.map(t=><button key={t} onClick={()=>setActive(t)} className={active===t?"text-purple":"text-white/80 hover:text-white"}>{t}</button>)}</div>
    {active!=="Profile" ? <div className="surface p-6 sm:p-8"><h2 className="text-[20px] font-semibold">{active}</h2><p className="mt-2 max-w-2xl text-sm text-[#9b96b7]">{active} settings are ready for configuration. This interactive tab is selected and can be connected to your API when backend data is available.</p><button onClick={save} className="purple-btn mt-6 min-h-10 px-6">Save {active}</button></div> : <>
      <div className="grid gap-7 lg:grid-cols-2">
        <div><h2 className="mb-4 text-[18px] font-semibold">User profile</h2><div className="surface p-5"><label className="text-[14px] font-semibold">Full Name<input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} className="mt-2 h-11 w-full rounded-lg bg-ink px-4 outline-none focus:ring-2 focus:ring-purple/60"/></label><div className="mt-5 flex items-center gap-3"><img src="/assets/papaya-avatar.jpg" alt="John Smith" className="h-14 w-14 rounded-full object-cover"/><div><b>{form.name || "John Smith"}</b><p className="text-[13px]">Welcome Setting Page</p></div></div><button onClick={save} className="purple-btn mt-5 min-h-10 px-7">Save</button></div></div>
        <div><h2 className="mb-4 text-[18px] font-semibold">Update Profile</h2><div className="surface p-5"><label className="text-[14px] font-semibold">Email<input value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} type="email" className="mt-2 h-11 w-full rounded-lg bg-ink px-4 outline-none focus:ring-2 focus:ring-purple/60"/></label><label className="mt-3 block text-[14px] font-semibold">Password<input value={form.password} onChange={e=>setForm(f=>({...f,password:e.target.value}))} type="password" className="mt-2 h-11 w-full rounded-lg bg-ink px-4 outline-none focus:ring-2 focus:ring-purple/60"/></label><button onClick={save} className="purple-btn mt-5 min-h-10 px-7">Save</button></div></div>
      </div>
      <h2 className="mb-4 mt-12 text-[18px] font-semibold">Personal Information</h2><div className="surface grid gap-5 p-5 md:grid-cols-2">{form.info.map((value,i)=><label key={i} className="text-[14px] font-semibold">Info<input value={value} onChange={e=>setInfo(i,e.target.value)} className="mt-2 h-11 w-full rounded-lg bg-ink px-4 outline-none focus:ring-2 focus:ring-purple/60"/></label>)}<button onClick={save} className="purple-btn min-h-10 w-fit px-7">Save</button></div>
    </>}
    {saved&&<div role="status" className="fixed bottom-20 right-4 z-50 rounded-lg bg-[#272244] px-5 py-3 text-sm shadow-xl md:bottom-5">Changes saved.</div>}
  </>;
}
