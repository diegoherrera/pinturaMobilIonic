import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  base_path = environment.Servidor + '/api';

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


  DownloadAllImage() {
    return this.http.post<any>(`${this.base_path}/download-imagen`, { }, { headers: this.headers })
  }

  DownloadAllProductos() {
    return this.http.post<any>(`${this.base_path}/download-producto`, { }, { headers: this.headers })
  }

  DownloadAllSlowProduct() {
    return this.http.post<any>(`${this.base_path}/download-slow-movers`, { }, { headers: this.headers })
  }
  DownloadAllSegment() {
    return this.http.post<any>(`${this.base_path}/download-segment`, { }, { headers: this.headers })
  }
  DownloadAllFamily() {
    return this.http.post<any>(`${this.base_path}/download-family`, { }, { headers: this.headers })
  }
  DownloadAllCategory() {
    return this.http.post<any>(`${this.base_path}/download-category`, { }, { headers: this.headers })
  }

  DownloadAllPallete() {
    return this.http.post<any>(`${this.base_path}/download-palette`, { }, { headers: this.headers })
  }

  DownloadAllProductSustentable() {
    return this.http.post<any>(`${this.base_path}/download-sustentables`, { }, { headers: this.headers })
  }

  DownloadAllFavoritos() {
    return this.http.post<any>(`${this.base_path}/download-favoritos`, { }, { headers: this.headers })
  }

  DownloadAllInnovation() {
    return this.http.post<any>(`${this.base_path}/download-innovations`, { }, { headers: this.headers })
  }



  GetProductAllImage() {
    return this.http.get(`${this.base_path}/all-product-image-download`)
  }

  GetFavorito(usuarioId) {
    return this.http.post<any>(`${this.base_path}/find-favorito`, { favorito_user_Id: usuarioId }, { headers: this.headers })
  }

  GetUserProfile(usuarioId) {
    console.log('usuarioId' + usuarioId);
    return this.http.get(`${this.base_path}/get-user/` + usuarioId)
  }

  getProductById(id: string) {

    return this.http.post<any>(`${this.base_path}/find-get-product-id`, { buscar: id }, { headers: this.headers })
  }

  getProductByLike(buscar: string) {
    console.log('llegue ' + buscar);
    return this.http.post<any>(`${this.base_path}/find-like-product-ionic`, { buscar: buscar }, { headers: this.headers })
  }


  SendDataProfile(
    id: string,
    user_name: string,
    user_password: string,
    user_first: string,
    user_last: string,
    language: string,
    user_comercializacion: string,
    picture: string) {
    
    return this.http.post<any>(`${this.base_path}/update-profile-ionic/${id}`, 
    { 
      user_name: user_name, 
      user_password: user_password,
      user_first: user_first,
      user_last: user_last,
      language: language,
      user_comercializacion:  user_comercializacion,
      picture: picture
    }, { headers: this.headers })
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

  GetProducByHome(
    segmentos: string,
    familias: string,
    categorias: string,
    acciones: string,
    buscar: string,
    comercializacion: string, 
    pagina: number): Observable<any> {
    var formData: any = new FormData();

    return this.http.post<any>(`${this.base_path}/find-get-product-home`,
      {
        "segmentos": segmentos
        , "familias": familias
        , "categorias": categorias
        , "acciones": acciones
        , "buscar": buscar
        , "comercializacion": comercializacion
        , "pagina" : pagina
      }, this.httpOptions)
  }



  GetProducByHomeCount(
    segmentos: string,
    familias: string,
    categorias: string,
    acciones: string,
    buscar: string,
    comercializacion: string, 
    pagina: number): Observable<any> {
    var formData: any = new FormData();

    return this.http.post<any>(`${this.base_path}/find-get-product-home-count`,
      {
        "segmentos": segmentos
        , "familias": familias
        , "categorias": categorias
        , "acciones": acciones
        , "buscar": buscar
        , "comercializacion": comercializacion
        , "pagina" : pagina
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

  sendCotizacion(usuario: string, producto: string) {
    return this.http.post<any>(`${this.base_path}/add-cotizacion`, { cotizacion_user_Id: usuario, cotizacion_product_Id: producto }, { headers: this.headers })
  }

  addFavorito(usuario: string, producto: string) {
    return this.http.post<any>(`${this.base_path}/add-favorito`, { favorito_user_Id: usuario, favorito_product_Id: producto }, { headers: this.headers })
  }



  getProductByLikeSlowFiltros(buscar: string, pais: string, familia: string, page: number) {
    console.log('llegue ' + buscar);
    return this.http.post<any>(`${this.base_path}/find-like-slow-filtro`, { buscar: buscar, pais: pais, familia: familia, pagina: page }, { headers: this.headers })
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
