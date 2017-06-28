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
      [2,1,1,2,2,1,1,1,1,1,1,1,1],
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

    level[13][12] = 'p';

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
        else if(level[j][k] == 'p'){
          output +="\n\t<div class='empty pacman'></div>";
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
    if(key_code == 13){
      document.getElementsByClassName('start_text').hide()
      
    }
  }
  
  $(document).on('keypress', function(e){
    key = e.keyCode;
    handleKeys(key);
    
  })
  var level = createLevel();
  placeGhosts(level);
  displayLevel();

});

