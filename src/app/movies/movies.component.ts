import { filter } from 'rxjs/operators';

import { IMAGE_URL } from './../constant';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { MovieServiceService } from '../services/movie-service.service'
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies = [];
  config: any;
  isLoading = true;
  searchGroup: FormGroup;
  imageUrl = IMAGE_URL;
  constructor(private formBuilder: FormBuilder, private api: MovieServiceService) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 20,
      totalItems: 0
    };
  }


  ngOnInit(): void {
    this.isLoading = true;
    this.getMovies();

    this.searchGroup = this.formBuilder.group({
      searchCtrl: ['']
    })
  }

  getMovies(pageNum = 1) {
    this.api.getMoviesService(pageNum)
      .subscribe(res => {
        this.movies = res.results;
        this.config = {
          ...this.config,
          currentPage: res.page,
          totalItems: res.total_results

        }
        this.isLoading = false;
      }, (err) => {
        console.log(err);
        this.isLoading = false;
      }
      );
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


  searchMovie(val) {
    if (!val)
      return this.getMovies();
    this.api.seachMovieService(val)
      .subscribe(res => {
        this.movies = res.results;
        this.config = {
          ...this.config,
          currentPage: res.page,
          totalItems: res.total_results

        }
      }, (err) => {
        console.log(err);
      }
      );
  }

  getMovieVote(val: any) {
    return val * 10;
  }
}
