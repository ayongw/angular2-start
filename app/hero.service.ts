import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Hero} from "./hero";
import "rxjs/add/operator/toPromise";
// import {HEROES} from './mock.heros'

@Injectable()
export class HeroService {
  private heroesUrl = 'app/heroes'; //url to web api

  constructor(private http:Http) {

  }

  // begin
  getHeroes() {
    // return HEROES;
    // return Promise.resolve(HEROES);
    return this.http.get(this.heroesUrl)
      .toPromise()
      .then(response=>response.json().data as Hero[])
      .catch(this.handleError);
  }

  getHero(id:number) {
    // return this.getHeroes()
    //   .then(heroes=>heroes.filter(hero=>hero.id == id)[0]);

    return this.getHeroes()
      .then(heroes=>heroes.find(hero=> hero.id === id));
  }


  save(hero:Hero):Promise<Hero> {
    if (hero.id) {
      return this.put(hero);
    }
    return this.post(hero);
  }

  /**
   *  delete heroes
   * @param hero
   * @returns {Promise<void>|Promise<Response>}
   */
  delete(hero:Hero) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .delete(url, {headers: headers})
      .toPromise()
      .catch(this.handleError);
  }

  /**
   * add new heroes
   * @param hero
   * @returns {Promise<void>|Promise<T>}
   */
  private post(hero:Hero):Promise<Hero> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(this.heroesUrl, JSON.stringify(hero), {headers: headers})
      .toPromise()
      .then(resp=>resp.json().data)
      .catch(this.handleError);
  }

  /**
   *  update an individual hero
   * @param hero
   * @returns {Promise<void>|Promise<Hero>}
   */
  private put(hero:Hero) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: headers})
      .toPromise()
      .then(()=>hero)
      .catch(this.handleError);
  }

  private handleError(error:any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }


}
