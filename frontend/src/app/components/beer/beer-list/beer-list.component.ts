import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Beer } from 'src/app/models/beer.model';
import { BeerService } from 'src/app/services/beer.service';

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.scss']
})
export class BeerListComponent implements OnInit {

  beers: Beer[]=[];
  beersSubscription: Subscription[] = [];

  readonly #beerService = inject(BeerService);
  readonly #router = inject(Router);

  ngOnInit() {
    this.beersSubscription.push(
      // this.#mainService.userConnected$.subscribe((userData) => {
      //   if(userData) {
      //     this.#beerService.getAllBeer$(userData.id);
      //   }
      // })
    )
    this.#beerService.getAllBeer$();

    this.beersSubscription.push(
      this.#beerService.beer$
      .subscribe(
        (beers) => {
          if(beers) {
            this.beers = beers.sort(
              (a, b) => a.marque.localeCompare(b.marque)
            );
          }
      })
    );
  }

  /**
   * Create the beer from list
   * @param beer object
   */
  onCreateNewBeer(){
    this.#router.navigate(['/beer-form']);
  }

  /**
   * Delete the beer from list
   * @param beer object
   */
  onDeleteBeer(beer: Beer) {
    const beerId = beer.id;
    if (beerId === undefined) {
      console.error('Tentative de suppression d\'une bière sans ID valide.');
      return;
    }

    const confirmDelete = confirm("Voulez-vous supprimer la bière suivante : '" + beer.marque + "', (ID : " + beerId + ")?");
    if(confirmDelete) {
      this.#beerService.deleteBeer(beerId.toString())
    }
  }

  ngOnDestroy(): void {
    console.log('ngDestroy called')

    if (this.beersSubscription) {
      this.beersSubscription.forEach((subscription: Subscription) => {
        subscription.unsubscribe();
      })
    }
  }

}
