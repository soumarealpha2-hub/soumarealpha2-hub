'use client';
import {useSyncExternalStore,type SetStateAction} from 'react';
import {ACADEMY_KEY,emptyProgress,parseProgress,serializeProgress,type AcademyProgress} from '@/lib/academy/progress';
type Snapshot={progress:AcademyProgress;ready:boolean;saved:boolean};
const server:Snapshot={progress:emptyProgress(),ready:false,saved:true};let snapshot=server;const listeners=new Set<()=>void>();
function init(){if(snapshot.ready)return;try{snapshot={progress:parseProgress(localStorage.getItem(ACADEMY_KEY)),ready:true,saved:true};}catch{snapshot={progress:emptyProgress(),ready:true,saved:false};}}
const notify=()=>listeners.forEach(f=>f());
function sync(e:StorageEvent){if(e.key!==ACADEMY_KEY)return;snapshot={progress:parseProgress(e.newValue),ready:true,saved:true};notify();}
function subscribe(fn:()=>void){listeners.add(fn);init();if(listeners.size===1)window.addEventListener('storage',sync);return()=>{listeners.delete(fn);if(!listeners.size)window.removeEventListener('storage',sync);};}
export function updateAcademy(action:SetStateAction<AcademyProgress>){init();const progress=typeof action==='function'?action(snapshot.progress):action;let saved=true;try{localStorage.setItem(ACADEMY_KEY,serializeProgress(progress));}catch{saved=false;}snapshot={progress,ready:true,saved};notify();}
export function useAcademy(){return {...useSyncExternalStore(subscribe,()=>snapshot,()=>server),update:updateAcademy};}
export function useLab<T extends object>(id:string,defaults:T,validate:(v:unknown)=>T){const {progress,update}=useAcademy();const value=progress.labs[id]?validate(progress.labs[id]):defaults;return [value,(v:T)=>update(p=>({...p,labs:{...p.labs,[id]:v}}))] as const;}
