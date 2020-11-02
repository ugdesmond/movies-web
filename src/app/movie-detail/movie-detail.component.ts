import { Component, OnInit } from '@angular/core';
import { MovieServiceService } from '../services/movie-service.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Utility } from './../utility'
import { IMAGE_URL } from './../constant';


@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  imageUrl = IMAGE_URL;
  isFavorite = true;
  movie: any;
  voteAverage: number;
  constructor(private api: MovieServiceService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.getMovieDetail(this.route.snapshot.params['id']);
  }

  getMovieDetail(id: any) {
    this.api.getMovieDetailService(id)
      .subscribe((res) => {
        this.movie = res;
        this.voteAverage = (res.vote_average * 10);
       this.getFavourite();
      }, (err) => {
        console.log(err);
      });
  }


  getDate(val) {
    return new Date(val).toString().substr(0, 10);
  }

  getFavourite() {
    let favList = Utility.getFavouriteList();
    let favObject = "";
    let index = 0;
    for (let i = 0; i < favList.length; i++) {
      if (favList[i].id == this.movie.id) {
        favObject = favList[i];
        index = i;
        break;
      }
    }
    if (favObject) {
      this.isFavorite = true;
    } else {
      this.isFavorite = false;
    }
  }


  toggleFavourite() {

    let favList = Utility.getFavouriteList();
    let favObject = "";
    let index = 0;
    for (let i = 0; i < favList.length; i++) {
      if (favList[i].id == this.movie.id) {
        favObject = favList[i];
        index = i;
        break;
      }
    }
    if (favObject) {
      let fav = favList.splice(0, index);
      Utility.setFavourite(fav);
      this.isFavorite = false;
      console.log(index, "=======removing object from list======", JSON.stringify(fav));
    } else {
      favList.push(this.movie);
      Utility.setFavourite(favList);
      this.isFavorite = true
      console.log("=======adding to list======", favList.length);
    }

  }
}
