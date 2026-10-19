'use client';
import {useState} from 'react';
import {ArrowRight} from 'lucide-react';
import {CAREERS,TRACKS} from '@/lib/academy/careers';

export const CAREER_CATEGORIES=[...new Set(CAREERS.map(c=>c.category))];
export function CareerCategories(){return <nav className="fs-career-categories" aria-label="All career categories">{CAREER_CATEGORIES.map(category=><a key={category} href={`#careers?category=${encodeURIComponent(category)}`}><span>{category}<small>{CAREERS.filter(c=>c.category===category).length} careers</small></span><ArrowRight size={16} aria-hidden="true"/></a>)}</nav>;}

export function FoundationDirectory(){
 const [search,setSearch]=useState(''),[category,setCategory]=useState('all');
 const filtered=CAREERS.filter(c=>(category==='all'||c.category===category)&&`${c.title} ${c.category} ${c.skills}`.toLowerCase().includes(search.trim().toLowerCase()));
 return <div className="fs-foundation-directory">
  <div className="fs-foundation-filters"><label className="ac-field"><span>Search foundations by career</span><input type="search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Try venture capital, insurance, consulting…"/></label><label className="ac-field"><span>Career category for foundations</span><select value={category} onChange={e=>setCategory(e.target.value)}><option value="all">All career categories</option>{CAREER_CATEGORIES.map(c=><option key={c}>{c}</option>)}</select></label></div>
  <p className="ac-meta" aria-live="polite">{filtered.length} of {CAREERS.length} careers · Open a category to see every pathway.</p>
  <p className="fs-foundation-note">Each career connects to shared foundation lessons and a relevant work sample. Related careers may use the same lessons; the four foundation tracks are starting points, not the only careers available.</p>
  <div className="fs-foundation-groups">{CAREER_CATEGORIES.map(name=>{const careers=filtered.filter(c=>c.category===name);return careers.length>0&&<details key={name} open={!!search.trim()||category!=='all'}><summary><strong>{name}</strong><span>{careers.length} {careers.length===1?'career':'careers'}</span></summary><div className="fs-foundation-rows">{careers.map(c=>{const track=TRACKS.find(t=>t.id===c.track)!;return <article key={c.id}><div><h3><a href={`#careers/${c.id}`}>{c.title}</a></h3><p>Shared foundations: {track.title}</p></div><div className="fs-foundation-links"><a href={`#learn/${c.track}?level=beginner`} aria-label={`Learn foundations for ${c.title}`}>Learn foundations <ArrowRight size={14}/></a><a href={`#day/${c.id}`} aria-label={`Try a work sample for ${c.title}`}>Try the work <ArrowRight size={14}/></a></div></article>;})}</div></details>;})}</div>
  {!filtered.length&&<div className="ac-empty"><p>No careers match these filters.</p><button type="button" className="ac-link" onClick={()=>{setSearch('');setCategory('all');}}>Show all careers</button></div>}
 </div>;
}
