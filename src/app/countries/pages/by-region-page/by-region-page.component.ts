import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [],
})
export class ByRegionPageComponent implements OnInit {
  public countries: Country[] = [];
  public regions: Region[] = ['Asia', 'Oceania', 'America', 'Europe', 'Africa'];
  public selectedRegion?: Region;
  public isLoading: boolean = false;
  public message: string = 'Searching...';

  constructor(private cservice: CountriesService) {}
  ngOnInit(): void {
    this.countries = this.cservice.cacheStore.byRegion.countries;
    this.selectedRegion = this.cservice.cacheStore.byRegion.region;
  }

  searchByRegion(region: Region): void {
    this.selectedRegion = region;
    this.isLoading = true;
    this.cservice.searchRegion(region).subscribe((regions) => {
      this.countries = regions;
      this.isLoading = false;
    });
  }
}
