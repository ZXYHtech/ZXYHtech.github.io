// Build 20260830-1212: retire legacy gamesHub embedded in knowledge.js.
// Keep knowledge content loaded, but route all game-center entry points to games.js.
window.FISH_BUILD='20260830-1212';
window.gamesHub=function(){
  S.gameScreen='hub';
  games();
  const eyebrow=document.querySelector('.hero .eyebrow');
  if(eyebrow && !eyebrow.textContent.includes('Build')) eyebrow.textContent+=' · Build 1212';
};
