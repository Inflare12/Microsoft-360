import React from 'react';

type Props={children:React.ReactNode};
type State={error:Error|null};

export default class ErrorBoundary extends React.Component<Props,State>{
  state:State={error:null};
  static getDerivedStateFromError(error:Error):State{return {error};}
  componentDidCatch(error:Error,info:React.ErrorInfo){console.error('Microsoft-360 runtime error',error,info);}
  render(){
    if(this.state.error){
      return <main style={{minHeight:'100vh',display:'grid',placeItems:'center',padding:24,fontFamily:'Segoe UI,Arial,sans-serif',background:'#f5f7fb',color:'#172033'}}><section style={{width:'min(680px,100%)',background:'#fff',border:'1px solid #e1e6ef',borderRadius:18,padding:28,boxShadow:'0 18px 60px rgba(15,23,42,.10)'}}><div style={{fontSize:12,fontWeight:800,letterSpacing:1.2,color:'#315bea',marginBottom:10}}>MICROSOFT-360 RECOVERY</div><h1 style={{margin:'0 0 10px',fontSize:28}}>Something went wrong</h1><p style={{color:'#667085',lineHeight:1.6}}>The application hit a runtime error. Your browser data has not been intentionally cleared.</p><pre style={{whiteSpace:'pre-wrap',background:'#f4f6f8',borderRadius:10,padding:14,fontSize:12,overflow:'auto'}}>{this.state.error.message}</pre><div style={{display:'flex',gap:10,flexWrap:'wrap',marginTop:16}}><button onClick={()=>location.reload()} style={{border:0,borderRadius:10,padding:'10px 16px',background:'#315bea',color:'#fff',fontWeight:700,cursor:'pointer'}}>Reload app</button><button onClick={()=>{localStorage.removeItem('m360-state-v3');location.reload()}} style={{border:'1px solid #d7dde7',borderRadius:10,padding:'10px 16px',background:'#fff',color:'#172033',fontWeight:700,cursor:'pointer'}}>Reset workspace</button></div></section></main>;
    }
    return this.props.children;
  }
}
