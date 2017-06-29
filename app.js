$(document).ready(function(){

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
    ghosts = ['g_b', 'g_r', 'g_o', 'g_p'];

    for(i=0; i<4; i++){
      level[11][11+i] = ghosts[i];
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
  }

  function handleKeys(key_code){
    var moved = false;
    var x = PacMan['x'];
    var y = PacMan['y'];
    var direction = PacMan['dir']

    if(key_code == 13){
      document.getElementsByClassName('start_text').hide()
    }
    else if(key_code == 119){
       if(level[y-1][x] != 2){
        PacMan['y'] -= 1;
        PacMan['dir'] = 'north';
        moved = true;
      }
    }
    else if(key_code == 97){
      if(level[y][x-1] != 2){
        PacMan['x'] -= 1;
        PacMan['dir'] = 'west';
        moved = true;
        if(PacMan['x'] == 0){
          PacMan['x'] = 24;
        }
      }
    }
    else if(key_code == 115){
      if(level[y+1][x] != 2 && level[y+1][x] != '-'){
        PacMan['y'] += 1;
        PacMan['dir'] = 'south';
        moved = true;
      }
    }
    else if(key_code == 100){
      if(level[y][x+1] != 2){
        PacMan['x'] += 1;
        PacMan['dir'] = 'east';
        moved = true;
        if(PacMan['x'] == 25){
          PacMan['x'] = 1;
        }

      }
    }

    if(moved){
      level[PacMan['y']][PacMan['x']] = 'p_' + PacMan['dir'];
      level[y][x] = 0;
      displayLevel();
    }
  }
  
  $(document).on('keypress', function(e){
    key = e.keyCode;
    handleKeys(key);
    
  })
  var level = createLevel();

  var PacMan = {
    x: 12,
    y: 13,
    dir: 'west',
  }

  level[PacMan['y']][PacMan['x']] = 'p_west';
  placeGhosts(level);
  displayLevel();

});

