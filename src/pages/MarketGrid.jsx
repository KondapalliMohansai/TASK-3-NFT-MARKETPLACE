import PageIntro from "../components/PageIntro";
import NFTCard from "../components/NFTCard";
import { nftImages } from "../data";
import { useMemo, useState } from "react";

export default function MarketGrid({title, subtitle}) {
  const [tab,setTab]=useState("All");
  const [query,setQuery]=useState("");
  const items=useMemo(()=>nftImages.map((image,i)=>({image,title:"Liquid Wave",category:i%3===0?"Book":"Artwork"})).filter(x=>(tab==="All"||x.category===tab)&&x.title.toLowerCase().includes(query.toLowerCase())),[tab,query]);
  return <>
    <PageIntro title={title} subtitle={subtitle}/>
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      {title==="Collections" ? <div className="flex gap-2 text-[14px]">{["All","Artwork","Book"].map(t=><button key={t} onClick={()=>setTab(t)} className={tab===t?"rounded-full bg-purple px-4 py-1":"rounded-full px-2 py-1 hover:bg-white/5"}>{t}</button>)}</div> : <span/>}
      <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Filter items" className="h-10 w-full max-w-[180px] rounded-lg bg-[#1c1937] px-3 text-sm outline-none focus:ring-2 focus:ring-purple/60"/>
    </div>
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{items.map((item,i)=><NFTCard key={i} image={item.image} title={item.title}/>)}</div>
  </>;
}
