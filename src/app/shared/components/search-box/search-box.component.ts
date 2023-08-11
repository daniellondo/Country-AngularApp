import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime, pipe } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html'
})

export class SearchBoxComponent implements OnInit,OnDestroy {

  private debouncer = new Subject<string>();
  private debouncerSuscription?: Subscription;
  @Input()
  public placeholder : string = 'Search By Capital';

  @Input()
  public initialValue : string = '';
  
  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .pipe(debounceTime(500))
    .subscribe(value => {
      this.onDebounce.emit(value);
    });
  }

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }

  emitValue(value:string): void{
    if (value.length === 0) return;
    this.onValue.emit(value);
  }

  onKeyPress(searchTerm : string){
    this.debouncer.next(searchTerm);
  }
}
