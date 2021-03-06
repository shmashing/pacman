$(document).ready(function(){
  
    function getVectorTo(x, y, targ_x, targ_y){
      var distInX = targ_x - x;
      var distInY = targ_y - y;
  
      var magnitude = Math.pow(distInX*distInX + distInY*distInY, 0.5)
  
      distInX = distInX/magnitude;
      distInY = distInY/magnitude;
  
      if(distInX < 0){
        distInX = -1;
      }  
      else if(distInX > 0){
        distInX = 1;
      }
      else{
        distInX = 0;
      }
      if(distInY < 0){
        distInY = -1;
      }
      else if(distInY > 0){
        distInY = 1;
      }
      return ([distInX, distInY]);
    }
  
    function spaceIsClear(x, y, isGhost){
      if(level[y][x] == 0){
        return true;
      }
      else if(level[y][x] == 1){
        return true;
      }
      else if(level[y][x] == 3){
        return true;
      }
      if(isGhost){
        if(level[y][x] == 'g_b'){
          return true;
        }
        else if(level[y][x] == 'g_r'){
          return true;
        }
        else if(level[y][x] == 'g_o'){
          return true;
        }
        else if(level[y][x] == 'g_p'){
          return true;
        }
        else if(level[y][x][0] == 'p'){
          return true;
        }
  
      }
      return false;
    }
  
    function createLevel(){
      var quadrant1 = [
        [2,2,2,2,2,2,2,2,2,2,2,2,2],
        [2,1,1,1,1,1,1,1,1,1,1,1,2],
        [2,3,2,2,2,1,2,2,2,2,2,1,2],
        [2,1,2,2,2,1,2,2,2,2,2,1,2],
        [2,1,1,1,1,1,1,1,1,1,1,1,1],
        [2,1,2,2,2,1,2,1,2,2,2,2,2],
        [2,1,1,1,1,1,2,1,1,1,1,1,2],
        [2,2,2,2,2,1,2,2,2,2,2,1,2],
        [0,0,0,0,2,1,2,2,2,2,2,1,2],
        [0,0,0,0,2,1,2,2,0,0,0,0,0],
        [2,2,2,2,2,1,2,2,0,2,2,'-','-'],
        [0,0,0,0,0,1,0,0,0,2,0,0,0]
      ]
  
      var quadrant3 = [
        [2,2,2,2,2,1,2,2,0,2,2,2,2],
        [0,0,0,0,2,1,2,2,0,0,0,0,0],
        [0,0,0,0,2,1,2,2,0,2,2,2,2],
        [2,2,2,2,2,1,2,2,0,2,2,2,2],
        [2,1,1,1,1,1,1,1,1,1,1,1,2],
        [2,1,2,2,2,1,2,2,2,2,2,1,2],
        [2,3,1,2,2,1,1,1,1,1,1,1,1],
        [2,2,1,2,2,1,2,2,1,2,2,2,2],
        [2,1,1,1,1,1,2,2,1,1,1,1,2],
        [2,1,2,2,2,2,2,2,2,2,2,1,2],
        [2,1,1,1,1,1,1,1,1,1,1,1,1],
        [2,2,2,2,2,2,2,2,2,2,2,2,2]
      ]
      for(i=0;i<quadrant1.length; i++){
        for(j=quadrant1[i].length-1; j>=0; j--){
          quadrant1[i].push(quadrant1[i][j]);
          quadrant3[i].push(quadrant3[i][j]);
        }
      }
    
      level = quadrant1;
      
      for(i=0;i<quadrant3.length;i++){
        level.push(quadrant3[i]);
      }
  
      return(level)
    }
    function placeGhosts(level){
  
      function ghost(name, x, y, state, symbol) {
        this.name = name
        this.x = x;
        this.y = y;
        this.dir = [0,0];
        this.state = state;
        this.symbol = symbol;
        this.tileOccupied = '';
      
      }
  
      var blue_ghost =   new ghost('blue', 12, 11, 'in box', 'g_b');
      var red_ghost =    new ghost('red', 11, 11, 'in box', 'g_r');
      var orange_ghost = new ghost('orange', 14, 11, 'in box', 'g_o');
      var pink_ghost =   new ghost('pink', 13, 11, 'in box', 'g_p');
  
      ghosts = [red_ghost, blue_ghost,pink_ghost, orange_ghost	];
  
      for(i=0; i<ghosts.length; i++){
        level[ghosts[i].y][ghosts[i].x] = ghosts[i].symbol;
      }
    }
  
    function moveGhost(ghost){
      var old_x = ghost.x;
      var old_y = ghost.y;
  
      level[ghost.y][ghost.x] = 0;
      ghost.hasMoved = false;
  
      if(ghost.state == 'in box'){
     
        if(level[9][12] == 0){
          ghost.x = 12;
          ghost.y = 9;
          ghost.state = 'scatter'
          ghost.tileOccupied = 0;
  
          if(Math.round(Math.random()) == 1){
            ghost.dir = [-1, 0];
          }
          else{
            ghost.dir = [1, 0];
          }
        }
      }
  
      if(ghost.state == 'scatter'){
        var options = []
  
        if(spaceIsClear(ghost.x + 1, ghost.y, true)){
          options.push([1,0]);
        }
        if(spaceIsClear(ghost.x - 1, ghost.y, true)){
          options.push([-1,0]);
        }
        if(spaceIsClear(ghost.x, ghost.y + 1, true)){
          options.push([0,1]);
        }
        if(spaceIsClear(ghost.x, ghost.y - 1,true)){
          options.push([0,-1]);
        }
  
        for(i=0; i<options.length;i++){
          if(options[i][0] == 0){
            if(options[i][1] == ghost.dir[1]*-1){
              options.splice(i,1)
            }
          }
          else if(options[i][1]==0){
            if(options[i][0] == ghost.dir[0]*-1){
              options.splice(i,1)
            }
          } 
        }
  
        if(options.length >= 2){
          var new_dir = options[Math.round(Math.random()*(options.length-1))]
          if((new_dir[0] != ghost.dir[0]*(-1)) && (new_dir[1] != ghost.dir[1]*(-1))){
            ghost.dir = new_dir;
          }
        }
        else if(options.length == 1){
          ghost.dir = options[0];
        }
  
        if(spaceIsClear(ghost.x+ghost.dir[0], ghost.y+ghost.dir[1], true)){
          ghost.x += ghost.dir[0];
          ghost.y += ghost.dir[1];
  
          if((ghost.x == 0) && (ghost.y == 11)){
            ghost.x = 24;
          }
          else if((ghost.x == 25) && (ghost.y == 11)){
            ghost.x = 1;
          }
  
          if(ghost.x == PacMan.x && ghost.y == PacMan.y){
            gameOver();
          }
        }
      }
  
      level[old_y][old_x] = ghost.tileOccupied
      if(spaceIsClear(ghost.x, ghost.y)){
        ghost.tileOccupied = level[ghost.y][ghost.x]
      }
      else{
        ghost.tileOccupied = 0;
      }
      level[ghost.y][ghost.x] = ghost.symbol;    
      
  
    }
  
    function displayLevel(){    
      var output = '';
      
      for(j=0; j<level.length;j++){
        output += "\n<div class='row'>";
  
        for(k=0; k<level[j].length; k++){
          if(level[j][k] == 2){
            output +="\n\t<div class='brick'></div>";
          }
          else if(level[j][k] == 1){
            output +="\n\t<div class='empty'><div class='coin small'></div></div>";
          }
          else if(level[j][k] == 3){
            output +="\n\t<div class='empty'><div class='coin big'></div></div>";
          }
          else if(level[j][k] == 0){
            output +="\n\t<div class='empty'></div>";
          }
          else if(level[j][k] == 'p_north'){
            output +="\n\t<div class='pacman north'></div>";
          }
          else if(level[j][k] == 'p_east'){
            output +="\n\t<div class='pacman east'></div>";
          }
          else if(level[j][k] == 'p_south'){
            output +="\n\t<div class='pacman south'></div>";
          }
          else if(level[j][k] == 'p_west'){
            output +="\n\t<div class='pacman west'></div>";
          }
          else if(level[j][k] == 'g_o'){
            output +="\n\t<div class='empty orange_ghost'></div>";
          }
          else if(level[j][k] == 'g_b'){
            output +="\n\t<div class='empty blue_ghost'></div>";
          }
          else if(level[j][k] == 'g_r'){
            output +="\n\t<div class='empty red_ghost'></div>";
          }
          else if(level[j][k] == 'g_p'){
            output +="\n\t<div class='empty pink_ghost'></div>";
          }
          else if(level[j][k] == '-'){
            output +="\n\t<div class='brick gate'></div>";
          }
          else if(level[j][k] == 'D'){
            output += "\n\t<div class='dead_pacman'></div>";
          }
          else if(level[j][k] == 'c'){
            output +="\n\t<div class='cherry'></div>";
          }
  
        }
        output += "</div>";
      }
      
  
      document.getElementById('level').innerHTML = output;
      document.getElementsByClassName('score')[0].innerHTML = score.toString();
    }
  
    function handleKeys(key_code){
      if(key_code == 119){
        if(spaceIsClear(PacMan.x, PacMan.y-1)){
          if(PacMan.dir != 'south'){
            PacMan.dir = 'north';
          }
        }
      }
      else if(key_code == 97){
        if(spaceIsClear(PacMan.x-1, PacMan.y)){
          if(PacMan.dir != 'east'){
            PacMan.dir = 'west';
          }
        }
      }
      else if(key_code == 115){
        if(spaceIsClear(PacMan.x, PacMan.y+1)){
          if(PacMan.dir != 'north'){
            PacMan.dir = 'south';
          }
        }
      }
      else if(key_code == 100){
        if(spaceIsClear(PacMan.x+1, PacMan.y)){
          if(PacMan.dir != 'west'){
            PacMan.dir = 'east';
          }
        }
      }
    }
  
    function move(direction){
  
      var moved = false;
      var x = PacMan.x;
      var y = PacMan.y;
  
      if(direction == 'north'){
        if(spaceIsClear(PacMan.x, PacMan.y-1)){
          if(level[PacMan.y-1][PacMan.x] == 1){
            score += 10;
          }
          else if(level[PacMan.y-1][PacMan.x] == 3){
            score +=50;
          }
          PacMan.y -= 1;
          moved = true;
        }
      }
      else if(direction == 'east'){
        if(spaceIsClear(PacMan.x+1, PacMan.y)){
          if(level[PacMan.y][PacMan.x+1] == 1){
            score += 10;
          }
          else if(level[PacMan.y][PacMan.x+1] == 3){
            score +=50;
          }
  
          PacMan.x += 1;
          
          if(PacMan.x == 23 && PacMan.y == 11){
            PacMan.x = 1;
          }
          moved = true;
        }
      }
      else if(direction == 'south'){
        if(spaceIsClear(PacMan.x, PacMan.y+1)){
          if(level[PacMan.y+1][PacMan.x] == 1){
            score += 10;
          }
          else if(level[PacMan.y+1][PacMan.x] == 3){
            score +=50;
          }
  
          PacMan.y += 1;
          moved = true;
        }
      }
      else if(direction == 'west'){
        if(spaceIsClear(PacMan.x-1, PacMan.y)){
          if(level[PacMan.y][PacMan.x-1] == 1){
            score += 10;
          }
          else if(level[PacMan.y][PacMan.x-1] == 3){
            score +=50;
          }
  
          if(PacMan.x == 1 && PacMan.y == 11){
            PacMan.x = 24;
          }
  
          PacMan.x -= 1;
          moved = true;
        }
      }
  
      if(moved){
        level[PacMan['y']][PacMan['x']] = 'p_' + PacMan['dir'];
        level[y][x] = 0;
      }
      displayLevel();
    }
  
    function update(){
      move(PacMan.dir);
      for(z=0; z<ghosts.length; z++){
        moveGhost(ghosts[z]);
      }
    }
  
    function mainLoop(){
      update();
      turns ++;
  
    }
    function gameOver(){
      clearInterval(game);  
      level[PacMan.y][PacMan.x] = 'D';
      displayLevel();
    }
    // function newGame(){
    //   var game = true;
  
    //   setInterval(mainLoop,10)
    // }
    
    var level = createLevel();
  
    var PacMan = {
      x: 12,
      y: 13,
      dir: 'west',
    }
    var ghosts = [];
    var ghostsInBox = 4;
    var score = 0;
    var turns = 0;
  
    level[PacMan['y']][PacMan['x']] = 'p_west';
    placeGhosts(level);
    displayLevel();
    
    $(document).on('keypress', function(e){
      key = e.keyCode;
      handleKeys(key);
    })
  
    var game = setInterval(mainLoop, 150);
    
  
  });
  