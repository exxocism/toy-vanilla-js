document.body.onload = () => {
  'use strict';
  for( let i = 0; i < 6; i++)
  {
    for( let j = 0; j < 5; j++)
    {
      let newDiv = document.createElement("div");
      newDiv.className = 'star';
      newDiv.style.left = ((77.5*i) + 425 )+ 'px';
      newDiv.style.bottom = (680 - (62.5*j)) + 'px';
      let currentDiv = document.getElementById("block");
      document.body.insertBefore(newDiv, currentDiv);
    }
  }

  for( let i = 1; i <= 5; i++)
  {
    for( let j = 1; j <= 4; j++)
    {
      let newDiv = document.createElement("div");
      newDiv.className = 'star';
      newDiv.style.left = ((77.5*i) + 386)+ 'px';
      newDiv.style.bottom = (711 - (62.5*j)) + 'px';
      let currentDiv = document.getElementById("block");
      document.body.insertBefore(newDiv, currentDiv);
    }
  }
};
