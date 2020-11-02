import { MovieFavouritesComponent } from './movie-favourites/movie-favourites.component';
import { MoviesComponent } from './movies/movies.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';



const routes: Routes = [
  {
    path: 'movie-detail/:id',
    component: MovieDetailComponent,
    data: { title: 'Movie Detail' }
  },
  {
    path: 'movies',
    component: MoviesComponent,
    data: { title: 'Movies'}
  },
  {
    path: 'favourites',
    component: MovieFavouritesComponent,
    data: { title: 'Favourites Movies' }
  },
  {
    path: '',
    redirectTo: '/movies',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
