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

let answers=document.querySelectorAll(".answers");

let Results=[];
let Answer;
let checkanswer=[];
let RightAnswers=[];
let Rightexplanation=[];

btnNext.onclick=()=>{
   if(compt<2){
    compt++;
    if(compt==2){
        btnNext.style.display="none";
        corectAnswears();
    }
    if(compt==1){
        Getdata();
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
// the progress bar
let incrementRange=document.querySelector(".increment-range");
let index=0;
let radioQuestion=document.querySelectorAll(".radio-question");
let checkQuestion=document.querySelectorAll(".check-question");
let score=document.querySelector(".scrore");
let container=document.querySelector(".container");
let scoreNumber=document.querySelector(".score-number");
let scoreStaut=document.querySelector(".score-staut");
let allAnswears=document.querySelector(".all-answears");
function Getdata()
{
 var  mydata=new XMLHttpRequest();

   mydata.onreadystatechange = function(){
    if(this.readyState === 4 && this.status === 200){
        let quizeObject = JSON.parse(this.responseText);
        let numberOfquestion=quizeObject.length;
        showdata(quizeObject[tab1[index]],numberOfquestion);
        Countdown(20,numberOfquestion);
        incrementRange.style.width=`${(index+1)*10}%`;
        totalQuestion.innerHTML=numberOfquestion;
        curentQuestion.innerHTML=index+1;
        nextQuestion.onclick=()=>{ 
            if(index==numberOfquestion-2){
                nextQuestion.innerHTML="finish";
            }else if(index==numberOfquestion-1){
                score.style.display="block";
                container.style.display="none";
                btnNext.style.visibility="visible";
                btnNext.innerHTML="show all ansewers";
                nextQuestion.style.visibility="hidden";
                scoreNumber.innerHTML+=scoreresult(quizeObject)+"/10";
                if(scoreresult(quizeObject)==10){
                    scoreStaut.innerHTML+="Exelent";
                }else if(scoreresult(quizeObject)<10 && scoreresult(quizeObject)>=7){
                    scoreStaut.innerHTML+="Good";
                }else if(scoreresult(quizeObject)<7 && scoreresult(quizeObject)>=5){
                    scoreStaut.innerHTML+="tolerable";
                }else if(scoreresult(quizeObject)<5 && scoreresult(quizeObject)>=3){
                    scoreStaut.innerHTML+="weak";
                }else{
                    scoreStaut.innerHTML+="very weak";
                }
            }
            if(index==1 || index==6  || index==8){
                for(let j=0;j<4;j++){
                    if(checkQuestion[j].checked==true){
                        Answer=quizeObject[tab1[index]]["Réponse"+(j+1)];
                        checkanswer.push(Answer);
                        checkQuestion[j].checked=false;
                    }
                }
                Results.push(checkanswer);
                checkanswer=[];
            }else{
                let x=0;
                for(let j=0;j<4;j++){
                    if(radioQuestion[j].checked==true){
                        Answer=quizeObject[tab1[index]]["Réponse"+(j+1)];
                        Results.push(Answer);
                        radioQuestion[j].checked=false;
                        x++;
                }      
            }
            if(x==0){
                Results.push("empty");
            }
            }
            console.log(index)               
            console.log(Results);
            index++;
            clearInterval(counInterval);
            Countdown(20,numberOfquestion);
            if(index<numberOfquestion){
                curentQuestion.innerHTML=index+1;
                incrementRange.style.width=`${(index+1)*10}%`;
            }
            showdata(quizeObject[tab1[index]],numberOfquestion);
        }
    }


   }
   mydata.open('GET',"../assets/data.json",true);
   mydata.send();
}
let curentQuestion=document.querySelector(".curent-question");
let totalQuestion=document.querySelector(".total-question");




for(let i=0;i<4;i++){
    checkQuestion[i].style.display="none";
}


function showdata(obj,allquestions){
    let answearA=document.querySelector("#Answear-a");
    let answearB=document.querySelector("#Answear-b");
    let answearC=document.querySelector("#Answear-c");
    let answearD=document.querySelector("#Answear-d");
    let myQuestion=document.querySelector(".my-Question");

  
    if(index==1 || index==6  || index==8){
        for(let i=0;i<4;i++){
            radioQuestion[i].style.display="none";
            checkQuestion[i].style.display="block";
            answers[i].setAttribute("for",`yes${i}`);
        }
    }else{
        for(let i=0;i<4;i++){
            radioQuestion[i].style.display="block";
            checkQuestion[i].style.display="none";
            answers[i].removeAttribute("for",`yes${i}`);
        }
    }
    if(index<allquestions){
        answearA.innerHTML=obj['Réponse1'];
        answearB.innerHTML=obj['Réponse2'];
        answearC.innerHTML=obj['Réponse3'];
        answearD.innerHTML=obj['Réponse4'];
        myQuestion.innerHTML=obj["Quesion"];
        Rightexplanation.push(obj['explanation']);
        RightAnswers.push(obj['RightEsponse']);
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
            insidecircle.style.background=`conic-gradient(#1e3a8a ${timeing * 18}deg,#dedede 0)`;
           }
           timeing--;
           if(timeing<0){
            clearInterval(counInterval);
             if(index==allquestions-1){
                nextQuestion.style.visibility="hidden";
                btnNext.style.visibility="visible";
                btnNext.innerHTML="Show Results";
             }else{
                nextQuestion.click();
             }
           }
        },1000)
    }
    

}
function scoreresult(obj){
    let temp=0;
    for(let k=0;k<Results.length;k++){
        if(Results[k]==obj[tab1[k]].RightEsponse){
            temp++;
        }
    }
    return temp;
}
function corectAnswears(){
    for(let r=0;r<Results.length;r++){
        if(RightAnswers[r]==Results[r]){
            allAnswears.innerHTML+=`
            <p class="font-bold flex flex-start text-xl">The Question:${r+1}</p>
            <p class="green-answear flex flex-start">your answear: ${Results[r]}</p>
            <p class="green-answear flex flex-start">RightAnswer : ${RightAnswers[r]}</p>
            <p class="blue-exiplanation flex flex-start ">explanation : ${Rightexplanation[r]}</p>`;
        }else{
            allAnswears.innerHTML+=`
            <p class="font-bold flex flex-start text-xl">The Question:${r+1}</p>
            <p class="red-answear flex flex-start">your answear: ${Results[r]}</p>
            <p class="green-answear flex flex-start">RightAnswer : ${RightAnswers[r]}</p>
            <p class="blue-exiplanation flex flex-start">explanation : ${Rightexplanation[r]}</p>`;
        }
        
    }
}



