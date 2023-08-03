import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styles: [],
})
export class CountryPageComponent implements OnInit {
  public country?: Country | null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private cservice: CountriesService,
    private router : Router
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.cservice.searchCountryByAlphaCode(id)))
      .subscribe(country => {
        if (!country) {
          this.router.navigateByUrl('');
        }
        console.log(country)
        this.country = country;
      });
  }

  searchCountry(code: string) {
    this.cservice.searchCountryByAlphaCode(code).subscribe((country) => {
      console.log(country);
    });
  }
}
