import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {HeroService} from './hero.service';
import {Hero} from './hero';

@Component({
  selector: 'my-dashboard',
  template: `
    <h3>My Dashboard</h3>
  `
})
export class DashboardComponent implements OnInit {
  heroes:Hero[] = [];

  constructor(private heroService:HeroService, private router:Router) {
  }

  ngOnInit() {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1, 5));
  }

  gotoDetail(hero:Hero) {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
