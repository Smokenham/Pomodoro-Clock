

$(document).ready(function() {
	
	var main =$('#mainSec');
	var breakOutput =$('#breakOutput');
	var sessionOutput =$('#sessionOutput');
	var breakMinusButton =$("button[name='minusButtonBreak']")
	var breakPlusButton =$("button[name='plusButtonBreak']")
	var sessionMinusButton =$("button[name='minusButtonSession']")
	var sessionPlusButton =$("button[name='plusButtonSession']")
	var activeSessionOutput = $('#activeSessionOutput');
	var activeSessionState = false;
	var activeBreakState = false;
	var breakLength = 5;
	var sessionLength = 25;
	var activeSession = 25;
	var activeBreak = 5;
	var intervalId = 0;
	var animationIntervalId = 0;
	var displayed = "session";
	var notification = new Audio("notification.mp3")
	notification.volume = 0.5;
	
	
	
	breakOutput.html(breakLength);
	sessionOutput.html(sessionLength);
	activeSessionOutput.html("<h3> Session: " + activeSession + "</h3>");
	breakMinusButton.click(breakMinusButtonWasClicked);
	breakPlusButton.click(breakPlusButtonWasClicked);
	sessionMinusButton.click(sessionMinusButtonWasClicked);
	sessionPlusButton.click(sessionPlusButtonWasClicked);
	activeSessionOutput.click(sessionBigButtonWasClicked);	

	function breakMinusButtonWasClicked(){
		
		// cant make the timer go below 0. Make sure nothing is running
		//next time me look here. what to do with the logics of button press and states. too stoned zzz gl hf
		
		if(breakLength !== 0 && activeBreakState == false && activeSessionState == false){
		
		breakLength = breakLength - 1;
		activeBreak = breakLength;
		breakOutput.html(breakLength);
		
		if(displayed == "break"){
		activeSessionOutput.html("<h3> Break: " + activeBreak + "</h3>");
		}
		
		}
	}
	
	function breakPlusButtonWasClicked(){
	if(activeBreakState !== true && activeSessionState !== true){		
	breakLength = breakLength + 1;
	activeBreak = breakLength;
	breakOutput.html(breakLength);
	if(displayed == "break"){
	activeSessionOutput.html("<h3> Break: " + activeBreak + "</h3>");
	}
	}		
	}
	
	function sessionMinusButtonWasClicked(){
		if(sessionLength !== 0 && activeBreakState !== true && activeSessionState !== true){		
		sessionLength = sessionLength - 5;
		activeSession = sessionLength;
		sessionOutput.html(sessionLength);
		if(displayed == "session"){
		activeSessionOutput.html("<h3>Session: " + activeSession + "</h3>");
		}
		}
			
	}
	
	function sessionPlusButtonWasClicked(){
	if(activeBreakState !== true && activeSessionState !== true){	
	sessionLength = sessionLength + 5;
	activeSession = sessionLength;
	sessionOutput.html(sessionLength);
	if(displayed == "session"){
	activeSessionOutput.html("<h3>Session: " + activeSession + "</h3>");
	}
	}		
	}
	
		
	
		
	function sessionBigButtonWasClicked(){
		if(activeSessionState == false && activeBreakState == false){
			animateActiveSessionOutput();
			//nothing happening so start the clock
			if (displayed == "session"){
			intervalId = setInterval(countDownSession, 1000);
			
			}
			else{
				intervalId = setInterval(countDownBreak, 1000);
				
			}
		}
		
		else if(activeSessionState == true){
			//pause session
				activeSessionState = false;
				clearInterval(intervalId);
				stopAnimatingActiveSessionOutput();
		}
		
		else if(activeBreakState == true){
			//pause break
			activeBreakState = false;
			clearInterval(intervalId);
			clearInterval(animationIntervalId);
			stopAnimatingActiveSessionOutput();
		}
	}


	
		function countDownSession(){
			
			//if there is still time on the clock
		if(activeSession >= 0){
			activeSessionState = true;
			
			displayed = "session";	
			activeSessionOutput.html("<h3>Session: " + activeSession + "</h3>");
			activeSession = activeSession - 1;	
		}
		
		//time ran out. switch states, stop looping, and begin counting down the break
		else{
			notification.play();
			activeSessionState = false;	
			activeBreakState= true;
			clearInterval(intervalId);
			intervalId = setInterval(countDownBreak, 1000);
		}
		
		
	}
	
		function countDownBreak(){
		if(activeBreak >= 0){
		activeBreakState = true;
		
		displayed = "break";		
		activeSessionOutput.html("<h3>Break: " + activeBreak + "</h3>");
		activeBreak = activeBreak - 1;
		}
		else{
			
			notification.play();
			activeBreakState = false;
			activeSessionState = true;			
			clearInterval(intervalId);
			
			activeSession = sessionLength;
			activeBreak = breakLength;
			intervalId = setInterval(countDownSession, 1000);
			
		}
		
		
	}
	
function animateActiveSessionOutput(){
		//lol trippy
var colors = new Array(
  [62,35,255],
  [60,255,60],
  [255,35,98],
  [45,175,230],
  [255,0,255],
  [255,128,0]);

var step = 0;
//color table indices for: 
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0,1,2,3];

//transition speed
var gradientSpeed = 0.002;

function updateGradient()
{
  
  if ( $===undefined ) return;
  
var c0_0 = colors[colorIndices[0]];
var c0_1 = colors[colorIndices[1]];
var c1_0 = colors[colorIndices[2]];
var c1_1 = colors[colorIndices[3]];

var istep = 1 - step;
var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
var color1 = "rgb("+r1+","+g1+","+b1+")";

var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
var color2 = "rgb("+r2+","+g2+","+b2+")";

 $(activeSessionOutput).css({
   background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
    background: "-moz-linear-gradient(left top, "+color1+" 0%, "+color2+" 100%)"});
  
  step += gradientSpeed;
  if ( step >= 1 )
  {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];
    
    //pick two new target color indices
    //do not pick the same as the current one
    colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    
  }
}

animationIntervalId = setInterval(updateGradient,10);
		
		
	}
	
	function stopAnimatingActiveSessionOutput(){
		clearInterval(animationIntervalId);
		activeSessionOutput.css("background", "#000");
	}
	
	
		
	
	
	
	

	

	
});
	



	
	
	
   
