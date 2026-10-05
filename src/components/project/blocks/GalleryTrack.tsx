'use client'
import {useEffect,useRef,useState,useId,type CSSProperties,type ReactNode} from 'react'

export default function GalleryTrack({children,count}: {children:ReactNode;count:number}) {
  const track=useRef<HTMLDivElement>(null),id=useId()
  const [active,setActive]=useState(0)
  const [desktop,setDesktop]=useState(false)
  const [offset,setOffset]=useState(0)
  useEffect(()=>{
    const el=track.current
    if(!el)return
    const media=matchMedia('(min-width: 761px)')
    const update=()=>{
      setDesktop(media.matches)
      if(media.matches){
        const first=el.children[0] as HTMLElement|undefined,item=el.children[active] as HTMLElement|undefined
        // Preserve the existing flush-edge snap position without desktop native snapping.
        const inset=parseFloat(getComputedStyle(el).paddingLeft)||0
        setOffset((first&&item?item.getBoundingClientRect().left-first.getBoundingClientRect().left:0)+inset)
        el.scrollLeft=0
      }else setOffset(0)
    }
    const breakpoint=()=>{setActive(0);setOffset(0);el.scrollTo({left:0,behavior:'instant'});setDesktop(media.matches)}
    update()
    const observer=new ResizeObserver(update)
    observer.observe(el)
    for(const child of el.children)observer.observe(child)
    media.addEventListener('change',breakpoint)
    return()=>{observer.disconnect();media.removeEventListener('change',breakpoint)}
  },[active,count])
  function go(index:number){
    index=Math.max(0,Math.min(count-1,index))
    const el=track.current,item=el?.children[index] as HTMLElement|undefined,first=el?.children[0] as HTMLElement|undefined
    if(!el||!item)return
    if(matchMedia('(min-width: 761px)').matches){
      const inset=parseFloat(getComputedStyle(el).paddingLeft)||0
      setOffset((first?item.getBoundingClientRect().left-first.getBoundingClientRect().left:0)+inset)
    }else el.scrollTo({left:item.getBoundingClientRect().left-el.getBoundingClientRect().left+el.scrollLeft,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})
    const focused=document.activeElement
    if(focused instanceof HTMLButtonElement&&focused.getAttribute('aria-controls')===id&&
      ((index===0&&focused.getAttribute('aria-label')==='Previous gallery image')||(index===count-1&&focused.getAttribute('aria-label')==='Next gallery image'))) el.focus({preventScroll:true})
    setActive(index)
  }
  return <>
    <div className="project-gallery-controls"><p aria-live="polite">{String(active+1).padStart(2,'0')} / {String(count).padStart(2,'0')}</p><button type="button" aria-label="Previous gallery image" aria-controls={id} disabled={active===0} onClick={()=>go(active-1)}>←</button><button type="button" aria-label="Next gallery image" aria-controls={id} disabled={active===count-1} onClick={()=>go(active+1)}>→</button></div>
    <div id={id} ref={track} className="project-gallery-images" role="group" data-gallery-track data-gallery-mode={desktop?'desktop':'mobile'} style={{'--gallery-offset':`${offset}px`,overflowX:desktop?'hidden':undefined,scrollSnapType:desktop?'none':undefined} as CSSProperties} tabIndex={0} aria-label="Scrollable gallery" onKeyDown={e=>{
      if(e.altKey||e.ctrlKey||e.metaKey)return
      if(['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();go(e.key==='Home'?0:e.key==='End'?count-1:active+(e.key==='ArrowRight'?1:-1))}
    }} onScroll={()=>{
      const el=track.current;if(!el)return
      if(matchMedia('(min-width: 761px)').matches)return
      let nearest=0,distance=Infinity
      Array.from(el.children).forEach((item,i)=>{const delta=Math.abs(item.getBoundingClientRect().left-el.getBoundingClientRect().left);if(delta<distance){distance=delta;nearest=i}})
      setActive(nearest)
    }}>{children}</div>
  </>
}
