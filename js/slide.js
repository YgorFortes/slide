export default class Slide {
  constructor(slide, wrapper){
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.dist = {
      finalPosition: 0, 
      starX: 0,
      movement: 0,
    }
  }

  movoSlide( distX){
    this.dist.movePosition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0 , 0)`;
  }

  updatePosition(clientX){
    this.dist.movement = (this.dist.starX - clientX) *1.6;
    return this.dist.finalPosition - this.dist.movement;
  }

  onStart(event) {
    let moveType;
    if (event.type === 'mousedown') {
      event.preventDefault();
      this.dist.starX = event.clientX;
      moveType = 'mousemove';
    } else  {
      this.dist.starX = event.changedTouches[0].clientX;
      moveType = 'touchmove';
    }
    this.wrapper.addEventListener(moveType, this.onMove);
  }

  onMove(event){
    const pointerPosition = (event.type === 'mousemove') ? event.clientX : event.changedTouches[0].clientX;
    const finalPosition = this.updatePosition(pointerPosition);
    this.movoSlide(finalPosition);
  }

  ondEnd(event){
    const moveType =  (event.type === 'mouseup') ? 'mousemove' : 'touchmove';
    this.wrapper.removeEventListener(moveType, this.onMove);
    this.dist.finalPosition = this.dist.movePosition;
  }

  addSlideEvents(){
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('touchstart', this.onStart);
    this.wrapper.addEventListener('mouseup', this.ondEnd);
    this.wrapper.addEventListener('touchend', this.ondEnd);
  }

  bindEvents(){
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.ondEnd = this.ondEnd.bind(this);
  }

  init(){
    this.bindEvents();
    this.addSlideEvents();
    return this;
  }
}