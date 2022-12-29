let conditionBlock = document.querySelectorAll(".condition-block");
let compt = 0;
conditionBlock[compt].style.display = "block";
let i = 1;

let btnNext = document.querySelector(".btn-next");
let nextQuestion = document.querySelector(".next-question");
// nextQuestion.disabled=true;
nextQuestion.style.visibility = "hidden";
let  =document.querySelector(".body-content");

let cercle = document.querySelectorAll(".cercle");
let progressEmpty = document.querySelector(".progress-empty");
let progressFull = document.querySelector(".progress-full");
let image = document.querySelector("#image");

cercle[0].style.background = "black";
cercle[0].style.color = "#ff9900";

let answers = document.querySelectorAll(".answers");
var table=[];
let Results = [];
let Answer;
let checkanswer = [];
let RightAnswers = [];
let Rightexplanation = [];

playAudio=document.querySelector("#play-audio");
audioSource=document.querySelector("#audio-Source");
pauseAudio=document.querySelector("#pause-audio");
pauseAudio.style.display="none";
playAudio.style.display="none";
let click="";
playAudio.onclick=()=>{
    pauseAudio.style.display="block";
    playAudio.style.display="none"
        audioSource.pause();
        click="clicked";
}
pauseAudio.onclick=()=>{
    pauseAudio.style.display="none";
    playAudio.style.display="block"
    audioSource.play();
    
}
let color="black";
let head=document.querySelector("head");
let link=document.querySelector('link');
let lightMode=document.querySelector("#light-mode");
let darkMode=document.querySelector("#dark-mode");
darkMode.style.display="none";
lightMode.onclick=()=>{
    darkMode.style.display="block";
    lightMode.style.display="none";
    color="white";
    link.removeAttribute('href','../css/style.css')
    link.setAttribute('href','../css/dark.css')
    cercle.forEach(cercle =>{
        cercle.style.background="white";
    })
}
darkMode.onclick=()=>{
   lightMode.style.display="block";
   darkMode.style.display="none";
   cercle.forEach(cercle =>{
    cercle.style.background="black";
   })
   color="black";
   link.setAttribute('href','../css/style.css')
   link.removeAttribute('href','../css/dark.css')
}
btnNext.onclick = () => {
    if (compt < 2) {
        compt++;
        if (compt == 2) {
            btnNext.style.display = "none";
            cercle[compt].innerHTML = '<svg class="h-8 w-8 text-orange-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M5 12l5 5l10 -10" /></svg>'
            corectAnswears(table);
        }
        if (compt == 1) {
            Getdata();
            nextQuestion.style.visibility = "visible";
            cercle[compt - 1].innerHTML = '<svg class="h-8 w-8 text-orange-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M5 12l5 5l10 -10" /></svg>'
            btnNext.style.visibility = "hidden";
        }
        image.style.display = "none"
        // content of divs
        conditionBlock[compt].style.display = "block";
        conditionBlock[compt - 1].style.display = "none";
        // end
        cercle[compt].style.background = color;
        cercle[compt].style.color = "#ff9900";
        cercle[compt - 1].style.background = color;
        progressFull.style.width = `${compt * 5 * 10}%`;
    }
}

let contentAudio=document.querySelector(".audio-content");
contentAudio.style.display="none";
// the progress bar
let incrementRange = document.querySelector(".increment-range");
let radioQuestion = document.querySelectorAll(".radio-question");
let checkQuestion = document.querySelectorAll(".check-question");
let score = document.querySelector(".scrore");
let container = document.querySelector(".container");
let scoreNumber = document.querySelector(".score-number");
let scoreStaut = document.querySelector(".score-staut");
let allAnswears = document.querySelector(".all-answears");
let index = 0;

// dark and light mode

// dark and light mode



function Getdata() {
    contentAudio.style.display="block";
    audioSource.play();
    playAudio.style.display="block";
    var mydata = new XMLHttpRequest();
    // nextQuestion.disabled=true;
    mydata.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            quizeObject = JSON.parse(this.responseText);
            quizeObject.sort(function () { return Math.random() - 0.5; });
            table= quizeObject;
            let numberOfquestion = quizeObject.length;
            showdata(quizeObject[index], numberOfquestion);
            Countdown(30, numberOfquestion);
            incrementRange.style.width = `${(index + 1) * 10}%`;
            totalQuestion.innerHTML = numberOfquestion;
            curentQuestion.innerHTML = index + 1;
            answers.forEach(element=>{
                element.addEventListener('click',(e)=>{
                    nextQuestion.disabled=false;
                })
            })
            nextQuestion.onclick = () => {
                audioSource.currentTime = 0;
                if(click==''){
                    audioSource.play();
                }
                nextQuestion.disabled=true;
                if (index == 1 || index == 6 || index == 8) {
                    for (let j = 0; j < 4; j++) {
                        if (checkQuestion[j].checked == true){
                            Answer = quizeObject[index]["Réponse" + (j + 1)];
                            checkanswer.push(Answer);
                            checkQuestion[j].checked = false;
                        }
                    }
                    Results.push(checkanswer);
                    checkanswer = [];
                }else{
                    let x = 0;
                    for (let j = 0; j < 4; j++) {
                        if (radioQuestion[j].checked == true) {    
                            Answer = quizeObject[index]["Réponse" + (j + 1)];
                            Results.push(Answer);
                            radioQuestion[j].checked = false;
                            x++;
                        }
                    }
                    if (x == 0) {
                        Results.push("empty");
                    }
                }
                if (index == (numberOfquestion - 1)) {
                    audioSource.pause()
                    btnNext.style.visibility = "visible";
                    btnNext.innerHTML = "Show Results";
                    nextQuestion.style.visibility = "hidden";
                    console.log(Results)
                    cercle[1].innerHTML = '<svg class="h-8 w-8 text-orange-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M5 12l5 5l10 -10" /></svg>'
                    scoreNumber.innerHTML += scoreresult(quizeObject) + "/10";
                    if (scoreresult(quizeObject) == 10) {
                        scoreStaut.innerHTML += "Exelent";
                    } else if (scoreresult(quizeObject) < 10 && scoreresult(quizeObject) >= 7) {
                        scoreStaut.innerHTML += "Good";
                    } else if (scoreresult(quizeObject) < 7 && scoreresult(quizeObject) >= 5) {
                        scoreStaut.innerHTML += "tolerable";
                    } else if (scoreresult(quizeObject) < 5 && scoreresult(quizeObject) >= 3) {
                        scoreStaut.innerHTML += "weak";
                    } else {
                        scoreStaut.innerHTML += "very weak";
                    }
                }
                index++;
                clearInterval(counInterval);
                Countdown(30, numberOfquestion);
                if (index < numberOfquestion) {
                    curentQuestion.innerHTML = index + 1;
                    incrementRange.style.width = `${(index + 1) * 10}%`;
                }
                showdata(quizeObject[index], numberOfquestion);
            }
        }


    }
    mydata.open('GET', "../assets/data.json", true);
    mydata.send();
}

let curentQuestion = document.querySelector(".curent-question");
let totalQuestion = document.querySelector(".total-question");





function showdata(obj, allquestions) {
    
    for (let i = 0; i < 4; i++) {
        checkQuestion[i].style.display = "none";
    }
   
    let answearA   = document.querySelector("#Answear-a");
    let answearB   = document.querySelector("#Answear-b");
    let answearC   = document.querySelector("#Answear-c");
    let answearD   = document.querySelector("#Answear-d");
    let myQuestion = document.querySelector(".my-Question");


    if (index == 1 || index == 6 || index == 8) {
        for (let i = 0; i < 4; i++) {
            radioQuestion[i].style.display = "none";
            checkQuestion[i].style.display = "block";
            answers[i].setAttribute("for", `yes${i}`);
        }
    }
    else
    {
        for (let i = 0; i < 4; i++) {
            radioQuestion[i].style.display = "block";
            checkQuestion[i].style.display = "none";
            answers[i].removeAttribute("for", `yes${i}`);
        }
    }
    if (index < allquestions) {
        answearA.innerHTML   =  obj['Réponse1'];
        answearB.innerHTML   =  obj['Réponse2'];
        answearC.innerHTML   =  obj['Réponse3'];
        answearD.innerHTML   =  obj['Réponse4'];
        myQuestion.innerHTML =  obj["Quesion"];
        Rightexplanation.push(obj['explanation']);
        RightAnswers.push(obj['RightEsponse']);
        
    }
}

function Countdown(timeing, allquestions) {
    let insidecircle = document.querySelector(".inside-cercle");
    let dateCrono = document.querySelector("#date-crono");
    if (index < allquestions) {

        counInterval = setInterval(function () {
            if (timeing < 10) {
                dateCrono.innerHTML = `0${timeing}`;
            } else {
                dateCrono.innerHTML = timeing;
            }
            if (timeing >= 4 && timeing < 6) {
                insidecircle.style.background = `conic-gradient(orange ${timeing * 12}deg,#dedede 0)`;
            } else if (timeing < 4) {
                insidecircle.style.background = `conic-gradient(red ${timeing * 12}deg,#dedede 0)`;
            } else {
                insidecircle.style.background = `conic-gradient(#002333 ${timeing * 12}deg,#dedede 0)`;
            }
            timeing--;
            if (timeing <0) {
                clearInterval(counInterval);
                if (index == allquestions - 1) {
                    nextQuestion.style.visibility = "hidden";
                    btnNext.style.visibility = "visible";
                    btnNext.innerHTML = "Show Results";
                } else {
                    nextQuestion.disabled=false;
                    nextQuestion.click();
                }
            }
           
        }, 1000)
    }
}
function scoreresult(obj) {
    let temp = 0;
    for (let k = 0; k < Results.length; k++) {
        if (Results[k] == obj[k].RightEsponse) {
            temp++;
        }
    }
    return temp;
}
let param=['','','',''];

console.log(param)
function corectAnswears(table) {
    
        for (let r = 0; r < Results.length; r++) {           
        if (RightAnswers[r] != Results[r]) {
            allAnswears.innerHTML +=`
            <div class="w-full mb-4 p-6 text-sky-900 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 ">
            <p class="font-bold flex flex-start text-stone-800  text-md">The Question:${table[r].Quesion}</p>
            <p class="flex font-sans  items-center text-stone-600 ${(RightAnswers[r]==table[r].Réponse1  )  ? 'green-answear' : (Results[r]==table[r].Réponse1 || Results[r][0]==table[r].Réponse1 || Results[r][1]==table[r].Réponse1 || Results[r][2]==table[r].Réponse1 || Results[r][3]==table[r].Réponse1 ) ? 'red-answear' : ''}       text-md"><i class="fa-solid fa-circle-dot mr-2"></i><span>  ${table[r].Réponse1}</span></p>
            <p class="flex font-sans  items-center text-stone-600 ${(RightAnswers[r]==table[r].Réponse2  )  ? 'green-answear' : (Results[r]==table[r].Réponse2 || Results[r][0]==table[r].Réponse2 || Results[r][1]==table[r].Réponse2 || Results[r][2]==table[r].Réponse2 || Results[r][3]==table[r].Réponse2 ) ? 'red-answear' : ''}       text-md"><i class="fa-solid fa-circle-dot mr-2"></i><span>  ${table[r].Réponse2}</span></p>
            <p class="flex font-sans  items-center text-stone-600 ${(RightAnswers[r]==table[r].Réponse3  )  ? 'green-answear' : (Results[r]==table[r].Réponse3 || Results[r][0]==table[r].Réponse3 || Results[r][1]==table[r].Réponse3 || Results[r][2]==table[r].Réponse3 || Results[r][3]==table[r].Réponse3 ) ? 'red-answear' : ''}       text-md"><i class="fa-solid fa-circle-dot mr-2"></i><span>  ${table[r].Réponse3}</span></p>
            <p class="flex font-sans  items-center text-stone-600 ${(RightAnswers[r]==table[r].Réponse4  )  ? 'green-answear' : (Results[r]==table[r].Réponse4 || Results[r][0]==table[r].Réponse4 || Results[r][1]==table[r].Réponse4 || Results[r][2]==table[r].Réponse4 || Results[r][3]==table[r].Réponse4 ) ? 'red-answear' : ''}       text-md"><i class="fa-solid fa-circle-dot mr-2"></i><span>  ${table[r].Réponse4}</span></p>
            </div>
            <div class="w-full mb-4 p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <h1 class="class="flex items-center""><i class="fa-solid fa-circle-exclamation text-amber-500 text-xl mr-2"></i><span class="text-xl text-amber-500">Explnation</span></h1>
            <p class="flex font-sans font-bold items-center text-cyan-900 text-md">${Rightexplanation[r]}</p>
            </div>
          `
           }
           
        }
}

// radioQuestion.forEach(element => {
//     console.log(element.checked)

//     if(element.checked){
//         console.log("radio");
//     }
// });
// checkQuestion.forEach(element =>{
//     console.log(element.checked)
//     if(element.checked){
//         console.log("checkbox")
//     }
// })
