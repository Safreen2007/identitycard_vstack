import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

import whiteCard  from "./cards/white.png";
import purpleCard from "./cards/purple.png";
import pinkCard   from "./cards/pink.png";
import blueCard   from "./cards/blue.png";
import greenCard  from "./cards/green.png";

const CARDS = [
  { key:"white",  name:"Royal Pop White / Base",   img:whiteCard,  numCol:"rgba(40,35,30,0.45)",  amb:"#b0a898", ring:"rgba(80,70,60,0.55)",   shimmer:"rgba(255,255,255,0.5)",   shadowColor:"rgba(160,150,140,0.35)" },
  { key:"purple", name:"Royal Pop Purple / 2582C", img:purpleCard, numCol:"rgba(60,30,110,0.5)",  amb:"#8860c8", ring:"rgba(130,80,210,0.65)",  shimmer:"rgba(210,190,255,0.38)",  shadowColor:"rgba(100,60,200,0.3)"   },
  { key:"pink",   name:"Royal Pop Pink / 211C",    img:pinkCard,   numCol:"rgba(160,40,80,0.48)", amb:"#d05070", ring:"rgba(220,70,100,0.65)",  shimmer:"rgba(255,200,220,0.38)",  shadowColor:"rgba(200,80,120,0.3)"   },
  { key:"blue",   name:"Royal Pop Blue / 2726C",   img:blueCard,   numCol:"rgba(10,55,130,0.48)", amb:"#2068c8", ring:"rgba(30,90,210,0.65)",   shimmer:"rgba(180,215,255,0.38)",  shadowColor:"rgba(30,100,220,0.3)"   },
  { key:"green",  name:"Royal Pop Green / 361C",   img:greenCard,  numCol:"rgba(10,70,30,0.48)",  amb:"#22a050", ring:"rgba(25,130,65,0.65)",   shimmer:"rgba(180,240,200,0.38)",  shadowColor:"rgba(20,140,70,0.3)"    },
];

function NFCScreen({ onTap }) {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,scale:1.04}} onClick={onTap}
      style={{position:"fixed",inset:0,background:"#080810",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",userSelect:"none",fontFamily:"'Outfit',sans-serif"}}>
      <motion.div animate={{scale:[1,1.18,1],opacity:[0.8,1,0.8]}} transition={{duration:3,repeat:Infinity,ease:"easeInOut"}}
        style={{position:"absolute",width:340,height:340,borderRadius:"50%",background:"radial-gradient(circle,rgba(120,80,220,0.2) 0%,transparent 70%)",top:"50%",left:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none"}}/>
      <div style={{position:"relative",width:150,height:150,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:44}}>
        {[0,1,2].map(i=>(
          <motion.div key={i} animate={{scale:[0.45,2.5],opacity:[0.85,0]}} transition={{duration:2.4,repeat:Infinity,delay:i*0.7,ease:"easeOut"}}
            style={{position:"absolute",width:72,height:72,borderRadius:"50%",border:"1.8px solid rgba(140,100,255,0.55)"}}/>
        ))}
        <div style={{width:70,height:70,borderRadius:"50%",background:"linear-gradient(135deg,#9060e0,#5030b0)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 30px rgba(120,80,220,0.55)",zIndex:1}}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.4" opacity="0.4"/>
            <circle cx="12" cy="12" r="6.5" stroke="white" strokeWidth="1.4" opacity="0.7"/>
            <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="1.4" opacity="0.9"/>
            <circle cx="12" cy="12" r="1.3" fill="white"/>
          </svg>
        </div>
      </div>
      <div style={{textAlign:"center",zIndex:1}}>
        <div style={{fontSize:10,letterSpacing:"0.26em",textTransform:"uppercase",color:"rgba(255,255,255,0.3)",marginBottom:12,fontWeight:500}}>FSCHOOL AI</div>
        <div style={{fontSize:23,fontWeight:700,color:"rgba(255,255,255,0.88)",marginBottom:10,letterSpacing:"-0.02em"}}>Tap your card</div>
        <div style={{fontSize:13,color:"rgba(255,255,255,0.4)"}}>Hold NFC card near device</div>
      </div>
      <div style={{position:"absolute",bottom:44,fontSize:10,color:"rgba(255,255,255,0.18)",letterSpacing:"0.14em",textTransform:"uppercase"}}>Click anywhere to simulate</div>
    </motion.div>
  );
}

function NFCOverlay({ card, onClose }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Scanning\u2026");
  const [done, setDone] = useState(false);

  useState(() => {
    const steps = [
      {pct:28,  text:"Card detected\u2026",     delay:1000},
      {pct:56,  text:"Reading card data\u2026",  delay:2100},
      {pct:82,  text:"Verifying identity\u2026", delay:3200},
      {pct:100, text:"\u2713 Authenticated",     delay:4300},
    ];
    const timers = steps.map(s=>setTimeout(()=>{
      setProgress(s.pct); setStatusText(s.text);
      if(s.pct===100){setDone(true);setTimeout(onClose,1900);}
    },s.delay));
    return ()=>timers.forEach(clearTimeout);
  });

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      style={{position:"fixed",inset:0,zIndex:999,background:"rgba(8,8,16,0.97)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:"'Outfit',sans-serif"}}>
      <div style={{fontSize:9,letterSpacing:"0.22em",textTransform:"uppercase",color:"rgba(255,255,255,0.26)",marginBottom:30}}>FSCHOOL AI · NFC ACTIVATION</div>
      <div style={{position:"relative",width:160,height:160,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:30}}>
        <div style={{width:54,height:90,borderRadius:9,border:"2.5px solid rgba(255,255,255,0.55)",background:"rgba(255,255,255,0.05)",position:"relative",zIndex:2}}>
          <div style={{position:"absolute",top:7,left:"50%",transform:"translateX(-50%)",width:14,height:2.5,borderRadius:2,background:"rgba(255,255,255,0.35)"}}/>
          <div style={{position:"absolute",bottom:6,left:"50%",transform:"translateX(-50%)",width:18,height:18,borderRadius:"50%",border:"1.5px solid rgba(255,255,255,0.22)"}}/>
        </div>
        <div style={{position:"absolute",right:-20,top:"50%",transform:"translateY(-50%) rotate(12deg)",width:54,height:34,borderRadius:7,overflow:"hidden",zIndex:3,border:"1.5px solid rgba(255,255,255,0.3)",boxShadow:"0 6px 20px rgba(0,0,0,0.5)"}}>
          <img src={card.img} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
        </div>
        {[0,0.65,1.3].map((delay,i)=>(
          <motion.div key={i} animate={{scale:[0.5,2.6],opacity:[0.85,0]}} transition={{duration:2.1,repeat:Infinity,delay,ease:"easeOut"}}
            style={{position:"absolute",top:"50%",left:"50%",width:60,height:60,borderRadius:"50%",border:`1.8px solid ${card.ring}`,transform:"translate(-50%,-50%)"}}/>
        ))}
      </div>
      <div style={{fontSize:21,fontWeight:700,color:"rgba(255,255,255,0.9)",marginBottom:8,letterSpacing:"-0.02em",textAlign:"center"}}>
        {done?"Card Activated":"Hold Near Reader"}
      </div>
      <div style={{fontSize:13,color:"rgba(255,255,255,0.36)",marginBottom:36,textAlign:"center",maxWidth:240,lineHeight:1.7}}>
        {done?"Identity verified. Welcome, Alex Chen.":"Keep your FSchool AI card near the top of your iPhone"}
      </div>
      <div style={{width:230,height:3,background:"rgba(255,255,255,0.1)",borderRadius:2,overflow:"hidden",marginBottom:10}}>
        <motion.div animate={{width:`${progress}%`}} transition={{duration:0.45,ease:"easeOut"}} style={{height:"100%",background:"white",borderRadius:2}}/>
      </div>
      <div style={{fontSize:11,color:"rgba(255,255,255,0.38)",letterSpacing:"0.06em",marginBottom:34}}>{statusText}</div>
      <button onClick={onClose} style={{background:"rgba(255,255,255,0.06)",border:"0.5px solid rgba(255,255,255,0.12)",color:"rgba(255,255,255,0.55)",fontFamily:"'Outfit',sans-serif",fontSize:13,padding:"12px 32px",borderRadius:10,cursor:"pointer"}}>Cancel</button>
    </motion.div>
  );
}

function Card3D({ card, onNFC }) {
  const sceneRef = useRef(null);
  const [tilt, setTilt] = useState({x:12,y:-8});
  const [mouse, setMouse] = useState({x:0.3,y:0.25});
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = useCallback((e)=>{
    const r=sceneRef.current.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width;
    const y=(e.clientY-r.top)/r.height;
    setTilt({x:12-(y-0.5)*2*15,y:-8+(x-0.5)*2*17});
    setMouse({x,y});
  },[]);
  const handleMouseLeave = useCallback(()=>{setTilt({x:12,y:-8});setMouse({x:0.3,y:0.25});setHovering(false);},[]);
  const handleMouseEnter = useCallback(()=>setHovering(true),[]);
  const handleTouchMove = useCallback((e)=>{
    e.preventDefault();
    const r=sceneRef.current.getBoundingClientRect();
    const t=e.touches[0];
    const x=(t.clientX-r.left)/r.width;
    const y=(t.clientY-r.top)/r.height;
    setTilt({x:12-(y-0.5)*2*12,y:-8+(x-0.5)*2*14});
    setMouse({x,y});
  },[]);

  const specX=mouse.x*100;
  const specY=mouse.y*100;
  const shadowX=(tilt.y/17)*18;
  const shadowY=(-tilt.x/15)*14+22;
  const shadowBlur=hovering?85:65;

  return (
    <div ref={sceneRef}
      style={{width:368,height:232,perspective:1100,margin:"16px auto 22px",position:"relative"}}
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}
      onTouchMove={handleTouchMove} onTouchEnd={handleMouseLeave}>
      <motion.div
        animate={{rotateX:tilt.x,rotateY:tilt.y,scale:hovering?1.025:1}}
        transition={{type:"spring",stiffness:260,damping:26,mass:0.75}}
        style={{width:"100%",height:"100%",transformStyle:"preserve-3d",borderRadius:22,cursor:"grab",position:"relative"}}>

        {/* Card face */}
        <div style={{
          position:"absolute",inset:0,borderRadius:22,overflow:"hidden",
          boxShadow:`
            ${shadowX}px ${shadowY}px ${shadowBlur}px -8px rgba(0,0,0,0.88),
            ${shadowX*0.5}px ${shadowY*0.5}px 40px -10px ${card.shadowColor},
            0 2px 0 rgba(255,255,255,0.72) inset,
            0 -1px 0 rgba(0,0,0,0.07) inset,
            ${shadowX*0.3}px ${shadowY*0.3+10}px 52px -5px rgba(0,0,0,0.58)
          `,
          transition:"box-shadow 0.12s ease",
        }}>
          <img src={card.img} alt={card.name} style={{width:"100%",height:"100%",objectFit:"cover",display:"block",borderRadius:22}}/>

          {/* Base shimmer */}
          <div style={{position:"absolute",inset:0,borderRadius:22,pointerEvents:"none",zIndex:3,
            background:`linear-gradient(130deg,${card.shimmer} 0%,rgba(255,255,255,0.05) 45%,transparent 70%,rgba(255,255,255,0.03) 100%)`}}/>

          {/* Moving specular gloss spot */}
          <div style={{position:"absolute",inset:0,borderRadius:22,pointerEvents:"none",zIndex:4,
            background:`radial-gradient(ellipse 50% 38% at ${specX}% ${specY}%,rgba(255,255,255,0.34) 0%,rgba(255,255,255,0.09) 40%,transparent 70%)`,
            transition:"background 0.04s linear"}}/>

          {/* Opposite secondary gloss */}
          <div style={{position:"absolute",inset:0,borderRadius:22,pointerEvents:"none",zIndex:3,
            background:`radial-gradient(ellipse 38% 28% at ${100-specX}% ${100-specY}%,rgba(255,255,255,0.09) 0%,transparent 60%)`,
            transition:"background 0.04s linear"}}/>

          {/* Top rim */}
          <div style={{position:"absolute",top:0,left:0,right:0,height:1.5,borderRadius:"22px 22px 0 0",background:"linear-gradient(90deg,transparent 4%,rgba(255,255,255,0.9) 50%,transparent 96%)",zIndex:6}}/>

          {/* Left edge rim */}
          <div style={{position:"absolute",top:8,left:0,bottom:8,width:1.5,background:"linear-gradient(180deg,transparent,rgba(255,255,255,0.45),transparent)",zIndex:6}}/>

          {/* Inner vignette */}
          <div style={{position:"absolute",inset:0,borderRadius:22,pointerEvents:"none",zIndex:5,boxShadow:"inset 0 0 40px rgba(0,0,0,0.08)"}}/>

          {/* Card number */}
          <div style={{position:"absolute",bottom:15,left:0,right:0,display:"flex",justifyContent:"center",zIndex:7,pointerEvents:"none"}}>
            <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:10,letterSpacing:"0.2em",fontWeight:500,color:card.numCol,textShadow:"0 1px 2px rgba(255,255,255,0.3)"}}>
              AF05 &nbsp;0000 &nbsp;0005 &nbsp;5301
            </span>
          </div>

          {/* NFC icon */}
          <div onClick={onNFC} style={{position:"absolute",left:16,bottom:11,cursor:"pointer",zIndex:8,opacity:0.35,color:card.numCol}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.4" opacity="0.4"/>
              <circle cx="12" cy="12" r="6.5" stroke="currentColor" strokeWidth="1.4" opacity="0.65"/>
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" opacity="0.85"/>
              <circle cx="12" cy="12" r="1.2" fill="currentColor"/>
            </svg>
          </div>
        </div>

        {/* Depth edges */}
        <div style={{position:"absolute",right:-10,top:12,bottom:12,width:10,borderRadius:"0 6px 6px 0",background:"linear-gradient(180deg,rgba(0,0,0,0.09),rgba(0,0,0,0.27),rgba(0,0,0,0.09))",zIndex:-1}}/>
        <div style={{position:"absolute",bottom:-9,left:12,right:12,height:9,borderRadius:"0 0 6px 6px",background:"linear-gradient(90deg,rgba(0,0,0,0.12),rgba(0,0,0,0.3),rgba(0,0,0,0.12))",zIndex:-1}}/>
        <div style={{position:"absolute",bottom:-9,right:-10,width:10,height:9,borderRadius:"0 0 6px 0",background:"rgba(0,0,0,0.2)",zIndex:-1}}/>
      </motion.div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen]         = useState("nfc");
  const [activeCard, setActiveCard] = useState(0);
  const [showNFC, setShowNFC]       = useState(false);
  const card = CARDS[activeCard];

  return (
    <div style={{minHeight:"100vh",background:"#0a0a12",fontFamily:"'Outfit',sans-serif"}}>
      <AnimatePresence mode="wait">
        {screen==="nfc" ? (
          <NFCScreen key="nfc" onTap={()=>setScreen("card")}/>
        ) : (
          <motion.div key="card" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:0.5,ease:"easeOut"}}
            style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-start",padding:"30px 16px 44px",position:"relative",overflow:"hidden"}}>

            {/* Ambient orbs */}
            <motion.div animate={{background:card.amb}} transition={{duration:0.85,ease:"easeInOut"}}
              style={{position:"absolute",width:480,height:480,borderRadius:"50%",filter:"blur(100px)",top:-150,left:-120,opacity:0.14,pointerEvents:"none"}}/>
            <motion.div animate={{background:card.amb}} transition={{duration:0.85,ease:"easeInOut"}}
              style={{position:"absolute",width:360,height:360,borderRadius:"50%",filter:"blur(100px)",bottom:-100,right:-90,opacity:0.1,pointerEvents:"none"}}/>

            {/* Header */}
            <div style={{textAlign:"center",marginBottom:4}}>
              <div style={{fontSize:9,letterSpacing:"0.28em",textTransform:"uppercase",color:"rgba(255,255,255,0.2)"}}>FSCHOOL AI</div>
              <div style={{fontSize:17,fontWeight:700,color:"rgba(255,255,255,0.72)",letterSpacing:"-0.01em",marginTop:5}}>Identity Card</div>
            </div>

            <Card3D card={card} onNFC={()=>setShowNFC(true)}/>

            {/* Palette */}
            <div style={{fontSize:9,letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(255,255,255,0.26)",marginBottom:11,textAlign:"center"}}>Card Colorway</div>
            <div style={{display:"flex",gap:13,justifyContent:"center",marginBottom:26}}>
              {CARDS.map((c,i)=>(
                <motion.button key={c.key} onClick={()=>setActiveCard(i)}
                  whileHover={{scale:1.1}}
                  animate={{scale:i===activeCard?1.18:1,y:i===activeCard?-3:0,boxShadow:i===activeCard?"0 8px 24px rgba(0,0,0,0.6)":"0 3px 10px rgba(0,0,0,0.4)"}}
                  transition={{duration:0.25}}
                  style={{width:46,height:46,borderRadius:"50%",padding:0,cursor:"pointer",overflow:"hidden",border:i===activeCard?"2.5px solid rgba(255,255,255,0.92)":"2.5px solid rgba(255,255,255,0.15)",background:"none"}}>
                  <img src={c.img} alt={c.name} style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:"50%",display:"block"}}/>
                </motion.button>
              ))}
            </div>

            {/* Info panel */}
            <div style={{width:"100%",maxWidth:368,background:"rgba(255,255,255,0.04)",border:"0.5px solid rgba(255,255,255,0.08)",borderRadius:14,padding:"14px 18px",display:"flex",flexDirection:"column",gap:11,marginBottom:14}}>
              {[
                {label:"Cardholder",  value:"Alex Chen",            mono:false},
                {label:"Card Number", value:"AF05 0000 0005 5301",   mono:true},
                {label:"Colorway",    value:card.name,               mono:false},
                {label:"Status",      value:"\u25cf Active",         mono:false,green:true},
              ].map((row,i)=>(
                <div key={i}>
                  {i>0&&<div style={{height:0.5,background:"rgba(255,255,255,0.06)",marginBottom:11}}/>}
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontSize:10,color:"rgba(255,255,255,0.3)",letterSpacing:"0.08em",textTransform:"uppercase"}}>{row.label}</span>
                    <span style={{fontSize:12,fontWeight:600,color:row.green?"#4ade80":"rgba(255,255,255,0.7)",fontFamily:row.mono?"'IBM Plex Mono',monospace":"inherit"}}>{row.value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* NFC button */}
            <motion.button whileHover={{background:"rgba(255,255,255,0.12)",y:-1}} whileTap={{scale:0.98}}
              onClick={()=>setShowNFC(true)}
              style={{width:"100%",maxWidth:368,padding:14,borderRadius:12,border:"0.5px solid rgba(255,255,255,0.13)",background:"rgba(255,255,255,0.07)",color:"rgba(255,255,255,0.8)",fontFamily:"'Outfit',sans-serif",fontSize:13,fontWeight:600,letterSpacing:"0.04em",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:9}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="10" opacity="0.35"/><circle cx="12" cy="12" r="6.5" opacity="0.65"/>
                <circle cx="12" cy="12" r="3" opacity="0.9"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/>
              </svg>
              Hold Near Reader to Activate
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showNFC&&<NFCOverlay card={card} onClose={()=>setShowNFC(false)}/>}
      </AnimatePresence>
    </div>
  );
}