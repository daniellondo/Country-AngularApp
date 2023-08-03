import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})

export class ByCountryPageComponent {
  public countries: Country[] = [];
  constructor(private cservice: CountriesService) {}

  searchByCountry(term: string): void {
    this.cservice.searchCountry(term).subscribe((countries) => {
      this.countries = countries;
    });
  }
}
