import { Component, OnInit, NgZone, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController, LoadingController } from '@ionic/angular';
import { AutentificacionService } from 'src/app/autentificacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-download-content',
  templateUrl: './download-content.page.html',
  styleUrls: ['./download-content.page.scss'],
})
export class DownloadContentPage implements OnInit {
  @ViewChild('testForm') testFormElement;
  @ViewChild("progreso") progreso: ElementRef;
  timecache: any = 'No Definido';

  public slideOneForm: FormGroup;
  opcion1 = false;
  opcion2 = false;
  opcion3 = false;
  opcion4 = false;
  opcion5 = false;
  opcion6 = false;
  procesando = false;

  showLoader: boolean = false;
  ProductArray: any = [];
  constructor(public modalController: ModalController
    , private ngZone: NgZone
    , private auth: AutentificacionService
    , private renderer: Renderer2
    , private formBuilder: FormBuilder
    , public loadingCtrl: LoadingController
    , private usuarioService: UsuarioService) {

    this.auth.GetTimeCache((resultado) => {
      this.timecache = resultado;
    });

    this.slideOneForm = formBuilder.group({
      opcion1: [true],
      opcion2: [true],
      opcion3: [true],
      opcion4: [true],
      opcion5: [true],
      opcion6: [true],
    });

  }

  ngOnInit() {
  }
  showProgressBar() {
    this.showLoader = true;
  }

  hideProgressBar() {
    this.showLoader = false;
  }


  guardandoImagen(imagen, contenido) {
    return new Promise((resolve, reject) => {
     // this.auth.isHasImageCache(imagen, (respuesta) => {
        //if (!respuesta) {
          this.auth.SetImageCache(imagen, contenido, (respuesta) => {
            this.auth.SetHasImageCach(imagen, (operacion) => {
              console.log('retono promesa para ' + imagen);
              resolve(true);
            });
          });
        /*} else {
          console.log('ya tiene cache ' + imagen);
          resolve(true);
        }*/
      })
      //resolve(true);
   // })
  }

  async ProcesarImagenes(data: any, callback) {
    let arreglo: any = data;
    console.log('inicio de procesamiento');
    for (let index = 0; index < arreglo.length; index++) {
      console.log('paso 1 procesando ');
      let retorno = environment.Servidor + '/public/' + arreglo[index].image;
      let contenido = arreglo[index].Image64;
      let estado = await this.guardandoImagen(retorno, contenido);
      console.log('procesando ' + retorno);
    }
    console.log('fin de procesamiento');
    callback(true);
  }

  ejecutarFormulario() {
    this.procesando = true;
    this.renderer.addClass(this.progreso.nativeElement, "active");
    this.renderer.removeClass(this.progreso.nativeElement, "inactive");

    console.log('llego a la seleccion');
    this.usuarioService.DownloadAllImage().subscribe(data => {
      console.log('Inicio del procesamiento de imagen');
      this.ProcesarImagenes(data, (retorno) => {
        console.log('Fin del procesamiento de imagen');
        this.usuarioService.DownloadAllProductos().subscribe(dataProducto => {
          this.opcion1 = true;
          console.log('longitu de products almacenados ' + dataProducto.length);
          this.auth.SetRespaldoCache("#Productos", JSON.stringify(dataProducto), (respuesta) => {
            this.usuarioService.DownloadAllSlowProduct().subscribe(dataProductoSlow => {
              this.opcion2 = true;
              console.log('longitu de products slow almacenados ' + dataProductoSlow.length);
              this.auth.SetRespaldoCache("#SlowMovers", JSON.stringify(dataProductoSlow), (respuesta) => {
                this.usuarioService.DownloadAllPallete().subscribe(dataPallette => {
                  this.opcion3 = true;
                  console.log('longitu de pallete almacenados ' + dataPallette.length);
                  this.auth.SetRespaldoCache("#Pallettes", JSON.stringify(dataPallette), (respuesta) => {
                    this.usuarioService.DownloadAllProductSustentable().subscribe(dataSustentable => {
                      this.opcion4 = true;
                      console.log('longitu de productos sustentables almacenados ' + dataSustentable.length);
                      this.auth.SetRespaldoCache("#Sustentables", JSON.stringify(dataSustentable), (respuesta) => {
                        this.usuarioService.DownloadAllFavoritos().subscribe(dataFavoritos => {
                          this.opcion5 = true;
                          console.log('longitu de productos favoritos almacenados ' + dataFavoritos.length);
                          //console.log(JSON.stringify(dataFavoritos));
                          this.auth.SetRespaldoCache("#Favoritos", JSON.stringify(dataFavoritos), (respuesta) => {
                            this.usuarioService.DownloadAllInnovation().subscribe(dataInnovation => {
                              this.opcion6 = true;
                              console.log('longitu de productos dataInnovation almacenados ' + dataInnovation.length);
                              this.auth.SetRespaldoCache("#Innovations", JSON.stringify(dataInnovation), (respuesta) => {
                                this.usuarioService.DownloadAllSegment().subscribe(dataSegmento => {
                                  console.log('longitu de dataSegmento ' + dataSegmento.length);
                                  this.auth.SetRespaldoCache("#Segmentos", JSON.stringify(dataSegmento), (respuesta) => {
                                    this.usuarioService.DownloadAllFamily().subscribe(dataFamily => {
                                      console.log('longitu de dataFamily ' + dataFamily.length);
                                      this.auth.SetRespaldoCache("#Family", JSON.stringify(dataFamily), (respuesta) => {
                                        this.usuarioService.DownloadAllCategory().subscribe(dataCategory => {
                                          console.log('longitu de dataCategory ' + dataCategory.length);
                                          this.auth.SetRespaldoCache("#Category", JSON.stringify(dataCategory), (respuesta) => {

                                            this.procesando = false;

                                            this.auth.SetTimeCache(new Date().toLocaleString(), (resultado) => {
                                              this.timecache = resultado;
                                              this.renderer.addClass(this.progreso.nativeElement, "inactive");
                                              this.renderer.removeClass(this.progreso.nativeElement, "active");
                                            });

                                          });
                                        });
                                      });
                                    });
                                  });
                                });






                                // res2.dismiss(); //sierro el dialogo

                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });

      // let contenido: any = data;
      // this.ProductArray = contenido.products;


    });



  }



  getPosts() {



  }

}
