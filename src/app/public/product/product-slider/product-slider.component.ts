import { Component, Input, SimpleChanges } from '@angular/core';
import { Image } from 'src/app/core/interfaces/Image';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.css']
})
export class ProductSliderComponent {
  @Input() images !: Image[];

  //slider
  selectedImage !: Image;
  startX = 0;
  threshold = 100; 

  ngOnChanges(changes: SimpleChanges) {
    if (changes['images'] && changes['images'].currentValue) {
      const newImages = changes['images'].currentValue;
      
      if (newImages.length > 0) {
        this.selectedImage = newImages[0];
      }
    }
  }

  selectImage(image : Image) {
    this.selectedImage = image;
  }

  prevImage() {
    const currentIndex = this.images.findIndex(image => image === this.selectedImage);
    const lastIndex = this.images.length - 1;
  
    if (currentIndex > 0) {
      this.selectedImage = this.images[currentIndex - 1];
    } else {
      this.selectedImage = this.images[lastIndex];
    }
  }
  
  nextImage() {
    const currentIndex = this.images.findIndex(image => image === this.selectedImage);
    const lastIndex = this.images.length - 1;
  
    if (currentIndex < lastIndex) {
      this.selectedImage = this.images[currentIndex + 1];
    } else {
      this.selectedImage = this.images[0];
    }
  }

  onTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].clientX;
  }

  onTouchEnd(event: TouchEvent) {
    const endX = event.changedTouches[0].clientX;
    const deltaX = this.startX - endX;

    if (deltaX > this.threshold) {
      this.nextImage(); // Faites votre logique pour passer à l'image suivante
    } else if (deltaX < -this.threshold) {
      this.prevImage(); // Faites votre logique pour passer à l'image précédente
    }
  }
}
