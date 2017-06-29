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
    var color = ['blue', 'orange', 'pink', 'red'];

    var blue_ghost = {
      x:        11,
      y:        11,
      inBox:  true,
      symbol: 'g_b'
    }
    var red_ghost = {
      x:        12,
      y:        11,
      inBox:  true,
      symbol: 'g_r'
    }
    var orange_ghost = {
      x:        13,
      y:        11,
      inBox:  true,
      symbol: 'g_o'
    }
    var pink_ghost = {
      x:        14,
      y:        11,
      inBox:  true,
      symbol: 'g_p'
    }

    ghosts = [blue_ghost, red_ghost, orange_ghost, pink_ghost];

    for(i=0; i<ghosts.length; i++){
      level[ghosts[i]['y']][ghosts[i]['x']] = ghosts[i]['symbol'];
    }
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

      }
      output += "</div>";
    }
    

    document.getElementById('level').innerHTML = output;
    document.getElementsByClassName('score')[0].innerHTML = score.toString();
  }

  function moveGhosts(){
    for(i=0;i<ghosts.length; i++){
      level[ghosts[i].y][ghosts[i].x] = 0;
      if(ghosts[i].inBox){
        if(level[9][12] == 0){
          ghosts[i]['y'] = 9;
          ghosts[i]['x'] = 12;
          ghosts[i]['inBox'] = false;
        }
      }
      else{
        var vector = getVectorTo(ghosts[i]['x'], ghosts[i]['y'], PacMan['x'], PacMan['y']);
        if(level[ghosts[i]['y']+vector[1]][ghosts[i]['x']] == 1 || level[ghosts[i]['y']+vector[1]][ghosts[i]['x']] == 0){
          ghosts[i].y += vector[1];
        }
        else if(level[ghosts[i]['y']][ghosts[i]['x']+vector[0]] == 1 || level[ghosts[i]['y']][ghosts[i]['x']+vector[0]] == 0){
          ghosts[i]['x'] += vector[0];
        }
        else if(level[ghosts[i]['y']][ghosts[i]['x']+vector[0]] == 1 || level[ghosts[i]['y']][ghosts[i]['x']+vector[0]] == 0){
          ghosts[i]['x'] += vector[0];
        }

      }
      level[ghosts[i]['y']][ghosts[i]['x']] = ghosts[i]['symbol'];
    }
  }

  function handleKeys(key_code){
    if(key_code == 119){
      if(level[PacMan.y-1][PacMan.x] != 2 && level[PacMan.y-1][PacMan.x] != '-'){
        PacMan.dir = 'north';
      }
    }
    else if(key_code == 97){
      if(level[PacMan.y][PacMan.x-1] != 2 && level[PacMan.y][PacMan.x+1] != '-'){
        PacMan.dir = 'west';
      }
    }
    else if(key_code == 115){
      if(level[PacMan.y+1][PacMan.x] != 2 && level[PacMan.y+1][PacMan.x] != '-'){
        PacMan.dir = 'south';
      }
    }
    else if(key_code == 100){
      if(level[PacMan.y][PacMan.x+1] != 2 && level[PacMan.y][PacMan.x-1] != '-'){
        PacMan.dir = 'east';
      }
    }
    else if(key_code == 13){
      newGame();
    }
  }

  function move(direction){

    var moved = false;
    var x = PacMan.x;
    var y = PacMan.y;

    if(direction == 'north'){
      if(level[PacMan.y-1][PacMan.x] != 2 && level[PacMan.y-1][PacMan.x] != '-'){
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
      if(level[PacMan.y][PacMan.x+1] != 2 && level[PacMan.y][PacMan.x+1] != '-'){
        if(level[PacMan.y][PacMan.x+1] == 1){
          score += 10;
        }
        else if(level[PacMan.y][PacMan.x+1] == 3){
          score +=50;
        }

        PacMan.x += 1;
        moved = true;
      }
    }
    else if(direction == 'south'){
      if(level[PacMan.y+1][PacMan.x] != 2 && level[PacMan.y+1][PacMan.x] != '-'){
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
      if(level[PacMan.y][PacMan.x-1] != 2 && level[PacMan.y][PacMan.x-1] != '-'){
        if(level[PacMan.y][PacMan.x-1] == 1){
          score += 10;
        }
        else if(level[PacMan.y][PacMan.x-1] == 3){
          score +=50;
        }

        PacMan.x -= 1;
        moved = true;
      }
    }

    if(moved){
      level[PacMan['y']][PacMan['x']] = 'p_' + PacMan['dir'];
      level[y][x] = 0;
      moveGhosts()
      displayLevel();
    }


  }

  function update(){
    move(PacMan.dir);
  }

  function mainLoop(){
    $(document).on('keypress', function(e){
      key = e.keyCode;
      handleKeys(key);
    })

    update();
  }
  
  function newGame(){
    var game = true;

    setInterval(mainLoop,500)

  }
  
  var level = createLevel();

  var PacMan = {
    x: 12,
    y: 13,
    dir: 'west',
  }
  var ghosts = [];
  var ghostsInBox = 4;
  var score = 0;
  var game = false;

  level[PacMan['y']][PacMan['x']] = 'p_west';
  placeGhosts(level);
  displayLevel();

 
  
  setInterval(mainLoop, 500);
  

});
