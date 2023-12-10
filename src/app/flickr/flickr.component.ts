import { Component, OnInit,HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

interface FlickrImageData {
  imageUrl: string;
 

}

@Component({
  selector: 'app-flickr',
  templateUrl: './flickr.component.html',
  styleUrl: './flickr.component.scss'
})

export class FlickrComponent {
  flickrImages: any[] = [];
  currentPage = 1;
  loading = false;
  searchQuery = '';

  constructor(private apiService: ApiService) {
    this.fetchImages();
  }

  fetchImages(): void {
    this.loading = true;
    if (this.searchQuery.trim().length >= 3) {
      this.apiService.searchImages(this.searchQuery, this.currentPage)
        .subscribe(
          (data: any) => {
            this.flickrImages = [...this.flickrImages, ...data.photos.photo];
            this.loading = false;
          },
          (error: any) => {
            console.error(error);
            this.loading = false;
          }
        );
    } else {
      this.apiService.getImages(this.currentPage)
        .subscribe(
          (data: any) => {
            this.flickrImages = [...this.flickrImages, ...data.photos.photo];
            this.loading = false;
          },
          (error: any) => {
            console.error(error);
            this.loading = false;
          }
        );
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const windowHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY || window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;

    if (windowHeight + scrollPosition >= scrollHeight) {
      if (!this.loading) {
        this.currentPage++;
        this.fetchImages();
      }
    }
  }

  onSearch(): void {
    this.flickrImages = [];
    this.currentPage = 1;
    this.fetchImages();
  }

  getImageUrl(photo: any): string {
    return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
  }
}
