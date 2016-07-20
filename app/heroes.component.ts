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
  /**
   * 用于注入服务的入口
   */
  constructor(private heroService:HeroService) {
    
  }

  heroes:Hero[];

  selectedHero:Hero;

  onSelect(hero:Hero) {
    this.selectedHero = hero;
  };

  /**
   * init method
   */
  ngOnInit() {
    this.initHeroList();
  }

  private initHeroList() {
    // this.heroes = this.heroService.getHeros();
    this.heroService.getHeros().then(heros => this.heroes = heros);
  }
}

