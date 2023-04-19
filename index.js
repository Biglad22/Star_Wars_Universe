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

    
    //dropmenu section
    const lastResort = document.querySelector('.last-resort');
    //dropdown menu
    const dropDownOpt = document.querySelector('.last-resortopt');
    //dropdown menu selector(checkbox)
    const DKAo = document.getElementById('pick'); 
    //dropdown box
    let dropDownBg = document.getElementsByTagName('option');

    //prominent texts
    const  texts = document.querySelectorAll('.text');
    
    //character image 
    const charImage = document.querySelector('.char-image');

    //character's bio 
    const cName = document.getElementById('c-name');
    const cSpecie = document.getElementById('c-specie');
    const cGender = document.getElementById('c-gender');
    const cHW = document.getElementById('c-hWorld');
    const cSC = document.getElementById('c-sColor');
    const cEColor = document.getElementById('c-eColor');
    const cMasters = document.getElementById('c-masters');

    //hidden character detail
    const seeMoreBtn = document.getElementById('see-more');
    const hidden = document.querySelectorAll('.hidden');
    const charBio = document.querySelector('.char-bio');
    const bioBox = document.querySelector('.bio-box');
    
    //progress bar
    const proContainer = document.querySelector('.pro');
    const proBar = document.getElementById('progress');

    //side menu
    const menuOpen = document.querySelector('.fi-rr-menu-burger');
    const menuClose = document.querySelector('.fi-rr-cross-small');
    const menuTray = document.querySelector('.nav-links');

    //error message
    const warning = document.getElementById('notice');

    
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


    //progress bar
    const progress =()=>{
        let width = 0;
        //progress bar
        proContainer.style.display='block';
        submitButton.style.transition='all 0.2s';

        //submitbutton
        submitButton.style.display='none';
        submitButton.style.transition='all 0.2s';
        const myInterval = setInterval(
           function(){
            if (width < 100){
                proBar.style.width=`${width}%`;
                width++;
            }
            else if (width ===100){
                width = 0; 
                clearInterval(myInterval);
                proContainer.style.display='none';
                submitButton.style.display='block';
                proBar.style.width=`${width}%`;
            };
           },10
        );
    }


   
    //sumbit button listener
    const listener = (event)=>{

        progress();
        event.preventDefault();

        setTimeout( 
            function(){
                //input value
                let entry = inputBox.value;
                console.log(entry);
                //input validation
                entry= entry.trim();
                let en;
                let input; 
                if (entry !=='' && entry.includes('-')){
                    en = entry.split(/[  -]/); 
                    console.log(en);
                    let i
                    let en1 =[];
                    for (i in en){
                        let c = en[i][0].toUpperCase(); 
                        let x = en[i].replace(en[i][0],c);
                        en1.push(x);
                        i++
                    };
                    input = en1.join('-');
                    console.log(input);

                }
                else if (entry !=='' && entry.includes(' ')){
                    en = entry.split(' ');
                    let i
                    let en1 =[];
                    for (i in en){
                        let c = en[i][0].toUpperCase(); 
                        let x = en[i].replace(en[i][0],c);
                        en1.push(x);
                        i++
                    };
                    input = en1.join(' ');
                    console.log(input);
                }
                else if (entry !=='' && entry.length > 0){
                    let c = entry[0].toUpperCase();
                    entry = entry.replace(entry[0],c);
                    input = entry;
                    console.log(input);
                }
                else if (entry ===''){
                    input = false;
                }

                //API fetch
                fetch(`https://akabab.github.io/starwars-api/api/all.json`)
                .then(response => response.json())
                .then(data => {console.log(data)

                    let i;
                    let k = 0


                    //dropdown function to get and use selected option data
                    const dropOpt = () =>{

                        if (DKAo.checked == true ){

                            //disabling inputBox
                            inputBox.disabled=true;
                            inputBox.style.opacity ='0.5';

                            //disabling drop menu
                            dropDownOpt.disabled =false;
                            dropDownOpt.style.opacity ='1';


                            //getting character by drop down
                            let selection = dropDownOpt.value;
                            selection = Number(selection);

                            let i;
                            for (i in data){
                                const charId = data[i].id;

                                if (inputBox.disabled == true && charId === selection){
                                    console.log(`this is what you entered ${selection}`);
                                    console.log(data.length);

                                    //creating warning indicator for wrong input
                                    warning.style.visibility= 'hidden';

                                    inputBox.classList.remove('border-danger');
                                    inputBox.classList.add('border-white');

                                    //date text color changer
                                    date.style.color = data[i].eyeColor;

                                    //changing cursor tracker
                                    circle.style.backgroundColor= data[i].eyeColor;
                                    circle.style.transition='all 1s'; 

                                    //including selected character's properties
                                    charImage.style.backgroundImage =`url(${data[i].image})`;
                                    charImage.style.backgroundSize ='cover';
                                    charImage.style.backgroundClip ='border-box';
                                    charImage.style.backgroundPosition ='center top';
                                    charImage.style.transition ='all 1s';

                                    //changing character Bio
                                    cName.innerText =data[i].name;

                                    if (data[i].species !=undefined){
                                        cSpecie.innerText =data[i].species;
                                    }else{
                                        cSpecie.innerText ='unknown';
                                    };
                                
                                    if (data[i].gender !=undefined){
                                        cGender.innerText =data[i].gender;
                                    }else{
                                        cGender.innerText ='unknown';
                                    };
                                
                                    if (data[i].homeworld !=undefined){
                                        cHW.innerText =data[i].homeworld;
                                    }else{
                                        cHW.innerText ='unknown';
                                    };
                                
                                    if (data[i].skinColor !=undefined){
                                        cSC.innerText =data[i].skinColor;
                                    }else{
                                        cSC.innerText ='unknown';
                                    };
                                
                                    if (data[i].eyeColor !=undefined){
                                        cEColor.innerText =data[i].eyeColor;
                                    }else{
                                        cEColor.innerText ='No eyes';
                                    };
                                
                                    if (data[i].masters !=undefined){
                                        cMasters.innerText =data[i].masters;
                                    }else{
                                        cMasters.innerText ='No master';
                                    };
                                    //changing options background
                                    // let drop = [];
                                    // drop=drop.push(dropDownBg)
                                    //options background
                                    dropDownBg = document.getElementsByTagName('option');
                                    let colr;
                                    for (colr in dropDownBg){
                                        if (colr < 88){
                                            dropDownBg[colr].style.backgroundColor = data[i].eyeColor;
                                        }else{
                                            break;
                                        }
                                    };
                                    console.log(dropDownBg);

                                    //changing progress bar background color
                                    proBar.style.backgroundColor = data[i].eyeColor;

                                    //changing header text color
                                    console.log (texts);
                                    let b
                                    for (b in texts){
                                        if (texts[b] !== null){
                                            texts[b].style.color = data[i].eyeColor;
                                        }
                                        else{
                                            break;
                                        }
                                    };
                                    break;
                                    
                                }
                                else{
                                    i++
                                };
                        } 
                        }
                        else{
                            //enabling inputBox
                            inputBox.disabled=false;
                            inputBox.style.opacity ='1';

                            //disabling drop menu
                            dropDownOpt.disabled =true;
                            dropDownOpt.style.opacity ='0.5';
                        }
                    }

                    //adding event listener to check
                    DKAo.addEventListener('click',dropOpt);

                    for(i in data){
                        let x= data[i].name;
                        let y = data[i].id;

                        if( inputBox.disabled == false && input.length >=3 && input !== false &&  x.includes(input)){
                        
                            console.log(`this is what you entered ${input}`);
                            console.log(data.length);

                            //creating warning indicator for wrong input
                            warning.style.visibility= 'hidden';

                            inputBox.classList.remove('border-danger');
                            inputBox.classList.add('border-white');

                            //changing date text color
                            date.style.color = data[i].eyeColor;

                            //changing cursor tracker color
                            circle.style.backgroundColor= data[i].eyeColor;
                            circle.style.transition='all 1s'; 

                            //including selected character's properties
                            charImage.style.backgroundImage =`url(${data[i].image})`;
                            charImage.style.backgroundSize ='cover';
                            charImage.style.backgroundClip ='border-box';
                            charImage.style.backgroundPosition ='center top';
                            charImage.style.transition ='all 1s';

                            //changing character Bio
                            cName.innerText =data[i].name;

                            if (data[i].species !=undefined){
                                cSpecie.innerText =data[i].species;
                            }else{
                                cSpecie.innerText ='unknown';
                            };

                            if (data[i].gender !=undefined){
                                cGender.innerText =data[i].gender;
                            }else{
                                cGender.innerText ='unknown';
                            };

                            if (data[i].homeworld !=undefined){
                                cHW.innerText =data[i].homeworld;
                            }else{
                                cHW.innerText ='unknown';
                            };
                        
                            if (data[i].skinColor !=undefined){
                                cSC.innerText =data[i].skinColor;
                            }else{
                                cSC.innerText ='unknown';
                            };

                            if (data[i].eyeColor !=undefined){
                                cEColor.innerText =data[i].eyeColor;
                            }else{
                                cEColor.innerText ='No eyes';
                            };

                            if (data[i].masters !=undefined){
                                cMasters.innerText =data[i].masters;
                            }else{
                                cMasters.innerText ='No master';
                            };

                            //changing progress bar background color
                            proBar.style.backgroundColor = data[i].eyeColor;
                            


                            //changing header text color
                            console.log (texts);
                            let b
                            for (b in texts){
                                texts[b].style.color =data[i].eyeColor;
                                b++
                            };
                            break;
                        }
                        else if( inputBox.disabled == false &&  input === false ){
                            //creating warning indicator for wrong input
                            warning.innerText='please enter character\'s name'; 
                            warning.style.visibility= 'visible';
                            warning.style.color='red';
                        }

                        else if (inputBox.disabled == true && lastResort.style.visibility === 'visible' ){
                            dropOpt();
                            break;
                        }
                        else{

                            if ( inputBox.disabled == false && i == data.length-1 && input != data[i].name){

                                console.warn(`result not found, check entry: ${input}`);

                                //creating warning indicator for wrong input
                                warning.innerText='character not found, please check your entry'
                                warning.style.visibility= 'visible';
                                warning.style.color='red';
                                inputBox.classList.remove('border-white');
                                inputBox.classList.add('border-danger');
                                inputBox.style.transition ='all 1s';

                                //changing drop menu visibility
                                lastResort.style.visibility='visible';

                                //setting dropdown menu default state
                                dropDownOpt.disabled =true;
                                dropDownOpt.style.opacity ='0.5';

                                while(k < data.length){

                                    let x= data[k].name;
                                    let y = data[k].id;

                                    //creating dropdownoptions
                                    dropDownOpt.insertAdjacentHTML('beforeend',`<option value ='${y}\'>${x}</option>`);
                                    k++;
                                }
                            }

                            else{
                                i++;
                            };

                        }

                    }
                });

                console.log('button clicked');
            },1000
        );

    }

    //adding event listener to submit button
    submitButton.addEventListener('click',listener);

    //superEffect is the cursor tracking circle
    const superEffect =()=>{
        //event creation
        const funct = (e) =>{
            circle.style.top = e.pageY + 'px';
            circle.style.left = e.pageX + 'px';
            if (e.pageY > body.style.height){
                body.style.overflow ='hidden';
            }
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

    
    const seeMore = (e) =>{
        let i = 0;
    
        if ( seeMoreBtn.innerHTML ==='see more'){

            while (i < hidden.length){
                hidden[i].style.display = 'block';
                i++;
            };
            seeMoreBtn.innerHTML ='see less';
            charBio.style.height= 'fit-content';
        }
        else if (seeMoreBtn.innerHTML ==='see less'){
            while (i < hidden.length){
                hidden[i].style.display = 'none';
                i++;
            };
            seeMoreBtn.innerHTML ='see more';
            charBio.style.height= 'fit-content';
            bioBox.style.maxWidth='60%';
        }
        
    }

    //adding event listener to see-more button
    seeMoreBtn.addEventListener('click',seeMore);


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