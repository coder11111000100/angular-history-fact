import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription, throwError } from 'rxjs';
import { DataService } from '../daserv/data.service';
import { AppLoadService } from './service/app-load.service';

type Obj = { [key: string]: number[] };

@Component({
  selector: 'app-facts',
  templateUrl: './facts.component.html',
  styleUrls: ['./facts.component.css'],
})
export class FactsComponent implements OnInit {
  formFacts: FormGroup;
  sub: Subscription;
  objectBlock: Obj;
  modal = false;
  fact = '';
  loading = false;

  constructor(
    private historicalFact: AppLoadService,
    private _data: DataService
  ) {
    this.formFacts = new FormGroup({
      firstName: new FormControl(),
    });
  }

  showDialogFact(event?: Event, item?: string) {
    if (event) {
      this.historicalFact
        .fetchFact(
          (event.target as HTMLButtonElement).outerText as string,
          item
        )
        .subscribe(
          (f) => (this.fact = f),
          (err) => {
            this.fact = 'not found';
            console.log('!!!', err.message);
          }
        );
    } else {
      this.historicalFact
        .fetchFact(this.formFacts.get('firstName')?.value, '')
        .subscribe(
          (f) => (this.fact = f),
          (err) => {
            this.fact = 'not found';
            console.log('!!!', err.message);
          }
        );
      this.formFacts.reset();
    }
  }

  ngOnInit(): void {
    this.sub = this._data.stream$.subscribe((obj) => (this.objectBlock = obj));
    this.loading = true;
  }
}
