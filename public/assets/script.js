let conditionBlock=document.querySelectorAll(".condition-block");
let compt=0;
conditionBlock[compt].style.display="block";
let i=1;

let btnPrevious=document.querySelector(".btn-previous");
let btnNext=document.querySelector(".btn-next");
let btnGo=document.querySelector('.btn-go');

btnGo.style.display="none";
btnPrevious.style.visibility="hidden";

let cercle=document.querySelectorAll(".cercle");
let progressEmpty=document.querySelector(".progress-empty");
let progressFull=document.querySelector(".progress-full");


cercle[0].style.background="#015958";
cercle[0].style.color="#C7FFED";
btnNext.onclick=()=>{
    btnPrevious.style.visibility="visible";
   if(compt<2){
    compt++;
    if(compt==2){
        btnNext.style.display="none";
        btnGo.style.display="block";
    }
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
btnPrevious.onclick=()=>{
    // if on click in btnprevious btnGo display none and btnNext display block
    btnNext.style.display="block";
    btnGo.style.display="none";
    // end
    if(compt>0){
        if(i>100){
            i=1;
        }
        compt--;
        // content of divs
        conditionBlock[compt+1].style.display="none";
        conditionBlock[compt].style.display="block";
        //end 
        cercle[compt+1].style.background="aliceblue";
        cercle[compt+1].style.color="black";

        cercle[compt].style.background="#015958";
        cercle[compt].innerHTML=`${compt+1}`;
        progressFull.style.width=`${100/((compt+1)*i)}%`;
        i*=100;
        if(compt==0){
            btnPrevious.style.visibility="hidden";
        }
    }
}



