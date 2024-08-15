var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];

$(".btn").on("click",function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);

    var randomNumber=Math.floor(Math.random()*4)
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);


}

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

var started=false;
var level=0;

$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length==gamePattern.length){
            setTimeout(nextSequence,1000);
        }
    }else{
        console.log("wrong");
        
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },2000);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}




// function makeSound(key){
//     switch(key){
//         case "red":
//             var audio=new Audio("sounds/red.mp3");
//             audio.play();
//             break;

//         case "green":
//             var audio=new Audio("sounds/green.mp3");
//             audio.play();
//             break;

//         case "blue":
//             var audio=new Audio("sounds/blue.mp3");
//             audio.play();
//             break;

//         case "yellow":
//             var audio=new Audio("sounds/yellow.mp3");
//             audio.play();
//             break;

//         default:
//             console.log(key);
//             break;


//     }
// }

//nextSequence();
// var temp="green";
// $("#"+temp).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

