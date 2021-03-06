window.addEventListener('DOMContentLoaded', function(){
  'use strict';
  //Timer
  const countTimer = (dedline) => {
    let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

    const getTimeRemaining = () => {
      let dateStop = new Date(dedline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining  % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60) % 24,
        day = Math.floor(timeRemaining / 60 / 60 / 24);
        
        return{timeRemaining, hours, minutes, seconds};
        
    };
    const updateClock = () => {
      let timer = getTimeRemaining();
      timerHours.textContent = timer.hours;
      timerMinutes.textContent = timer.minutes;
      timerSeconds.textContent = timer.seconds;
      const timeCorrekt = (time) =>{
        if(time < 10){
          time = '0' + time;
        }
        return time;
      };
      timerHours.textContent = timeCorrekt(timer.hours);
      timerMinutes.textContent = timeCorrekt(timer.minutes);
      timerSeconds.textContent = timeCorrekt(timer.seconds);
      if(timer.timeRemaining < 0){
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
        clearInterval(intervalId);
      }
    };
    updateClock();
    let intervalId = setInterval(updateClock, 1000);
  };
  countTimer('1 july 2020');
  //Menu
  const toggleMenu = () =>{
    const btnMenu = document.querySelector('.menu'),
      menu = document.querySelector('menu');
    btnMenu.addEventListener('click', () => {
      menu.classList.toggle('active-menu');
    });
    menu.addEventListener('click', (event) => {
      let target = event.target;
      if(target.classList.contains('close-btn')){
        menu.classList.toggle('active-menu');
      } else {
        target = target.closest('ul>li');
        if(target){
          menu.classList.toggle('active-menu');
        } 
      }   
    }); 
  };
  toggleMenu();
  //popup
  const togglePopup = ()  =>{
    const popup = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn'),
      popupContent = document.querySelector('.popup-content');
    let count = 0,
      flyInterval;
    const popupAnimate = () =>{
      flyInterval = requestAnimationFrame(popupAnimate);
      count++;
      if(count < 35){
        popupContent.style.top = count*5 + 'px';  
      }
      if(count < 110){
        popupContent.style.left = count*5 + 'px';
      }
      console.log('test');
    };  
    popupBtn.forEach((elem) => {
      elem.addEventListener('click', () => { 
        popup.style.display = 'block';
        if(window.innerWidth < 768){
          flyInterval = cancelAnimationFrame(popupAnimate);
        }else {
          popupAnimate();
          count = 0;
        }         
      }); 
    });
    popup.addEventListener('click', () =>{
      let target = event.target;
      if(target.classList.contains('popup-close')){
        popup.style.display = 'none';
        cancelAnimationFrame(flyInterval);
      } else{
        target = target.closest('.popup-content');
        if(!target){
          popup.style.display = 'none';
        }  
      }
    });
    
  };
  togglePopup();
  //Tabs
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
      tab = tabHeader.querySelectorAll('.service-header-tab'),
      tabContent =document.querySelectorAll('.service-tab');
    const toggleTabContent =(index) => {
      for(let i = 0; i < tabContent.length; i++){
        if(index === i){
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else{
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };
    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
      
        target = target.closest('.service-header-tab');
        
        if(target){
          tab.forEach((item, i) => {
            if(item === target){
              toggleTabContent(i);
            }
          });
          
        }         
    }); 
  };
  tabs();
});