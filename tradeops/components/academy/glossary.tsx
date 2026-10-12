'use client';
import {useState} from 'react';
import {GLOSSARY} from '@/lib/academy/learning-hub';
import {Dialog,DialogContent,DialogTitle,DialogDescription} from '@/components/ui/dialog';
import {useLab} from './use-academy';

function GlossaryContent({term=''}:{term?:string}){
 const [query,setQuery]=useState(term),[savedOnly,setSavedOnly]=useState(false);
 const [p,set]=useLab('glossary',{saved:[] as string[]},(v:unknown)=>({saved:v&&typeof v==='object'&&Array.isArray((v as {saved?:unknown}).saved)?((v as {saved:unknown[]}).saved).filter((x):x is string=>typeof x==='string'&&GLOSSARY.some(t=>t.id===x)):[]}));
 const terms=GLOSSARY.filter(t=>(!savedOnly||p.saved.includes(t.id))&&`${t.term} ${t.meaning} ${t.category}`.toLowerCase().includes(query.toLowerCase()));
 return <><label className="ac-field"><span>Search a finance term</span><input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Try WACC, settlement, runway…"/></label><label className="ac-check"><input type="checkbox" checked={savedOnly} onChange={e=>setSavedOnly(e.target.checked)}/>Show my saved terms</label><p className="ac-meta">{terms.length} terms · Plain-language definitions and fictional examples</p><div className="ac-glossary-list">{terms.map(t=><article key={t.id}><small>{t.category}</small><h3>{t.term}</h3><p>{t.meaning}</p><p className="ac-glossary-example"><strong>Example:</strong> {t.example}</p><button className="ac-link" aria-pressed={p.saved.includes(t.id)} onClick={()=>set({saved:p.saved.includes(t.id)?p.saved.filter(id=>id!==t.id):[...p.saved,t.id]})}>{p.saved.includes(t.id)?'Saved · remove':'Save this term'}</button></article>)}</div>{!terms.length&&<p className="ac-empty">No terms match. Try a shorter search or turn off the saved-terms filter.</p>}</>;
}
export function GlossaryButton({term='',label='Glossary'}:{term?:string;label?:string}){const [open,setOpen]=useState(false);return <><button className="ac-link ac-glossary-trigger" onClick={()=>setOpen(true)}>{label}</button><Dialog open={open} onOpenChange={setOpen}><DialogContent className="academy ac-glossary-dialog"><DialogTitle>Finance, in plain English.</DialogTitle><DialogDescription>Look up a term without leaving your current work. Saved terms stay on this device.</DialogDescription><GlossaryContent term={term}/></DialogContent></Dialog></>;}
export function GlossaryPage(){return <><header className="ac-page-title"><p className="ac-eyebrow">Learning companion</p><h1>Finance, in plain English.</h1><p>Search definitions, inspect an example, and save terms you want to revisit.</p></header><GlossaryContent/></>;}
