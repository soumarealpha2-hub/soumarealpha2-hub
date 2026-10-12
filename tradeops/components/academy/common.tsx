'use client';
import {ArrowRight,HelpCircle} from 'lucide-react';
import type {ReactNode} from 'react';
import {GlossaryButton} from './glossary';
export const go=(path:string)=>{window.location.hash=path;};
export function LinkButton({to,children,secondary=false}:{to:string;children:ReactNode;secondary?:boolean}){return <a className={secondary?'ac-button secondary':'ac-button'} href={`#${to}`}>{children}<ArrowRight size={16} aria-hidden="true"/></a>;}
export function PageTitle({eyebrow,title,children}:{eyebrow:string;title:string;children?:ReactNode}){return <header className="ac-page-title"><p className="ac-eyebrow">{eyebrow}</p><h1>{title}</h1>{children&&<p>{children}</p>}</header>;}
export function Explain({term,children}:{term:string;children:ReactNode}){return <details className="ac-explain"><summary><HelpCircle size={14}/><span>Explain {term}</span></summary><p>{children}</p><GlossaryButton term={term} label="Open this term in the glossary"/></details>;}
export function Empty({children}:{children:ReactNode}){return <p className="ac-empty">{children}</p>;}
export const money=(x:number,digits=0)=>new Intl.NumberFormat('en-US',{maximumFractionDigits:digits,minimumFractionDigits:digits}).format(x);
export const pct=(x:number)=>`${(x*100).toFixed(2)}%`;
export function NumberField({label,value,onChange,min,max,step='any',suffix}:{label:string;value:number;onChange:(n:number)=>void;min?:number;max?:number;step?:number|'any';suffix?:string}){return <label className="ac-field"><span>{label}{suffix&&<small>{suffix}</small>}</span><input type="number" min={min} max={max} step={step} value={Number.isFinite(value)?value:''} onChange={e=>onChange(e.target.value===''?NaN:Number(e.target.value))}/></label>;}
export function DownloadButton({name,text,children='Download report'}:{name:string;text:string;children?:ReactNode}){return <button className="ac-button secondary" onClick={()=>{const blob=new Blob([text],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download=name;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}}>{children}</button>;}
