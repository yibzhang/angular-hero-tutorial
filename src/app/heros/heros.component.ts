import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero'
import { HEROS } from '../mock-heros'
import { HeroService} from '../hero.service'

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css']
})
export class HerosComponent implements OnInit {

  //myhero : Hero = {id:1, name:"WindStorm"};

  //selectedHero: Hero;
  //heros = HEROS;
  heros : Hero[];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
  	this.getHeros();
  }

  /*onSelect(hero: Hero): void{
  	this.selectedHero = hero;
  }*/

  getHeros(): void{
  	//this.heros = this.heroService.getHeros();
  	this.heroService.getHeros().subscribe(heros => this.heros = heros);
  }

  add(name: string): void{
  	name = name.trim();
  	if(!name){return;}
  	this.heroService.addHero({name} as Hero).subscribe(hero=>{this.heros.push(hero)});
  }

  delete(hero: Hero): void{
  	this.heros=this.heros.filter(h=>h!==hero);
  	this.heroService.deleteHero(hero).subscribe();
  }

}
