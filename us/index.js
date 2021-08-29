document.body.onload = () => {
  'use strict';
  for( let i = 0; i < 6; i++)
  {
    for( let j = 0; j < 5; j++)
    {
      let newDiv = document.createElement("div");
      newDiv.className = 'star';
      newDiv.style.left = ((148*i))+ 'px';
      newDiv.style.bottom = (445 - (113*j)) + 'px';
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
      newDiv.style.left = ((148*i) - 72.5)+ 'px';
      newDiv.style.bottom = (498 - (113*j)) + 'px';
      let currentDiv = document.getElementById("block");
      document.body.insertBefore(newDiv, currentDiv);
    }
  }
};
