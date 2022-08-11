buttonColors=["red", "blue", "green", "yellow"]
let randomNum
gamePatten=[];
userPatten=[];
gameState=false
levelCounter=0
let clickState=true



//game start
 $(document).keypress(function (e) { 
     if (gameState===false) {
         nextSequence();
     }
     gameState=true
 });  

function nextSequence() {

    userPatten=[]
    //random num gen
    var randomNum= Math.floor(Math.random()*4)   
    randomColor=buttonColors[randomNum]
    gamePatten.push(randomColor)      
    console.log(`gamePatten:${gamePatten}`);
    //audio playing
    audioPlayer(randomColor);
    // animation
  
    animation(`#${randomColor}`)
    //h1 changer
    levelCounter++
    $('h1').html(`Level ${levelCounter}`);
   
    
}

function animation(button) {
    $(button).fadeOut(200).fadeIn(200);
    $(button).addClass("pressed")
    setTimeout(() => {
        $(button).removeClass("pressed")        
    }, 100);
    
}

//user input
if (clickState===true) {
    $(".btn").click(function (e) {
        //animation
        animation(this);
        // push
        clickBtn=this.id
        userPatten.push(clickBtn);
        console.log(`userPatten:${userPatten}`);
        //audio playing
        audioPlayer(clickBtn);
        //checker
        answerChecker()
    });    
}


function answerChecker() {
    if (userPatten[userPatten.length-1]===gamePatten[userPatten.length-1]) {
        console.log('sucessfull');
        if (userPatten.length===gamePatten.length) {
            gamePattenRepeter();
        }        
    } else {
        clickState=false
        console.log('wrong');
        //audio
        audioPlayer(`wrong`);
        //body color changer
        $("body").addClass('game-over');
        setTimeout(()=>{
            $('body').removeClass(`game-over`)
        },100)
        $(`#level-title`).html(`Game Over, Press Any Key to Restart`)
        gameRestarter();
    }
    
}

function gameRestarter() {
    userPatten=[]
    gamePatten=[]
    levelCounter=0
    gameState=false
    clickState=true
}



function audioPlayer(audioFile) { 
    let audio=new Audio(`sounds/${audioFile}.mp3`)    
    audio.play();
    //console.log(audio);
}



function gamePattenRepeter() {
    console.log(`function works`);
    let timeOutAnimationValue=1000;
    let timeOutNextSeqValue1=1500;
    for (const elements of gamePatten) {
        
        timeOutAnimationValue+=500
        timeOutNextSeqValue1+=500
        setTimeout(() => {
            console.log(elements);
            animation(`#${elements}`);
            audioPlayer(elements)
            
        }, timeOutAnimationValue);
            
            
        
        
    }
    setTimeout(() => {
        
        nextSequence();
        
    }, timeOutNextSeqValue1);
    
}