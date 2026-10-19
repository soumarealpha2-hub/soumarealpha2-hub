'use client';
import {GLOSSARY} from '@/lib/academy/learning-hub';
import {FOUNDATION_TERMS} from '@/lib/academy/foundations';
export function TermExplain({term}:{term:string}){
 const item=GLOSSARY.find(t=>t.term.toLowerCase()===term.toLowerCase()||t.id===term);
 if(!item)return null;
 const foundation=FOUNDATION_TERMS.find(t=>t.term===item.term);
 return <details className="ac-term-explain"><summary>Explain this: {item.term}</summary><div><p>{item.meaning}</p><p><strong>Example:</strong> {item.example}</p>{foundation&&<><p><strong>Why it matters:</strong> {foundation.why}</p><details><summary>A little more detail</summary><p>{foundation.detail}</p></details></>}</div></details>;
}
