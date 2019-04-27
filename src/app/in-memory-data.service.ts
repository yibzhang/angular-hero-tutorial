import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {
  createDb(){
  	const heros = [
  		{id: 11, name: 'wang'},
  		{id: 12, name: 'zhang'},
  		{id: 13, name: 'zhao'},
  		{id: 14, name: 'sun'}
  	];

  	return {heros};
  }

  genId(heros: Hero[]): number {
  	return heros.length > 0? Math.max(...heros.map(hero => hero.id)) + 1: 11;
  }
}
