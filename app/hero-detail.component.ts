import {Component, Input, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Hero} from "./hero";
import {HeroService} from './hero.service';


@Component({
  selector: 'hero-detail',
  templateUrl: 'app/hero-detail.component.html',
  styleUrls: ['app/hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit, OnDestroy {
  @Input() hero: Hero;
  @Output() close = new EventEmitter();
  sub: any;
  error: any;
  navigated = false;//true if navigated here

  constructor(private heroService: HeroService, private route: ActivatedRoute) {

  }

  goBack(savedHero: Hero = null) {
    // window.history.back();
    this.close.emit(savedHero);
    if (this.navigated) {
      window.history.back();
    }
  }

  save() {
    this.heroService
      .save(this.hero)
      .then(hero => {
        this.hero = hero;
        this.goBack(hero);
      })
      .catch(error => this.error = error);
  }


  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      // let id = +params['id']; //convert string parameter to integer
      // this.heroService.getHero(id)
      //   .then(hero=>this.hero = hero);
      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.navigated = true;
        this.heroService.getHero(id)
          .then(Hero => this.hero = Hero);
      } else {
        this.navigated = false;
        this.hero = new Hero();
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
