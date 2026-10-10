import test from 'node:test';
import assert from 'node:assert/strict';
import {MISSIONS,advanceMission,replayMission,emptyMissions,parseMissions,earnedMissionXp,mastery} from '../lib/missions.ts';

test('checkpoints survive reload and only the final reconciliation earns XP',()=>{
  let progress=emptyMissions();
  for(const mission of MISSIONS){
    for(let step=0;step<5;step++){
      assert.equal(earnedMissionXp(progress),MISSIONS.indexOf(mission)*300);
      progress=parseMissions(JSON.stringify(advanceMission(progress,mission.id)));
      assert.equal(progress.cases[mission.id].step,step+1);
    }
    assert.equal(progress.cases[mission.id].completed,true);
    assert.equal(earnedMissionXp(progress),(MISSIONS.indexOf(mission)+1)*300);
  }
});
test('replaying or reloading a completed mission cannot award XP twice',()=>{
  let progress=emptyMissions();
  for(let step=0;step<5;step++)progress=advanceMission(progress,'journey');
  assert.strictEqual(advanceMission(progress,'journey'),progress);
  progress=parseMissions(JSON.stringify(replayMission(progress,'journey')));
  assert.equal(progress.cases.journey.completed,false);
  assert.equal(earnedMissionXp(progress),300);
  for(let step=0;step<5;step++)progress=advanceMission(progress,'journey');
  assert.deepEqual(progress.earned,['journey']);
  assert.equal(earnedMissionXp(progress),300);
});
test('corrupted progress cannot create unknown achievements or invalid checkpoints',()=>{
  assert.deepEqual(parseMissions('{'),emptyMissions());
  const progress=parseMissions(JSON.stringify({version:1,active:'unknown',earned:['journey','journey','unknown'],cases:{funding:{step:900,input:'x'.repeat(100),funded:'yes',completed:true},recon:{step:2,completed:true}}}));
  assert.equal(progress.active,'journey');assert.equal(earnedMissionXp(progress),300);
  assert.equal(progress.cases.funding.step,5);assert.equal(progress.cases.funding.input.length,30);assert.equal(progress.cases.funding.funded,false);
  assert.equal(progress.cases.recon.completed,false);
  assert.equal(mastery(0).level,1);assert.equal(mastery(900).title,'Operations specialist');assert.equal(mastery(2100).next,null);
});
