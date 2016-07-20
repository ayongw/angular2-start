import { Injectable } from '@angular/core';
import {HEROES} from './mock.heros'

@Injectable()
export class HeroService {
    // begin
    getHeros() {
        // return HEROES;
        return Promise.resolve(HEROES);
    }
    getHero(id:number) {
        return this.getHeros()
        .then(heroes=>heroes.filter(hero=>hero.id==id)[0]);
    }
}