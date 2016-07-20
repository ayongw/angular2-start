import {Component, OnInit} from '@angular/core';

import {Hero} from "./hero";
import {HeroDetailComponent} from './hero-detail.component'
import {HeroService} from './hero.service'

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/heroes.component.html',
  styleUrls: ['app/heroes.component.css'],
  directives: [HeroDetailComponent]
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  selectedHero: Hero;

  addingHero = false;

  error:any;

  /**
   * 用于注入服务的入口
   */
  constructor(private heroService: HeroService) {

  }

  addHero() {
    this.addingHero = true;
    this.selectedHero = null;
  }

  close(savedHero: Hero) {
    this.addingHero = false;
    if (savedHero) {
      this.initHeroList(); // this.getHeroes();
    }
  }

  deleteHero(hero: Hero, event: any) {
    event.stopPropagation();
    this.heroService
      .delete(hero)
      .then(res => {
        this.heroes = this.heroes.filter(h => h != hero);
        if (this.selectedHero === hero) {
          this.selectedHero = null;
        }
      })
      .catch(error=>this.error=error);
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  };

  /**
   * init method
   */
  ngOnInit() {
    this.initHeroList();
  }

  private initHeroList() {
    // this.heroes = this.heroService.getHeroes();
    this.heroService.getHeroes().then(heros => this.heroes = heros);
  }
}

