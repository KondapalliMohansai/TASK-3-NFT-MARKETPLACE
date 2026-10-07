import { FileChartColumn, WalletCards } from "lucide-react";
import { nftImages, activities, creators } from "../data";
import NFTCard from "../components/NFTCard";
import StatCard from "../components/StatCard";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

function Hero(){
  const [notice,setNotice]=useState("");
  return <section className="grid gap-4 lg:grid-cols-[1.45fr_1.2fr]">
    <div className="relative min-h-[250px] overflow-hidden rounded-[20px] bg-cover bg-center p-6 sm:p-8" style={{backgroundImage:"linear-gradient(90deg,rgba(57,35,144,.35),rgba(91,39,191,.15)),url('/assets/hero-bg-clean.jpg')"}}>
      <div className="relative z-10 max-w-[560px]">
        <h1 className="text-[25px] font-semibold leading-[1.35] sm:text-[28px]">Discover, Collect, Sell<br/>and Create your NFT</h1>
        <p className="mt-2 max-w-[600px] text-[14px] text-[#d0cbe2] sm:text-[15px]">Digital marketplace for crypto collectibles and non fungible tokens</p>
        <div className="mt-7 flex flex-wrap gap-3 sm:gap-5"><button onClick={()=>setNotice("Explore selected") } className="purple-btn h-[42px] w-[133px]">Explore</button><button onClick={()=>setNotice("Create selected")} className="red-btn h-[42px] w-[133px]">Create</button></div>
      </div>
      {notice && <button onClick={()=>setNotice("")} className="absolute bottom-3 left-6 text-xs text-white/70">{notice} · dismiss</button>}
    </div>
    <div className="surface flex min-h-[250px] flex-col gap-4 p-4 sm:flex-row sm:p-5">
      <img src="/assets/featured-nft.jpg" alt="Brighten LQ" className="h-[180px] w-full rounded-[18px] object-cover sm:h-[188px] sm:w-[44%]" />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2"><img src="/assets/papaya-avatar.jpg" alt="John Abraham" className="h-8 w-8 rounded-full object-cover"/><span className="truncate text-sm font-semibold">John Abraham</span><span className="text-green-400">•</span></div>
        <h3 className="mt-3 text-[18px] font-semibold">Brighten LQ</h3>
        <div className="mt-1 grid grid-cols-2 gap-2 text-[13px] sm:text-[14px]"><span>Auction time<br/><span className="muted">3h 1m 50s</span></span><span>Current Bid : <span className="text-purple">0.05 ETH</span><br/><span className="muted">0.15 ETH</span></span></div>
        <div className="mt-auto grid grid-cols-2 gap-3 pt-4"><button onClick={()=>setNotice("Bid placed on Brighten LQ")} className="purple-btn min-h-[42px]">Place a Bid</button><button onClick={()=>setNotice("Brighten LQ details opened")} className="red-btn min-h-[42px]">Details</button></div>
      </div>
    </div>
  </section>
}

export default function Home(){
  const [tab,setTab]=useState("All");
  const [params]=useSearchParams();
  const query=(params.get("q")||"").toLowerCase();
  const filtered=useMemo(()=>nftImages.map((img,i)=>({img,title:i%2?"Liquid Wave":"Liquid Wave"})).filter(x=>!query || x.title.toLowerCase().includes(query)),[query]);
  const [followed,setFollowed]=useState([]);
  const toggleFollow=id=>setFollowed(v=>v.includes(id)?v.filter(x=>x!==id):[...v,id]);
  return <>
    <Hero/>
    <section className="mt-12 sm:mt-[68px]">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><h2 className="text-[18px] font-semibold">Trending Bids</h2><div className="flex gap-2 text-[13px] sm:gap-3 sm:text-[14px]">{["All","Artwork","Book"].map(t=><button key={t} onClick={()=>setTab(t)} className={tab===t?"rounded-full bg-purple px-4 py-1":"rounded-full px-2 py-1 text-white/80 hover:bg-white/5"}>{t}</button>)}</div></div>
      {query && <p className="mb-4 text-sm text-purple">Search: {query}</p>}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{filtered.map((x,i)=><NFTCard key={i} image={x.img} title={x.title}/>)}</div>
      {!filtered.length && <div className="surface p-8 text-center text-sm text-[#9b96b7]">No NFTs found.</div>}
    </section>
    <section id="home-scroll-stats" className="mt-12 grid gap-6 md:grid-cols-[minmax(200px,.8fr)_minmax(320px,1.8fr)_minmax(240px,1fr)]">
      <div><h2 className="mb-5 text-[18px] font-semibold">Trending Bids</h2><div className="space-y-4"><StatCard value="24K" label="Artworks" change="+168.001%" icon={WalletCards}/><StatCard value="89" label="Auction" change="-168.001%" icon={FileChartColumn} tone="red"/><StatCard value="82K" label="Creators" change="+168.001%" icon={WalletCards} tone="green"/></div></div>
      <div><h2 className="mb-5 text-[18px] font-semibold">ETH Price</h2><div className="surface relative min-h-[248px] overflow-hidden p-3 sm:p-4"><div className="absolute left-3 top-8 flex h-[170px] flex-col justify-between text-[10px] text-[#7048f4]/70 sm:left-4"><span>350</span><span>300</span><span>250</span><span>200</span><span>150</span><span>100</span><span>50</span><span>0</span></div><svg viewBox="0 0 620 300" className="ml-4 h-[220px] w-[calc(100%-16px)] sm:h-[230px]"><path d="M20 280 L95 165 L170 185 L245 130 L320 145 L395 90 L470 155 L545 185 L610 130 L610 280 Z" fill="rgba(112,72,244,.12)"/><polyline points="20,280 95,165 170,185 245,130 320,145 395,90 470,155 545,185 610,130" fill="none" stroke="#7048f4" strokeWidth="4"/>{[[20,280],[95,165],[170,185],[245,130],[320,145],[395,90],[470,155],[545,185],[610,130]].map(([x,y])=><circle key={`${x}-${y}`} cx={x} cy={y} r="7" fill="#7048f4"/>)}</svg></div></div>
      <div><h2 className="mb-5 text-[18px] font-semibold">Statistics</h2><div className="surface flex min-h-[248px] flex-col items-center justify-center overflow-hidden"><div className="relative h-[170px] w-[170px] rounded-full border-2 border-white" style={{background:"conic-gradient(#7048f4 0deg 180deg,#1c1937 180deg 360deg)"}}><div className="absolute inset-[20px] rounded-full border-2 border-white bg-[#1c1937]"></div><div className="absolute left-1/2 top-0 h-1/2 w-[2px] -translate-x-1/2 bg-white"></div><div className="absolute bottom-0 left-1/2 h-1/2 w-[2px] -translate-x-1/2 bg-white"></div></div><div className="mt-4 flex flex-wrap justify-center gap-3 text-[11px] text-[#7a7691]"><span><i className="mr-2 inline-block h-4 w-4 rounded-full bg-purple align-middle"/>Artwork Sold</span><span><i className="mr-2 inline-block h-4 w-4 rounded-full border border-white align-middle"/>Artwork Cancel</span></div></div></div>
    </section>
    <section className="mt-9 grid gap-6 lg:grid-cols-[315px_minmax(0,1fr)]">
      <div><div className="mb-5 flex justify-between"><h2 className="text-[18px] font-semibold">Recent Activity</h2><button className="text-purple">See more</button></div><div className="surface overflow-hidden">{activities.map((a,i)=><div key={i} className="flex min-h-[60px] items-center gap-3 border-b border-white/10 px-3.5 py-2.5 last:border-0"><img src="/assets/papaya-avatar.jpg" alt="Papaya" className="h-8 w-8 shrink-0 rounded-full object-cover"/><div className="min-w-0 flex-1"><b>Papaya</b><p className="truncate text-[12px] sm:text-[13px]">{a}</p></div><span className="hidden text-[12px] muted sm:block">12 mins ago</span></div>)}</div></div>
      <div><h2 className="mb-5 text-[18px] font-semibold">Top Creators</h2><div className="grid gap-3.5 sm:grid-cols-2">{creators.map(c=><div key={c.id} className="surface flex min-h-[59px] items-center gap-3 px-3.5 py-2"><img src="/assets/papaya-avatar.jpg" alt="Papaya" className="h-8 w-8 shrink-0 rounded-full object-cover"/><div className="min-w-0 flex-1"><b>{c.name}</b><p className="text-[13px]">{c.items}</p></div><button onClick={()=>toggleFollow(c.id)} className={`rounded-[8px] border px-3 py-1 text-[12px] font-semibold sm:px-5 sm:text-[13px] ${followed.includes(c.id)?"border-red text-red":"border-purple"}`}>{followed.includes(c.id)?"Following":"Follow"}</button></div>)}</div></div>
    </section>
  </>
}
