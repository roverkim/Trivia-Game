$(document).ready(function() {


// Object variable to store space questions
var space = {first: {question: "How many stars are in the Milky Way? " , answer: "More than 100 billion!", option1:"100 Million", option2:"100 billion", option3:"100 Trillion", option4:"100 Quadrillion", correctOption:"100 billion", picture: "assets/images/milky_Way.gif"},
second: {question: "How much time does sun rays take to reach earth? " , answer: " Aproximately 8 minutes.", option1:" 8 mins", option2:" 15 mins", option3:" 20 mins", option4:" 60 seconds", correctOption:"8 mins", picture: "assets/images/sun_Rays.gif"},
third: {question: "Which planet is nearest to earth?" , answer: " Venus is the closest planet to Earth", option1:"Mars", option2:"Jupiter", option3:"Mercury", option4:"Venus", correctOption:"Venus", picture: "assets/images/venus.gif"},
forth: {question: "What is the age of Moon?" , answer: "Aproximately 4.527 billion years!", option1:"3 billion years", option2:" 6 billion years", option3:"100 million years", option4:" 4.5 billion years", correctOption:" 4.5 billion years", picture: "assets/images/moon.gif"},
fifth: { question: "What is the Orbital period of Moon?" , answer: " The obital period of the moon is 27 days ", option1:" 1 month", option2:" 60 days ", option3:" 27 days", option4:" 45 days", correctOption:" 27 days", picture: "assets/images/orbital_Moon.gif"},
sixth: {question: "When was the Pluto reclassified from a planet to a dwarf planet?" , answer: "In the year 2006", option1:"2007", option2:"2006", option3:"2005", option4:"2008", correctOption:"2006", picture: "assets/images/pluto.gif"},
seventh: {question: "At which speed the Andromeda Galaxy is approaching the Milky Way? " , answer: "At approximately hundred to hundred and forty kilometers per second. ", option1:" 100 - 120 km/s", option2:"80 - 100 km/s", option3:"500 - 800 km/s", option4:"100 - 140 km/s", correctOption:"100 - 140 km/s", picture: "assets/images/andromeda_Galaxy.gif"},
eighth: {question: "What are the notable satellites of Pluto? " , answer: "Charon, Nix, Hydra, including Kerberos and Styx are all notable notable satellites ", option1:"Charon", option2:"Nix", option3:"Hydra", option4:"Trick Question", correctOption:"Trick Question", picture: "assets/images/pluto1.gif"}
};

///////////// Variables //////////////////////
// Random question variable that stores a random key
var randomQuestion;

// Current question object that gets assigned a random question
var currentQuestion = {};

// Player's answer
var choosenAnswer;

// Variables for overall wins, loss and timeOut. They are incremented after each round.
var wins = 0;
var loss = 0;
var timeOut = 0;

// Variables for keeping track of current wins, loss, timeOut Used by the displayPicture function to decern which message to show. Variables rest after each round.
var currentWins = 0;
var currentLoss = 0;
var currentTimeOut = 0;

// Variable seconds to store number of seconds
var seconds = 0;

// Variable for keepiny track of overall game rounds. Each game lasts 5 rounds
var gamePlay = 0;
///////////// End of Variables //////////////////////

/////////////////////////////// Functions ////////////////////////////////

// Function for button click which displays question and hides start button
function start(){
  console.log("Start button is working");
  // hide start button
  $(".btn_Start").hide();
  // Shows buttons
  $(".btn_Common").show().css("display", "grid");
  // Calls the choose function to display question and answers
  choose();
};
////////////////////////////////////////////////////////////////////////////

// Function for choosing a random question and displaying the question and options.
function choose(){
  // Condition for executing choosing a question

  if (gamePlay != 5){
      console.log("Choose function is being  called");
    // Shows the first second and forth buttons after they get hidden when the display picture function is called or game over condition is met
    $(".btn_First, btn_Second, .btn_Forth").show();
    $(".btn_First, .btn_Second, .img-responsiv, .btn_Forth").show();
    // $(".btn2").show();
    $(".img-responsiv").detach();
    $(".btn_Second").html("<btnText class = 'btn2 center'> Second </btnText>");
    // Calls the timer function to display seconds remaining
    startTimer();
    // Chooses a random object and stores the choosen key object in randomQuestion
    randomQuestion = Object.keys(space)[Math.floor(Math.random()*Object.keys(space).length)];
    //assign the index of the random object into a variable
    currentQuestion = space[randomQuestion];
    //Displays the question
    $(".question_Text").text("Question: "+ currentQuestion.question);
    // Displays the options to the player in various buttons
    $(".btn1").html("<b style = 'color: white;'> Option 1: </b>"+ currentQuestion.option1);
    $(".btn2").html("<b style = 'color: white;'> Option 2: </b>"+currentQuestion.option2);
    $(".btn3").html("<b style = 'color: white;'> Option 3: </b>"+currentQuestion.option3);
    $(".btn4").html("<b style = 'color: white;'> Option 4: </b>"+currentQuestion.option4);
    // Increment gameplay to keep track of current round
    gamePlay++;
    console.log("Game play round:" + gamePlay);

  }

  else if (gamePlay == 5) {
    // function to display
    function gameOver(){
      console.log("Game over condition is being met");
      // Display Game over message
      $(".question_Text").text("Game over. Here's how you did!");
      $(".btn3").html("Wins: "+ wins +"</br>" + "losses: "+ loss +"</br>" +  " Questions not answered: " + timeOut);
      // Hides the first and forth button
      $(".btn_First, .btn_Second, .img-responsiv, .btn_Forth").hide();
      // Display reset game button
      $(".btn_Reset").show().css("display", "grid");
    }
    // Delays the execution of the game over function
    var gameOverVariable = setTimeout(gameOver, 2000);
  }

};
////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function for changing Timer text
function startTimer(){
  //Assigns seconds 5 seconds each time startTimer function is called
  seconds = 5;
  console.log("Timer is running");
  // Replaces the text everytime this function is called
  function time() {
    // Seconds gets reduced by one each time the function is called
    seconds--;
    console.log("Taking away 1 second");
    $(".timer_Text").html("Time left to pick an answer: " + seconds );

    // Condition to stop the timer
    // If win or lose
    if(currentWins == 1 || currentLoss == 1){
      console.log("win 1 Timer has been stopped");
      // Stops the time function
      clearInterval(handle);
      // Calls the correct function
      correct();
      // Reset currentWins
      currentWins = 0;
      // Reset currentLoss
      currentLoss = 0;
    } // If time is up
    else if(seconds == 0){
      console.log("0 Seconds condition has been met");
      console.log("Timer has been stopped");
      // Stops the time function
      clearInterval(handle);
      // Calls the correct function
      correct();
      // Reset currentTimeOut
      currentTimeOut = 0;
    }
  };
  // Assigns the time function to a variable so that clearInterval has a captured value, Time function is excuted every 1000 seconds
  var handle = setInterval(time, 1000);
};
///////////////////////////////////////////////////////////////////////////////////

// Function for evaluating correct answers that calls on displayCorrect Function
function correct(){
  console.log("Correct function is being called");
  console.log("seconds is: " + seconds);
  // Condition for evaluating if answer is correct
  if(choosenAnswer === currentQuestion.correctOption){
    console.log("Correct Win");
    currentWins++;
    // Execute correct function
    displayCorrect();
  }   // Condition for evaluating if answer is wrong
  else if (choosenAnswer !== currentQuestion.correctOptione) {
    console.log("Current Wrong");
    currentLoss++;
    // Execute correct function
    displayCorrect();
  }  // Condition for evaluating if time out has reached 0
  else if (seconds == 0) {
    console.log("Current Time out");
    currentTimeOut++;
    // Execute correct function
    displayCorrect();
  }
};

////////////////////////////////////////////////////////////
// Function for displaying correct answers
function displayCorrect(){
  console.log("display correct is being called");
  //Displays correct Picture
  function displayPicture(){
    console.log("Display Function is being called")
    // Hides the first and forth button
    $(".btn_First, .btn_Forth").hide();
    $(".btn_Second ").html("<img class = 'img-responsiv' style = 'height: 100%; width: 100%;' src=\""+ currentQuestion.picture + "\"" + " alt = 'picture'>" + "</img>" );
    $(".btn3").html("Wins: "+ wins +"</br>" + "losses: "+ loss +"</br>" +  " Questions not answered: " + timeOut);
  };

  // Condition for win
  if(currentWins == 1 ){
    // Display correct message
    $(".question_Text").text("Correct! The correct answer is: "+ currentQuestion.answer);
    // Increments overall win
    wins++;
    displayPicture();
    // Display's next question
    setTimeout(choose, 5000);

  }  // Condition for loss
  else if (currentLoss == 1) {
    // Display wrong message
    $(".question_Text").text("Wrong:(! The correct answer is: "+ currentQuestion.answer);
    // Increments overall win
    loss++;
    displayPicture();
    // Display's next question
    setTimeout(choose, 5000);

  }  // Condition for timeOut
  else if (currentTimeOut == 1) {
    // Display time's up message
    $(".question_Text").text("Time's up! The correct answer is: "+ currentQuestion.answer);
    // Increments overall timeOut
    timeOut++;
    displayPicture();
    // Display's next question
    setTimeout(choose, 5000);
  } // Condition for Win or losses
};
/////////////////////////////////////////////////////////////////////////////////////////////
// Function for game reset
function reset(){
  console.log("Reset Function is being called");
  // Overides the previous scores
  wins = 0;
  loss = 0;
  timeOut = 0;
  gamePlay = 0;
  currentWins = 0;
  currentLoss = 0;
  currentTimeOut = 0;
  seconds = 0;

  // Hides the reset button
  $(".btn_Reset").hide();
  // Executes Choose
  choose();
};


/////////////////////////////// End of Functions ////////////////////////////////

////////////////////// Event Listners ///////////////

// Player clicks on the Start Button
$(".btn_Start").on("click", function(){
// Calls the start function to start the game
start();
});

// Player clicks on the Reset Button
$(".btn_Reset").on("click", function(){
// Calls the start function to start the game
reset();
choose();
});

// Player clicks on the Individual buttons//
// Button 1
$(".btn_First").on("click", function(){
  console.log("Button 1 has been clicked");
  // Assigns the choosen variable to the button clicked
  choosenAnswer = currentQuestion.option1;
  // Calls the function correct to evaluate choice
  correct();
});
// Button 2
$(".btn_Second").on("click", function(){
  console.log("Button 2 has been clicked");
  choosenAnswer = currentQuestion.option2;
  // Calls the function correct to evaluate choice
  correct();
});
// Button 3
$(".btn_Third").on("click", function(){
  console.log("Button 3 has been clicked");
  choosenAnswer = currentQuestion.option3;
  // Calls the function correct to evaluate choice
  correct();
});
// Button 4
$(".btn_Forth").on("click", function(){
  console.log("Button 4 has been clicked");
  choosenAnswer = currentQuestion.option4;
  // Calls the function correct to evaluate choice
  correct();
});

////////////////////// End of Event Listners ///////////////

































// End of document.ready()
});
