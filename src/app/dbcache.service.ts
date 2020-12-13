import { Injectable } from '@angular/core';

import { AutentificacionService } from './autentificacion.service';

@Injectable({
  providedIn: 'root'
})
export class DbcacheService {

  favoritos: any = [];
  productosFavoritos: any = [];
  segmentos: any = [];
  familys: any = [];
  categorys: any = [];
  productos: any = [];

  constructor(private auth: AutentificacionService) {

  }

  GetFavoritos(identificador: string, callback): any {
    if (this.favoritos.length==0) {
      console.log('cargando en memoria favorito ');
      this.auth.GetRespaldoCache("#Favoritos", (respaldo) => {
        this.favoritos = JSON.parse(respaldo);
        callback(this.favoritos.filter(obj => obj.favorito_user_Id == identificador));
      })
    } else {
      console.log('ya esta en memoria favorito ');
      callback(this.favoritos.filter(obj => obj.favorito_user_Id == identificador));
    }    
  }

  GetProductoFavorito(identificador: string, callback): any {
    if (this.productosFavoritos.length==0) {
      console.log('cargando en memoria Productos ');
      this.auth.GetRespaldoCache("#Productos", (respaldo) => {
        this.productosFavoritos = JSON.parse(respaldo);
        callback(this.productosFavoritos.filter(obj => obj._id == identificador));
      })
    } else {
      console.log('ya esta en memoria producto ');
      callback(this.productosFavoritos.filter(obj => obj._id == identificador));
    }    
  }

  GetSegmentos(callback): any {
    if (this.segmentos.length==0) {
      console.log('cargando en memoria GetSegmentos ');
      this.auth.GetRespaldoCache("#Segmentos", (respaldo) => {
        this.segmentos = JSON.parse(respaldo);
        callback(this.segmentos);
      })
    } else {
      console.log('ya esta en memoria GetSegmentos ');
      callback(this.segmentos);
    }    
  }

  GetFamilias(callback): any {
    if (this.familys.length==0) {
      console.log('cargando en memoria GetFamilias ');
      this.auth.GetRespaldoCache("#Family", (respaldo) => {
        this.familys = JSON.parse(respaldo);
        callback(this.familys);
      })
    } else {
      console.log('ya esta en memoria GetFamilias ');
      callback(this.familys);
    }    
  }

  GetCategorias(callback): any {
    if (this.categorys.length==0) {
      console.log('cargando en memoria GetCategorias ');
      this.auth.GetRespaldoCache("#Category", (respaldo) => {
        this.categorys = JSON.parse(respaldo);
        callback(this.categorys);
      })
    } else {
      console.log('ya esta en memoria GetCategorias ');
      callback(this.categorys);
    }    
  }


  GetProductos(segmentos, familias, categorias, otros, buscando, zona,  callback): any {
    if (this.productos.length==0) {
      console.log('cargando en memoria GetProductos ');
      this.auth.GetRespaldoCache("#Productos", (respaldo) => {
        this.productos = JSON.parse(respaldo);
        callback(this.productos);
      })
    } else {
      console.log('ya esta en memoria GetProductos ');
      callback(this.productos);
    }    
  }


}
