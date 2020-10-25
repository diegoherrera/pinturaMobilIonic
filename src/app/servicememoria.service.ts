import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';

export interface Data {
   language: string
}

@Injectable({
  providedIn: 'root'
})
export class ServicememoriaService {

  constructor(private storage: Storage) { 

  }

  addLanguage(data: Data) {
    
  }
  getLanguage() {

  }
}
