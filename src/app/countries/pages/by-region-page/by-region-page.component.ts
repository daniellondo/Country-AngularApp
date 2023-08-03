
import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent {
  public regions: Country[] = [];
  constructor(private cservice: CountriesService) {}

  searchByRegion(term: string): void {
    this.cservice.searchRegion(term).subscribe((regions) => {
      this.regions = regions;
    });
  }
}
