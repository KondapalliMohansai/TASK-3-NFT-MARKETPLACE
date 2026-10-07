import { FileChartColumn, WalletCards, CheckSquare } from "lucide-react";
import PageIntro from "../components/PageIntro";
import StatCard from "../components/StatCard";
import { bids } from "../data";
import { useState } from "react";

export default function Bids() {
  const [rows,setRows] = useState(bids);
  const [selected,setSelected] = useState([]);
  const toggle=(i)=>setSelected(v=>v.includes(i)?v.filter(x=>x!==i):[...v,i]);
  const removeSelected=()=>setRows(rs=>rs.filter((_,i)=>!selected.includes(i)));
  return <>
    <PageIntro title="Bids" subtitle="Welcome Bids Page"/>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard value="24K" label="Artworks" icon={FileChartColumn}/><StatCard value="82K" label="Auction" icon={WalletCards} tone="green"/><StatCard value="200" label="Creators" icon={FileChartColumn} tone="yellow"/><StatCard value="89" label="Cancelled" icon={FileChartColumn} tone="red"/></div>
    <div className="mt-10 flex flex-wrap items-center justify-between gap-3"><h2 className="text-[22px] font-semibold">Active Bids</h2><div className="flex gap-2"><button onClick={()=>setRows(rs=>[...rs,...bids.slice(0,1)])} className="purple-btn min-h-10 px-5">Place a Bid</button>{selected.length>0&&<button onClick={removeSelected} className="red-btn min-h-10 px-5">Remove selected</button>}</div></div>
    <div className="mt-7 overflow-x-auto pb-2"><div className="min-w-[930px]">
      <div className="grid grid-cols-[55px_2.2fr_1fr_1fr_1.3fr_1.2fr_40px] border-b border-white/10 pb-4 text-[13px] font-semibold"><span><button aria-label="Select all" onClick={()=>setSelected(selected.length===rows.length?[]:rows.map((_,i)=>i))}>{selected.length===rows.length&&rows.length?"☑":"□"}</button></span><span>Item List</span><span>Open Price</span><span>Your Offer</span><span>Recent Offer</span><span>Time Left</span><span>Action</span></div>
      <div className="space-y-4 pt-6">{rows.map((r,i)=><div key={`${r.title}-${i}`} className={`grid grid-cols-[55px_2.2fr_1fr_1fr_1.3fr_1.2fr_40px] items-center rounded-[17px] px-3 py-3 text-[13px] ${selected.includes(i)?"bg-[#292349] ring-1 ring-purple/40":"bg-panel"}`}>
        <span><button aria-label={`Select ${r.title}`} onClick={()=>toggle(i)} className="text-lg">{selected.includes(i)?"☑":"□"}</button></span>
        <div className="flex items-center gap-3"><img src={r.art} alt={r.title} className="h-11 w-[63px] rounded-full object-cover"/><div><b>{r.title}</b><p>John Abraham</p></div></div>
        <span>0.0025 ETH</span><span>0.0025 ETH</span><span className="flex items-center gap-2"><img src="/assets/bid-avatar.jpg" alt="Bidder" className="h-10 w-10 rounded-full"/><span>0.0025 ETH</span></span><span>2 Hours 1 min 30s</span><button aria-label={`Remove ${r.title}`} onClick={()=>setRows(rs=>rs.filter((_,idx)=>idx!==i))} className="text-xl hover:text-red">×</button>
      </div>)}</div>
      {!rows.length&&<div className="surface mt-5 p-10 text-center text-sm text-[#9b96b7]"><CheckSquare className="mx-auto mb-3 text-purple"/>No active bids.</div>}
    </div></div>
  </>;
}
