import { Injectable } from '@angular/core';
import { HEROS} from './mock-heros';
import { Hero } from './hero';

import { Observable, of} from 'rxjs';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators';

const httpOptions = {
	headers: new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class HeroService {

  private herosUrl = 'api/heros';
  
  constructor(
  	private http: HttpClient,
  	private messageService: MessageService) { }

  /*getHero(id:number): Observable<Hero>{
  	this.messageService.add(`HeroService: fetch hero id=${id}`);
  	return of(HEROS.find(hero => hero.id === id));
  }*/

  /*getHeros(): Observable<Hero[]>{
  	this.messageService.add('HeroService: fetch heros');
  	//return this.http.get<Hero[]>(this.herosUrl)
  	return of(HEROS);
  }*/

  getHero(id: number): Observable<Hero>{
  	const url = `${this.herosUrl}/${id}`;
  	return this.http.get<Hero>(url).pipe(
  		tap(_=> this.log(`feteched hero id=${id}`)),
  		catchError(this.handleError<Hero>(`getHero id=${id}`))
  		);
  }

  getHeros(): Observable<Hero[]>{
  	return this.http.get<Hero[]>(this.herosUrl)
  	.pipe(
  		tap(_ => this.log('fetched heroes')),
  		catchError(this.handleError<Hero[]>('getHeros', []))
  		);
  }

  updateHero(hero: Hero): Observable<any>{
  	return this.http.put(this.herosUrl, hero, httpOptions).pipe(
  		tap(_=>this.log(`update hero id=${hero.id}`)),
  		catchError(this.handleError<any>('updateHero'))
  		);
  } 

  addHero(hero: Hero): Observable<Hero>{
  	return this.http.post<Hero>(this.herosUrl, hero, httpOptions).pipe(
  		tap((newHero: Hero) => this.log(`added new hero w/ id=${newHero.id}`)),
  		catchError(this.handleError<Hero>('addHero'))
  		);
  }

  deleteHero(hero: Hero | number): Observable<Hero>{
  	const id = typeof hero === 'number'? hero: hero.id;
  	const url = `${this.herosUrl}/${id}`;

  	return this.http.delete<Hero>(url, httpOptions).pipe(
  		tap(_=>this.log(`delete hero id=${id}`)),
  		catchError(this.handleError<Hero>('deleteHero'))
  		);
  } 

  searchHeros(term: string): Observable<Hero[]>{
  	if(!term.trim()){
  		return of([]);
  	}
  	return this.http.get<Hero[]>(`${this.herosUrl}/?name=${term}`).pipe(
  		tap(_=>this.log(`found heros match "${term}"`)),
  		catchError(this.handleError<Hero[]>('searchHero', []))
  		);
  }

  private log(message: string){
  	this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T> (operation='operation', result?:T){
  	return (error: any):Observable<T> => {
  		console.error(error);
  		this.log(`${operation} failed: ${error.message}`);
  		return of(result as T);
  	};
  }
}
