import { motion } from "framer-motion";
import { useState } from "react";

export default function NFTCard({ image="/assets/nft-liquid-wave.jpg", title="Liquid Wave", showBid=true }) {
  const [liked, setLiked] = useState(false);
  const [bidPlaced, setBidPlaced] = useState(false);
  return (
    <motion.article whileHover={{y:-4}} transition={{duration:.18}} className="surface group relative min-w-0 p-4 sm:p-5">
      <button aria-label={liked ? "Remove from saved" : "Save item"} onClick={() => setLiked(v=>!v)} className={`absolute right-7 top-7 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/35 text-lg backdrop-blur ${liked ? "text-pink-400" : "text-white/70"}`}>{liked ? "♥" : "♡"}</button>
      <img src={image} alt={title} className="aspect-square w-full rounded-[17px] object-cover" />
      <h3 className="mt-5 text-[17px] font-semibold sm:text-[18px]">{title}</h3>
      {showBid && <>
        <div className="mt-3 grid grid-cols-2 gap-2 text-[13px] sm:text-[14px]"><span>Auction time</span><span className="text-right">Current Bid</span></div>
        <div className="mt-1 grid grid-cols-2 gap-2 text-[14px]"><span className="muted">3h 1m 50s</span><span className="text-right"><span className="block text-purple">0.05 ETH</span><span className="block muted">0.15 ETH</span></span></div>
        <button onClick={() => setBidPlaced(v=>!v)} className="purple-btn mt-5 min-h-[42px] w-full px-3 text-[13px] sm:text-[14px]">{bidPlaced ? "Bid Placed ✓" : "Place a Bid"}</button>
      </>}
    </motion.article>
  );
}
