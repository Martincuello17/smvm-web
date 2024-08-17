import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Observable } from 'rxjs';
import { DatasetService } from './services/dataset.service';
const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },]
})


export class AppComponent implements OnInit {
  data: number | undefined;
  svmvWithPercentAplicated: number | undefined = 0;
  date = new FormControl(new Date());
  percent = new FormControl(0);
  maxDate = new Date();

  constructor(public service: DatasetService) { }

  ngOnInit(): void {
    let date = this.date.value;
    date?.setDate(1);
    const stringDate = date?.toISOString().split('T')[0];
    this.service.getSeriesData(stringDate!, stringDate!);
    this.service.data$.subscribe(data => {
      this.data = data?.data?.[0]?.[1];
      this.svmvWithPercentAplicated = this.data! * ((this.percent.value ?? 1) / 100);
    });
  }
  
  setMonthAndYear(normalizedMonthAndYear: Date, datepicker: MatDatepicker<Date>) {
    const ctrlValue = this.date.value!;
    ctrlValue.setMonth(normalizedMonthAndYear.getMonth());
    ctrlValue.setFullYear(normalizedMonthAndYear.getFullYear());
    ctrlValue.setDate(1);
    const date = ctrlValue.toISOString().split('T')[0];
    this.date.setValue(ctrlValue);
    console.log(this.date.value);
    datepicker.close();
    this.service.getSeriesData(date!, date!);
  }

  calculate() {
    this.svmvWithPercentAplicated = this.data! * ( (this.percent.value ?? 1) / 100);
  }

}
