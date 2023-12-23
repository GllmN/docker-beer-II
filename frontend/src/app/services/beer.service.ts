import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Beer } from '../models/beer.model';
import { BASE_URL } from '../constant/url';

@Injectable({
  providedIn: 'root'
})
export class BeerService {

  private _beer$ = new BehaviorSubject<Beer[] | null>(null);
  readonly beer$ = this._beer$.asObservable();

  readonly #http = inject(HttpClient);
  readonly #router = inject(Router);

  /**
  * Get list all beer filled out
  */
  getAllBeer$() {
    this.#http
    .get<Beer[]>(BASE_URL)
    .subscribe(beers => 
      this._beer$.next(beers));
  }

  /**
  * Get a single beer
  *
  */
  getSingleBeer$(id: string) {
    this.#http
    .get<Beer[]>(`${BASE_URL}/${id}`)
    .subscribe(beer =>
      this._beer$.next(beer));
  }

  /**
  * Create a beer
  * @param beer: object of beer
  */
  createBeer(data: Beer) {
    this.#http
    .post(BASE_URL, data)
    .pipe(
      tap(() => {
        this.navigateToBeerList()
      })
    ).subscribe();
  }

  /**
  * Updtate a beer
  * @param beer: object of beer
  * @param id: id of beer
  */
  updateBeer(id: string, data: Beer) {
    this.#http
    .put(`${BASE_URL}/${id}`, data)
    .pipe(
      tap(() => {
        this.navigateToBeerList()
      })
    ).subscribe();
  }

  /**
  * Delete a beer
  @param beer: object of beer
  */
  deleteBeer(id: string) {
    this.#http
    .delete(`${BASE_URL}/${id}`)
    .pipe(
      tap(() => {
        this.navigateToBeerList();
      })
    ).subscribe();
  }

  /**
   * Navigate to beer list
   */
  navigateToBeerList(): void {
    this.#router
    .navigate(['/beer-list']);
  }
}

