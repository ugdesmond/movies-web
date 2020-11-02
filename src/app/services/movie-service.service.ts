import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = 'https://api.themoviedb.org/3/';
const queryParam = 'include_adult=false&language=en-US'
const apiKey = '1b801a1e2cf9162b08b8c6c8640b1c75'

@Injectable({
  providedIn: 'root'
})

export class MovieServiceService {

  constructor(private httpClient: HttpClient) { }


  getMoviesService(pageNum: any): Observable<any> {
    const url = `${apiUrl}discover/movie?api_key=${apiKey}&page=${pageNum}&${queryParam}`;
    return this.httpClient.get<any>(url, httpOptions).pipe(
      tap(_ => console.log(`pull  movies page=${pageNum}`)),
      catchError(this.handleError<any>('pulling movies'))
    );
  }

  seachMovieService(searchVal: any): Observable<any> {
    const url = `${apiUrl}search/movie?api_key=${apiKey}&query=${searchVal}&${queryParam}`;
    return this.httpClient.get<any>(url, httpOptions).pipe(
      tap(_ => console.log(`Searched result`)),
      catchError(this.handleError<any>('pulling movies'))
    );
  }


  getMovieDetailService(movieId: any): Observable<any> {
    const url = `${apiUrl}movie/${movieId}?api_key=${apiKey}`;
    return this.httpClient.get<any>(url, httpOptions).pipe(
      tap(_ => console.log(`Movie detail`)),
      catchError(this.handleError<any>('pulling movie detail'))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}
