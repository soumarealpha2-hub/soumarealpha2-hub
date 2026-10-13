export type ChatTurn={role:'user'|'assistant';content:string};
export function validateConversation(value:unknown):ChatTurn[]|null{
 if(!value||typeof value!=='object')return null;const list=(value as {messages?:unknown}).messages;
 if(!Array.isArray(list)||!list.length||list.length>10)return null;
 if(list.some(m=>!m||typeof m!=='object'||!['user','assistant'].includes(m.role)||typeof m.content!=='string'||!m.content.trim()||m.content.length>2000))return null;
 if(list.at(-1).role!=='user')return null;
 return list.map(m=>({role:m.role,content:m.content}));
}
