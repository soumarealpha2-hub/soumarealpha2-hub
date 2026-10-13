export const MAX_RESUME_BYTES = 5 * 1024 * 1024;
export const MAX_RESUME_CHARS = 25000;
export function validateResumeFile(file: {name:string;size:number}) {
 if (!/\.(pdf|docx|txt)$/i.test(file.name)) throw new Error('Choose a PDF, Word (.docx), or TXT resume. Save older .doc files as .docx first.');
 if (!file.size) throw new Error('This file is empty. Choose another resume.');
 if (file.size > MAX_RESUME_BYTES) throw new Error('Choose a resume smaller than 5 MB.');
}
export function cleanResumeText(text:string) {
 const clean=text.replace(/\u0000/g,'').replace(/\r\n?/g,'\n').trim();
 if(clean.length<80)throw new Error('We could not read enough text. If this is a scanned resume, export a text-based PDF or Word document and try again.');
 if(clean.length>MAX_RESUME_CHARS)throw new Error('This document is too long. Upload a resume with fewer than 25,000 characters.');
 return clean;
}
export async function readResume(file:File):Promise<string> {
 validateResumeFile(file);
 if(/\.txt$/i.test(file.name))return cleanResumeText(await file.text());
 const data=await file.arrayBuffer();
 if(/\.docx$/i.test(file.name)){
  const mammoth=await import('mammoth');
  return cleanResumeText((await mammoth.extractRawText({arrayBuffer:data})).value);
 }
 const pdfjs=await import('pdfjs-dist');
 const worker=await import('pdfjs-dist/build/pdf.worker.min.mjs?url');
 pdfjs.GlobalWorkerOptions.workerSrc=worker.default;
 const task=pdfjs.getDocument({data:new Uint8Array(data),useSystemFonts:true});
 task.onPassword=()=>{void task.destroy();};
 const timeout=setTimeout(()=>{void task.destroy();},20000);
 try{
  const document=await task.promise;
  if(document.numPages>20)throw new Error('Upload a resume with 20 pages or fewer.');
  let text='';
  for(let i=1;i<=document.numPages;i++){
   const page=await document.getPage(i),content=await page.getTextContent();
   text+=content.items.map(item=>'str' in item?item.str+('hasEOL' in item&&item.hasEOL?'\n':' '):'').join('')+'\n';
   if(text.length>MAX_RESUME_CHARS)throw new Error('This document is too long. Upload a resume with fewer than 25,000 characters.');
  }
  return cleanResumeText(text);
 }finally{clearTimeout(timeout);await task.destroy();}
}
