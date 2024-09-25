import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from "../../share/services/auth.service"
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../core/components/header/header.component';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { MovieService } from '../../share/services/movie.service';
import { MovieCarrouselComponent } from '../../share/components/movie-carrousel/movie-carrousel.component';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { IVideoContent } from '../../share/models/video-content.interface';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule,
    HeaderComponent,
    BannerComponent,
    MovieCarrouselComponent,
  ],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss'
})
export class BrowseComponent implements OnInit {
  movieService = inject(MovieService);
  
  bannerDetail$ = new Observable<any>();
  bannerVideo$ = new Observable<any>();

  movies: IVideoContent[] = [];
  tvShows: IVideoContent[] = [];
  ratedMovies: IVideoContent[] = [];
  nowPlayingMovies: IVideoContent[] = [];
  popularMovies: IVideoContent[] = [];
  topRatedMovies: IVideoContent[] = [];
  upcomingMovies: IVideoContent[] = [];

  sources = [
    this.movieService.getMovies(),
    this.movieService.getTvShows(),
    this.movieService.getNowPlayingMovies(),
    this.movieService.getUpcomingMovies(),
    this.movieService.getPopularMovies(),
    this.movieService.getTopRated()
  ];

  ngOnInit(): void {
    forkJoin(this.sources).pipe(
      map(([movies, tvShows, nowPlayingMovies, upcomingMovies, popularMovies, topRatedMovies]) => {
        this.bannerDetail$ = this.movieService.getBannerDetail(movies.results[1].id)
        this.bannerVideo$ = this.movieService.getBannerVideo(movies.results[1].id)
        return [movies, tvShows, nowPlayingMovies, upcomingMovies, popularMovies, topRatedMovies];
      })
    ).subscribe((res: any[]) => {
      console.log('API Responses:', res);

      this.movies = res[0]?.results || [];
      this.tvShows = res[1]?.results || [];
      this.ratedMovies = res[2]?.results || [];
      this.nowPlayingMovies = res[3]?.results || [];
      this.popularMovies = res[4]?.results || [];
      this.topRatedMovies = res[5]?.results || [];
      this.upcomingMovies = res[6]?.results || [];
    });
  }


}
