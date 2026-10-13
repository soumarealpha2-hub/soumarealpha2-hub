'use client';
import {LEVELS,LEVEL_LABEL,lessonAtLevel,type Level} from '@/lib/academy/lessons';
export function LessonLevels({topicId,current,completed=[]}:{topicId:string;current?:Level;completed?:string[]}){
 return <nav className="ac-level-links" aria-label="Choose lesson difficulty">{LEVELS.map(level=>{const lesson=lessonAtLevel(topicId,level);return <a key={level} href={`#learn/${lesson.id}`} aria-current={current===level?'page':undefined}>{LEVEL_LABEL[level]}{completed.includes(lesson.id)&&<span aria-label="completed"> ✓</span>}</a>;})}</nav>;
}
