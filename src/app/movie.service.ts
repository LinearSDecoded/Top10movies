import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Movie {
  canRateTitle: {
    isRatable: boolean;
  };
  chartMeterRanking: {
    currentRank: number;
    rankChange: any; 
  };
  id: string;
  isAdult: boolean;
  originalTitleText: {
    text: string;
  };
  plot: {
    id: string;
    author: string | null;
    plotText: any; 
    correctionLink: any; 
    reportingLink: any; 
  };
  primaryImage: {
    id: string;
    imageUrl: string;
    imageWidth: number;
    imageHeight: number;
  };
  ratingsSummary: {
    aggregateRating: number;
    topRanking: any;
    voteCount: number;
  };
  releaseDate: {
    day: number;
    month: number;
    year: number;
    country: any;
    restriction: any | null;
  };
  releaseYear: {
    year: number;
    endYear: number;
  };
  series: any | null;
  titleCertificate: {
    rating: string;
    certificateCountry: any;
    ratingReason: any | null;
  };
  titleEpisode: any | null;
  titleRuntime: any | null;
  titleText: {
    text: string;
  };
  titleType: {
    id: string;
    text: string;
    displayableProperty: any;
    categories: any[];
    canHaveEpisodes: boolean;
  };
  watchOptionsByCategory: {
    categorizedWatchOptionsList: any[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'https://imdb188.p.rapidapi.com/api/v1/getWeekTop10';
  private headers = new HttpHeaders({
    'x-rapidapi-key': '1c9caae67dmsh2d1bbe9d5d08d10p1cdeedjsn82a3899013bf',
    'x-rapidapi-host': 'imdb188.p.rapidapi.com'
  });

  constructor(private http: HttpClient) {}

  getTop10Movies(): Observable<any> {
    return this.http.get<any>(this.apiUrl, { headers: this.headers });
  }

}
