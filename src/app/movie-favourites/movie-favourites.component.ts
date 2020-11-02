import { Component, OnInit } from '@angular/core';
import { Utility } from './../utility'
import { IMAGE_URL } from './../constant';

@Component({
  selector: 'app-movie-favourites',
  templateUrl: './movie-favourites.component.html',
  styleUrls: ['./movie-favourites.component.css']
})
export class MovieFavouritesComponent implements OnInit {
  movies = [];
  imageUrl = IMAGE_URL;
  constructor() { }

  ngOnInit(): void {
    this.getFavouritesList();
  }


  getFavouritesList(){
  this.movies= Utility.getFavouriteList();
  }

  getMovieName(name: string) {
    if (name.includes(":"))
      return name.split(":")[0];
    return name;
  }



  check = 150;
  getMovieBody(val) {
    if (val.length <= this.check)
      return val;
    let truncatedValue = val.substr(0, this.check);
    let lastIndexOfSpace = truncatedValue.lastIndexOf(" ");
    return truncatedValue.substr(0, lastIndexOfSpace) + " ...";
  }

  getDate(val) {
    return new Date(val).toString().substr(0, 16);
  }

  getMovieVote(val: any) {
    return val * 10;
  }

}
