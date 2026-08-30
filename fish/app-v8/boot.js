function render(){nav();fab.style.display='block';if(S.screen==='photo'||S.screen==='photoConfirm'||S.screen==='photoCaption'||S.screen==='photoCard')return renderPhoto();if(S.tab==='home')home();else if(S.tab==='play')play();else if(S.tab==='games'){if(!Number.isFinite(S.waterQ))S.waterQ=0;games()}else if(S.tab==='decision')decision();else if(S.tab==='learn')learn();else me()}
// route special play sub-screens
const oldRender=render;
function playRouter(){if(S.screen==='clue')return cluePicker(S.mode==='mystery'?'mystery':'guided');if(S.screen==='event')return eventPicker();if(S.screen==='validity')return validityPicker()}
const _play=play;play=function(){if(['clue','event','validity'].includes(S.screen))return playRouter();return _play()}
render();