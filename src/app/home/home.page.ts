import { Component } from '@angular/core';
// import Swiper from 'swiper';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // slideOpts = {
  //   initialSlide: 4,
  //   speed: 400,
  //   pagination: false,
  //   slidesPerView: 4,
  // };

  preloader = () =>{
    document.querySelector('.preloader')['style'].display = 'none'
    
  }
  slideOpts = {
    initialSlide: 1,
    speed: 400,
    slidesPerView: 1,
    autoplay: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  };
  constructor() {
   
  }

  ngOnInit() {

  }

}
