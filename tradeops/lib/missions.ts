export const MISSIONS = [
  {id:'journey',title:'The opening trade',symbol:'AAPL',quantity:100,price:224.5,confirmation:100,cash:22450,custody:100,pending:0,tag:'TRADE LIFECYCLE',description:'Take a client order from execution to a reconciled settlement.'},
  {id:'funding',title:'The funding gap',symbol:'NVDA',quantity:80,price:127.84,confirmation:80,cash:9000,custody:80,pending:0,tag:'SETTLEMENT CHALLENGE',description:'Keep a trade on hold until its cash shortfall is safely resolved.'},
  {id:'recon',title:'The missing shares',symbol:'SPY',quantity:120,price:572.3,confirmation:130,cash:68676,custody:100,pending:20,tag:'RECONCILIATION CHALLENGE',description:'Investigate conflicting records without forcing them to balance.'},
] as const;
export type MissionId=typeof MISSIONS[number]['id'];
export type MissionState={step:number;input:string;funded:boolean;completed:boolean};
export type MissionProgress={version:1;active:MissionId;earned:MissionId[];cases:Partial<Record<MissionId,MissionState>>};
export const emptyMission=():MissionState=>({step:0,input:'',funded:false,completed:false});
export const emptyMissions=():MissionProgress=>({version:1,active:'journey',earned:[],cases:{}});
export function parseMissions(raw:string|null):MissionProgress {
  try {
    const value=JSON.parse(raw??'null');if(value?.version!==1)return emptyMissions();
    const next=emptyMissions();if(MISSIONS.some(m=>m.id===value.active))next.active=value.active;
    next.earned=MISSIONS.filter(m=>Array.isArray(value.earned)&&value.earned.includes(m.id)).map(m=>m.id);
    for(const mission of MISSIONS){const c=value.cases?.[mission.id];if(!c||typeof c!=='object')continue;
      const step=Number.isInteger(c.step)?Math.max(0,Math.min(5,c.step)):0;
      next.cases[mission.id]={step,input:typeof c.input==='string'?c.input.slice(0,30):'',funded:c.funded===true,completed:c.completed===true&&step===5};
    }return next;
  }catch{return emptyMissions();}
}
export function earnedMissionXp(progress:MissionProgress){return progress.earned.length*300;}
export function advanceMission(progress:MissionProgress,id:MissionId):MissionProgress {
  const state=progress.cases[id]??emptyMission();
  if(state.step>=5)return progress;
  const completed=state.step===4;
  return {...progress,earned:completed&&!progress.earned.includes(id)?[...progress.earned,id]:progress.earned,cases:{...progress.cases,[id]:{...state,step:state.step+1,input:'',completed}}};
}
export function replayMission(progress:MissionProgress,id:MissionId):MissionProgress {
  return {...progress,cases:{...progress.cases,[id]:emptyMission()}};
}
export function mastery(xp:number){const levels=[{title:'Trainee',min:0},{title:'Desk analyst',min:300},{title:'Operations specialist',min:900},{title:'Control strategist',min:1800}];const index=levels.findLastIndex(l=>xp>=l.min);return {level:index+1,...levels[index],next:levels[index+1]?.min??null};}
