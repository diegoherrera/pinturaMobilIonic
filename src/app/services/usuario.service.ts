import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  base_path = 'http://192.168.1.12:9000/api';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient) { }

  getLanguage() {
    return this.http.get(`${this.base_path}/all-language`)
  }
  getType() {
    return this.http.get(`${this.base_path}/all-tipo`)
  }
  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };


  verificarNumeroTelefono(miTelefono: any) {
    throw new Error("Method not implemented.");
  }

  sendSMS(item): Observable<any> {
    return this.http
      .post<any>(`${this.base_path}/enviarsms-user`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  verificNumberPhone(item): Observable<any> {
    return this.http
      .post<any>(`${this.base_path}/validarnumero-user`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }


  verificarAcount(id): Observable<any> {
    return this.http
      .post<any>(`${this.base_path}/verificated-user/${id}`, {}, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  GetPallets() {
    return this.http.get(`${this.base_path}/all-palette-mobile`)
  }

  GetSegment() {
    return this.http.get(`${this.base_path}/all-segment`)
  }

  GetFamily() {
    return this.http.get(`${this.base_path}/all-family`)
  }

  GetType() {
    return this.http.get(`${this.base_path}/all-category`)
  }

  GetProductAll() {
    return this.http.get(`${this.base_path}/all-product`)
  }
  GetProductAllImage() {
    return this.http.get(`${this.base_path}/all-product-image-download`)
  }

  getProductById(id: string) {
    
    return this.http.post<any>(`${this.base_path}/find-get-product-id`, { buscar: id }, { headers: this.headers })
  }

  getProductByLike(buscar: string) {
    console.log('llegue ' + buscar);
    return this.http.post<any>(`${this.base_path}/find-like-product-ionic`, { buscar: buscar }, { headers: this.headers })
  }

  GetProduc(
    product_IdSegment: string,
    product_IdFamily: string,
    product_IdCategory: string): Observable<any> {
    var formData: any = new FormData();
    console.log('segmento ' + product_IdSegment);
    console.log('family  ' + product_IdFamily);
    console.log('category ' + product_IdCategory);
    return this.http.post<any>(`${this.base_path}/find-get-product`,
      {
        "product_IdSegment": product_IdSegment
        , "product_IdFamily": product_IdFamily
        , "product_IdCategory": product_IdCategory
      }, this.httpOptions)
  }

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  GetTraduction(id): Observable<any> {
    let API_URL = `${this.base_path}/all-traduction/${id}`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }

  GetLanguage(id): Observable<any> {
    let API_URL = `${this.base_path}/get-language/${id}`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
  
  loginUser(
    user_name: string,
    user_password: string): Observable<any> {
    var formData: any = new FormData();
    formData.append("user_name", user_name);
    formData.append("user_password", user_password);

    console.log(user_name);
    console.log(user_password);
    return this.http.post<any>(`${this.base_path}/login-user`, { "user_name": user_name, "user_password": user_password }, {
      reportProgress: true,
      observe: 'events'
    })
  }

  GetProducGroup(
    id: string,
    buscar: string,
    paginado: number): Observable<any> {
    
    return this.http.get(`${this.base_path}/all-group-product/${id}/${buscar}`,
       this.httpOptions)
  }

  getProductByLikeInnovation(buscar: string) {
    console.log('llegue ' + buscar);
    return this.http.post<any>(`${this.base_path}/find-like-innovation-ionic`, { buscar: buscar }, { headers: this.headers })
  }


  getProductByLikeSlowFiltros(buscar: string, pais:string, familia:string) {
    console.log('llegue ' + buscar);
    return this.http.post<any>(`${this.base_path}/find-like-slow-filtro`, { buscar: buscar, pais: pais, familia: familia }, { headers: this.headers })
  }

  getProductByLikeSlow(buscar: string) {
    console.log('llegue ' + buscar);
    return this.http.post<any>(`${this.base_path}/find-like-slow`, { buscar: buscar }, { headers: this.headers })
  }

  updateProductSlow(id,
    state: boolean,
  ): Observable<any> {
    var formData: any = new FormData();
    formData.append("State", state);

    return this.http.put(`${this.base_path}/update-slow/${id}`, { "State": state }, {
      reportProgress: true,
      observe: 'events'
    })
  }


  GetProducSlow(
    buscar: string,
    paginado: number): Observable<any> {
    
    return this.http.get(`${this.base_path}/all-slow-paginado/${buscar}/${paginado}`,
       this.httpOptions)
  }

}
