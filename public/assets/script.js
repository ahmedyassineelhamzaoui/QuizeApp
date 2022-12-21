let conditionBlock=document.querySelectorAll(".condition-block");
let compt=0;
conditionBlock[compt].style.display="block";
let i=1;

let btnPrevious=document.querySelector(".btn-previous");
let btnNext=document.querySelector(".btn-next");
let nextQuestion=document.querySelector(".next-question");

btnPrevious.style.visibility="hidden";
nextQuestion.style.display="none";


let cercle=document.querySelectorAll(".cercle");
let progressEmpty=document.querySelector(".progress-empty");
let progressFull=document.querySelector(".progress-full");
let image=document.querySelector("#image");

cercle[0].style.background="#015958";
cercle[0].style.color="#C7FFED";
btnNext.onclick=()=>{
   if(compt<2){
    compt++;
    if(compt==2){
        btnNext.style.display="none";
    }
    if(compt==1){
        nextQuestion.style.display="block";
        btnNext.style.visibility="hidden";
    }
    image.style.display="none"
    // content of divs
    conditionBlock[compt].style.display="block";
    conditionBlock[compt-1].style.display="none";
    // end
    cercle[compt].style.background="#015958";
    cercle[compt].style.color="#C7FFED";
    cercle[compt-1].innerHTML='<svg class="h-8 w-8 text-green-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M5 12l5 5l10 -10" /></svg>'
    cercle[compt-1].style.background="#015958";
    progressFull.style.width=`${compt*5*10}%`;
}
}
// btnPrevious.onclick=()=>{
//     // if on click in btnprevious btnGo display none and btnNext display block
//     btnNext.style.display="block";
//     // end
//     if(compt>0){
//         if(i>100){
//             i=1;
//         }
//         compt--;
//         // content of divs
//         conditionBlock[compt+1].style.display="none";
//         conditionBlock[compt].style.display="block";
//         //end 
//         cercle[compt+1].style.background="aliceblue";
//         cercle[compt+1].style.color="black";

//         cercle[compt].style.background="#015958";
//         cercle[compt].innerHTML=`${compt+1}`;
//         progressFull.style.width=`${100/((compt+1)*i)}%`;
//         i*=100;
//         if(compt==0){
//             btnPrevious.style.visibility="hidden";
//             image.style.display="block"
//         }
//     }
// }


///// 

let tab=[0,1,2,3,4,5,6,7,8,9];
let tab1=[];
let y=0;
let x=tab.length;
while(x--){
    y=Math.floor(Math.random()*x)
    tab1.push(tab[y]);
    tab.splice(y,1);
}

let index=0;
function Getdata()
{
 var  mydata=new XMLHttpRequest();

   mydata.onreadystatechange = function(){
    if(this.readyState === 4 && this.status === 200){
        let quizeObject = JSON.parse(this.responseText);
        let numberOfquestion=quizeObject.length;
        showdata(quizeObject[tab1[index]],numberOfquestion);
        Countdown(20,numberOfquestion);
        nextQuestion.onclick=()=>{
            index++;
            if(index==numberOfquestion-1){
                nextQuestion.style.display="none";
                btnNext.style.visibility="visible";
                btnNext.innerHTML="Show Results";
            }
            showdata(quizeObject[tab1[index]],numberOfquestion);
        }
    }
   }
   mydata.open('GET',"../assets/data.json",true);
   mydata.send();
}
Getdata();
let radioQuestion=document.querySelectorAll(".radio-question");
   
let checkQuestion=document.querySelectorAll(".check-question");
for(let i=0;i<4;i++){
    checkQuestion[i].style.display="none";
}


function showdata(obj,allquestions){
    let answearA=document.querySelector("#Answear-a");
    let answearB=document.querySelector("#Answear-b");
    let answearC=document.querySelector("#Answear-c");
    let answearD=document.querySelector("#Answear-d");

  
    if(index==1 || index==6  || index==8){
        for(let i=0;i<4;i++){
            radioQuestion[i].style.display="none";
            checkQuestion[i].style.display="block";
        }
    }else{
        for(let i=0;i<4;i++){
            radioQuestion[i].style.display="block";
            checkQuestion[i].style.display="none";
        }
    }
    if(index<allquestions){
        answearA.innerHTML=obj['RéponseA'];
        answearB.innerHTML=obj['RéponseB'];
        answearC.innerHTML=obj['RéponseC'];
        answearD.innerHTML=obj['RéponseD'];
    }
}

function Countdown(timeing,allquestions){
    let  insidecircle=document.querySelector(".inside-cercle");
    let dateCrono=document.querySelector("#date-crono");
    if(index<allquestions){
        counInterval=setInterval(function(){
            if(timeing<10){
            dateCrono.innerHTML=`0${timeing}`;

            }else{
                dateCrono.innerHTML=timeing;
            }
           if(timeing>=4 && timeing<6){
            insidecircle.style.background=`conic-gradient(orange ${timeing * 18}deg,#dedede 0)`;
           }else if(timeing<4){
            insidecircle.style.background=`conic-gradient(red ${timeing * 18}deg,#dedede 0)`;
           }else{
            insidecircle.style.background=`conic-gradient(green ${timeing * 18}deg,#dedede 0)`;
           }

           timeing--;
           if(timeing<0){
            clearInterval(counInterval);
           }


        },1000)
    }
    

}