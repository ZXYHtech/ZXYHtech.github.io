// Route every legacy game-center entry to the current open-source game hub.
window.FISH_BUILD='PLAYFIX1';
window.gamesHub=function(){
  S.gameScreen='hub';
  games();
};
