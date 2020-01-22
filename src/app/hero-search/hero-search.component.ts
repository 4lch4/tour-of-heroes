import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { HeroService } from '../hero.service';
import { Hero } from '../models/hero';




@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.sass']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.heroes$ = this.searchTerms.pipe(
      // Wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // Ignore new term if same as previous
      distinctUntilChanged(),

      // Switch to new search Observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeros(term))
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

}
