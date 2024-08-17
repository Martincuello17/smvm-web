import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatasetService {

  private baseUrl = 'https://apis.datos.gob.ar/series/api/series?ids=57.1_SMVMM_0_M_34:end_of_period&header=ids&collapse=month&collapse_aggregation=end_of_period&format=json';
  public data$ = new BehaviorSubject<any>(null)
  public loaded: boolean = false;

  constructor(private http: HttpClient) { }

  getSeriesData(startDate: string, endDate: string): void {
    this.loaded = false;
    const url = `${this.baseUrl}&start_date=${startDate}&end_date=${endDate}`;
    this.http.get<any>(url).subscribe(
      data => {
        this.data$.next(data),  // Actualiza el Observable con los datos
          this.loaded = true
      },
      error => {
        console.error('Error al recibir los datos:', error);
        this.data$.error(error);  // Propaga el error
      }
    );
  }
}
