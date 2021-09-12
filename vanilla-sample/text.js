function telephoneCheck(str) {
  
  let tel = [
    /^(1[\s-])*[0-9]{3}([-\s])[0-9]{3}\2[0-9]{4}$/,
    /^(1[\s-]*)*\([0-9]{3}\)[\s]{0,1}[0-9]{3}[-\s][0-9]{4}$/,
    /^[0-9]{10}$/
  ];
  
  return tel.some( (e, i) => {
    
    if ( e.test( str ) ) 
    {
      console.log( i + "th index called");
    }
    return e.test( str );
  } );
}

//console.log(telephoneCheck("555-555-5555"));
console.log(telephoneCheck("(555-555-5555"));