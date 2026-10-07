import PageIntro from "../components/PageIntro";
import NFTCard from "../components/NFTCard";
import { Check, LockKeyhole } from "lucide-react";
import { creators } from "../data";
import { useState } from "react";

export default function Profile(){
  const [following,setFollowing]=useState(creators.slice(0,4).map(c=>c.id));
  return <>
    <PageIntro title="Profile" subtitle="Welcome Profile Page"/>
    <section className="grid gap-7 lg:grid-cols-[380px_1fr]">
      <div className="surface p-5"><img src="/assets/papaya-avatar.jpg" alt="John Smith" className="h-11 w-11 rounded-full object-cover ring-2 ring-white"/><h2 className="mt-4 text-[18px] font-semibold">Welcome, John Smith</h2><p className="mt-1 text-[14px]">Looks like you are not verified yet. Verify yourself to use the full potential of Xtrader.</p><button className="mt-7 flex w-full items-center gap-3 border-b border-white/20 pb-4 text-left text-purple"><span className="grid h-8 w-8 place-items-center rounded-full bg-green-500 text-white"><Check size={18}/></span>Verify account</button><button className="flex w-full items-center gap-3 pt-4 text-left text-purple"><span className="grid h-8 w-8 place-items-center rounded-full bg-purple text-white"><LockKeyhole size={17}/></span>Two-factor Authentication ( 2FA )</button></div>
      <div><h2 className="mb-5 text-[18px] font-semibold">Following</h2><div className="grid gap-5 sm:grid-cols-2">{creators.slice(0,4).map(c=><div key={c.id} className="surface flex items-center gap-4 p-4 sm:p-5"><img src="/assets/papaya-avatar.jpg" alt="Papaya" className="h-11 w-11 rounded-full"/><div className="min-w-0 flex-1"><b>Papaya</b><p className="text-[13px]">60 Items</p></div><button onClick={()=>setFollowing(v=>v.includes(c.id)?v.filter(x=>x!==c.id):[...v,c.id])} className={`min-h-10 rounded-[8px] px-4 py-1.5 text-[13px] ${following.includes(c.id)?"red-btn":"rounded-[8px] border border-purple"}`}>{following.includes(c.id)?"Unfollow":"Follow"}</button></div>)}</div></div>
    </section>
    <h2 className="mt-12 mb-6 text-[18px] font-semibold">My bought</h2><div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{[0,1,2,3].map(i=><NFTCard key={i}/>)}</div>
    <h2 className="mt-12 mb-6 text-[18px] font-semibold">My Collections</h2><div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{[0,1,2,3].map(i=><NFTCard key={i}/>)}</div>
  </>;
}
