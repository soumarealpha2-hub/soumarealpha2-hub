'use client';
import {Component,type ReactNode} from 'react';

// Keep site navigation usable if a lazy page fails, including during a deployment.
export class PageContentBoundary extends Component<{children:ReactNode;fallback?:ReactNode},{failed:boolean}>{
 state={failed:false};
 static getDerivedStateFromError(){return {failed:true};}
 render(){
  if(this.state.failed)return this.props.fallback??<section className="ac-page-title" role="alert"><p className="ac-eyebrow">Page unavailable</p><h1>Let’s reload this page.</h1><p>A connection issue or a site update may have interrupted loading. Your saved progress stays on this device.</p><div className="ac-actions"><button className="ac-button" onClick={()=>window.location.reload()}>Refresh page</button><a className="ac-button secondary" href="#home">Return home</a></div></section>;
  return this.props.children;
 }
}
