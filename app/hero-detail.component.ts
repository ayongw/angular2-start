import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Hero} from "./hero";
import {HeroService} from './hero.service';


@Component({
  selector: 'hero-detail',
  templateUrl: 'app/hero-detail.component.html',
  styleUrls:['app/hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit, OnDestroy {
  @Input() hero:Hero;
  sub:any;

  constructor(private heroService:HeroService, private route:ActivatedRoute) {

  }

  goBack() {
    window.history.back();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params=> {
      let id = +params['id']; //convert string parameter to integer
      this.heroService.getHero(id)
        .then(hero=>this.hero = hero);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
