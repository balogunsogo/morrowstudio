'use client'
import {useEffect,useRef,useState,useId,type CSSProperties,type ReactNode} from 'react'

function galleryOffset(el: HTMLDivElement, index: number) {
  const first = el.firstElementChild as HTMLElement | null
  const last = el.lastElementChild as HTMLElement | null
  const item = el.children[index] as HTMLElement | undefined
  if (!first || !last || !item) return 0
  const styles = getComputedStyle(el)
  const leading = parseFloat(styles.paddingLeft) || 0
  const trailing = parseFloat(styles.paddingRight) || 0
  const firstLeft = first.getBoundingClientRect().left
  // All figures share the same translation, so these differences stay stable
  // during an animation and do not depend on the transformed scrollWidth.
  const contentWidth = last.getBoundingClientRect().right - firstLeft
  const maximum = Math.max(0, contentWidth + leading + trailing - el.clientWidth)
  return Math.max(0, Math.min(item.getBoundingClientRect().left - firstLeft + leading, maximum))
}

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
      // Cancel native snapping before resetting scroll; React's desktop styles
      // commit later, and the browser could otherwise snap back to the gutter.
      el.style.scrollSnapType=media.matches?'none':''
      setDesktop(media.matches)
      if(media.matches){
        setOffset(galleryOffset(el, active))
        el.scrollLeft=0
      }else setOffset(0)
    }
    const breakpoint=()=>{el.style.scrollSnapType=media.matches?'none':'';setActive(0);setOffset(0);el.scrollTo({left:0,behavior:'instant'});setDesktop(media.matches)}
    update()
    const observer=new ResizeObserver(update)
    observer.observe(el)
    for(const child of el.children)observer.observe(child)
    media.addEventListener('change',breakpoint)
    return()=>{observer.disconnect();media.removeEventListener('change',breakpoint)}
  },[active,count])
  function go(index:number){
    index=Math.max(0,Math.min(count-1,index))
    const el=track.current,item=el?.children[index] as HTMLElement|undefined
    if(!el||!item)return
    if(matchMedia('(min-width: 761px)').matches){
      setOffset(galleryOffset(el, index))
    }else el.scrollTo({left:galleryOffset(el, index),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})
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
      const maximum = Math.max(0, el.scrollWidth - el.clientWidth)
      if (maximum > 0 && el.scrollLeft >= maximum - 1) {setActive(count - 1); return}
      if (el.scrollLeft <= 1) {setActive(0); return}
      let nearest=0,distance=Infinity
      Array.from(el.children).forEach((item,i)=>{const delta=Math.abs(item.getBoundingClientRect().left-el.getBoundingClientRect().left);if(delta<distance){distance=delta;nearest=i}})
      setActive(nearest)
    }}>{children}</div>
  </>
}
