window.onload = function(){
    'use strict';
    
    //declarations

    //Body variable
    const body = document.querySelector('.body');

    //button variable
    const submitButton =document.getElementById('sm-button');

    /*date */
    const date = document.getElementById('dt-display');
    const circle = document.getElementById('s-circle');

    //input box
    const inputBox =  document.getElementById('input');

   
    //progress bar
    const proContainer = document.querySelector('.pro');
    const proBar = document.getElementById('progress');

    //side menu
    const menuOpen = document.querySelector('.fi-rr-menu-burger');
    const menuClose = document.querySelector('.fi-rr-cross-small');
    const menuTray = document.querySelector('.nav-links');

    
    const dater =()=>{
        let today = new Date();
        let d = today.getDay();
        let y = today.getFullYear();

        let months = ['January','Febuary','March','April','May','June','July','August','September','October','November','December'];

        let m = today.getMonth();
            m = months[m];

        let tH = today.getHours();
        let tM = today.getMinutes();
        let tS = today.getSeconds();
        let tMS = today.getMilliseconds();
        let time = tH +':'+ tM + ':' + tS ;
        return date.innerText = time;
    }
    setInterval(function(){
        return dater();
    }
    ,1000);


    //superEffect is the cursor tracking circle
    const superEffect =()=>{
        //event creation
        const funct = (e) =>{
            circle.style.top = e.pageY + 'px';
            circle.style.left = e.pageX + 'px';
        }
        body.addEventListener('mouseover',funct);

        const funct2 = (e) =>{
            let circle = document.getElementById('s-circle');
            const timeOut = setTimeout(
                function(){
                    circle.style.height ='20vh';
                    circle.style.transition ='all 0.2s';
                }, 25
            );

            setTimeout(function(){
                circle.style.height ='10vh';
                circle.style.transition ='all 0.2s';},100);
        }
        body.addEventListener('click',funct2);
    }
    superEffect();

    //sidemenu
    let state = 0;
    const sideMenu = (e) =>{
        if(state === 0){
            menuTray.style.display='block';
            menuTray.style.transition='all 0.2s';
            menuOpen.style.display ='none';
            menuClose.style.display ='block';
            state = 1;
        }
        else{
            menuTray.style.display='none';
            menuTray.style.transition='all 0.2s';
            menuOpen.style.display ='block';
            menuClose.style.display ='none';
            state = 0;
        }
    } 
    menuClose.addEventListener('click',sideMenu);
    menuOpen.addEventListener('click',sideMenu);
    
  
}