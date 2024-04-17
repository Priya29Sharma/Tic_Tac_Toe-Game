let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#New-Game");
let msgContainer=document.querySelector(".msg-container");
let msg =document.querySelector("#msg")



let turnO= true;   //player//
let count=0;

//defining the all winning possibilities//

const winPatterns =
[
[0,1,2],
[0,3,6],
[0,4,8],
[1,4,7],
[2,5,8],
[2,4,6],
[3,4,5],
[6,7,8]];


//to reset the gamee
const NewGame=()=>{
    turnO=true;
    count = 0;
    enableBoxes()
    msg.innerText="turn of player O"
    boxes.forEach((box,index)=>{
    box.classList.remove("winner")
    });

}


///function in case of draw condition//
const gameDraw = () => {
    msg.innerText = "Game was a Draw.";
   
    disableBoxes();
  };


// function to show the turn// 
const showTurn=()=>{
    if(turnO==true){
        msg.innerText="turn of player X"
        
    }
    else{
        msg.innerText="turn of player O"
    }

    
 }
//adding functionality to the boxes on click and at every step we are checking the winner//
boxes.forEach((box)=>{
    box.addEventListener('click',() => {
       
       if(turnO==true){
        showTurn();
        box.innerText="O";
        turnO=false;
        
       }else{
        showTurn();
        box.innerText="X";
        turnO=true;
       }
       box.disabled=true;


//to check winner//
    count++;

       let isWinner = checkWinner();
   
       if (count === 9 && !isWinner) {
         gameDraw();
       }
    });
});



 
// after the winner disabled all thr boxes//
 const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
 }


 //to reset the game enable all the boxes//
 const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText=""
    }
 }


 //function to show thw winner//
 const showWinner=(winner)=>{
     msg.innerText=`Congratulations,Winner is ${winner}`
    
     disableBoxes()
     
    

 }

 //////fireeeeeeeeeeeeeeeeeeeeeeeeeeeeeee

 const fireConfetti = () => {
    var confettiSettings = {
        spread: 2000,
        startVelocity: 55,
        ticks: 150,
        zIndex: 2000,
        particleCount: 200 
    };
    confetti(confettiSettings);
};

//checkwinner at every click//
const checkWinner=()=>{
    for(let pattern of winPatterns){
        
        let pos1val=boxes[pattern[0]].innerText;
        let pos2val=boxes[pattern[1]].innerText;
        let pos3val=boxes[pattern[2]].innerText;
        if(pos1val!=""&&pos2val!=""&&pos3val!=""){
            if(pos1val===pos2val&&pos2val===pos3val){
                boxes[pattern[0]].classList.add("winner") 
                boxes[pattern[1]].classList.add("winner") 
                boxes[pattern[2]].classList.add("winner") 
                
                showWinner(pos1val);
                ////this is the giff ////////////////////////
                // confetti();
                fireConfetti();
            
            

                

                return true;
            }
            
            
        }
        
        
    }
  
}

//reset the game using New Game button//
resetBtn.addEventListener("click",NewGame)
