'use client';

import { useState } from 'react';
import { ArrowUpRight, BookOpen, CircleHelp, Search } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { CONCEPTS, SOURCES } from '@/lib/learning';

export function ExplainButton({concept,onExplain,label='Explain this'}:{concept:string;onExplain:(id:string)=>void;label?:string}) {
  return <button type="button" className="explain-button" onClick={()=>onExplain(concept)} aria-label={`${label}: ${CONCEPTS.find(c=>c.id===concept)?.term??concept}`}><CircleHelp size={15}/><span>{label}</span></button>;
}

export function ExplainPanel({conceptId,onClose,onSelect}:{conceptId:string|null;onClose:()=>void;onSelect:(id:string)=>void}) {
  const [search,setSearch]=useState('');
  const concept=CONCEPTS.find(c=>c.id===conceptId)??CONCEPTS[0];
  const matches=CONCEPTS.filter(c=>`${c.term} ${c.meaning}`.toLowerCase().includes(search.trim().toLowerCase()));
  const source=concept.source?SOURCES[concept.source as keyof typeof SOURCES]:null;
  return <Sheet open={conceptId!==null} onOpenChange={open=>{if(!open){onClose();setSearch('');}}}>
    <SheetContent className="explain-sheet w-full sm:max-w-[480px] overflow-y-auto">
      <SheetHeader><div className="eyebrow">QUICK EXPLANATIONS</div><SheetTitle>{concept.term}</SheetTitle><SheetDescription>Plain language, with an example from an operations desk.</SheetDescription></SheetHeader>
      <div className="sheet-body explanation-body">
        <div className="explanation-definition"><BookOpen size={20}/><p>{concept.meaning}</p></div>
        <section><h3>A practical example</h3><p>{concept.example}</p></section>
        <section><h3>What you do in operations</h3><p>{concept.role}</p></section>
        <section><h3>Related concepts</h3><div className="term-chips">{concept.related.map(id=><button key={id} onClick={()=>{onSelect(id);setSearch('');}}>{CONCEPTS.find(c=>c.id===id)?.term}</button>)}</div></section>
        {source&&<a className="learning-source" href={source.url} target="_blank" rel="noreferrer">{source.title}<ArrowUpRight size={14}/></a>}
        <div className="explanation-search"><Search size={16}/><input aria-label="Search financial terms" placeholder="Find another term..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
        <div className="glossary-list" aria-label="Financial glossary">{matches.map(c=><button key={c.id} className={c.id===concept.id?'active':''} onClick={()=>{onSelect(c.id);setSearch('');}}><span>{c.term}</span><CircleHelp size={14}/></button>)}{matches.length===0&&<p className="muted">No matching term. Try “cash”, “matching”, or “risk”.</p>}</div>
        <p className="learning-footnote">Explanations stay alongside your current workflow. Tutorial cases use synthetic data and illustrative desk rules.</p>
      </div>
    </SheetContent>
  </Sheet>;
}
