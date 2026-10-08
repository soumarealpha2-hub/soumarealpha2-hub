'use client';

import { useCallback, useSyncExternalStore, type SetStateAction } from 'react';
import { STORAGE_KEY, emptyLesson, emptyProgress, parseProgress, type LearningProgress, type LessonProgress } from '@/lib/learning';

type Snapshot={progress:LearningProgress;ready:boolean;saved:boolean};
const serverSnapshot:Snapshot={progress:emptyProgress(),ready:false,saved:true};
let snapshot=serverSnapshot;
const listeners=new Set<()=>void>();
const notify=()=>listeners.forEach(listener=>listener());

function initialize() {
  if(snapshot.ready)return;
  try{snapshot={progress:parseProgress(localStorage.getItem(STORAGE_KEY)),ready:true,saved:true};}
  catch{snapshot={progress:emptyProgress(),ready:true,saved:false};}
}
function sync(event:StorageEvent) {
  if(event.key!==STORAGE_KEY)return;
  snapshot={progress:parseProgress(event.newValue),ready:true,saved:true};notify();
}
function subscribe(listener:()=>void) {
  listeners.add(listener);initialize();
  if(listeners.size===1)window.addEventListener('storage',sync);
  return ()=>{listeners.delete(listener);if(listeners.size===0)window.removeEventListener('storage',sync);};
}
const getSnapshot=()=>snapshot;
const getServerSnapshot=()=>serverSnapshot;
function changeProgress(action:SetStateAction<LearningProgress>) {
  initialize();
  const progress=typeof action==='function'?action(snapshot.progress):action;
  let saved=true;
  try{localStorage.setItem(STORAGE_KEY,JSON.stringify(progress));}catch{saved=false;}
  snapshot={progress,ready:true,saved};notify();
}

export function useLearningProgress() {
  const state=useSyncExternalStore(subscribe,getSnapshot,getServerSnapshot);
  const updateLesson=useCallback((id:string,update:(lesson:LessonProgress)=>LessonProgress)=>{
    changeProgress(p=>({...p,lastLesson:id,lessons:{...p.lessons,[id]:update(p.lessons[id]??emptyLesson())}}));
  },[]);
  return {...state,setProgress:changeProgress,updateLesson};
}
