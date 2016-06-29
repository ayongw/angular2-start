import { Injectable } from '@angular/core';
import {HEROES} from './mock.heros'

@Injectable()
export class HeroService {
    // begin
    getHeros() {
        // return HEROES;
        return Promise.resolve(HEROES);
    }
}