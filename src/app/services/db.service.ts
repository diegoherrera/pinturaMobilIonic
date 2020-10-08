import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { Song } from './song';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  //interface con sqlite plugin
  private storage: SQLiteObject;
  //nombre dde la base de datos del proyecto
  private _DB_NAME: string = "productos.db";

  songsList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {

  }
  /*
  constructor(private platform: Platform,
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: this._DB_NAME,
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          //obtengo referencia a la base de datos 
          this.storage = db;
          this.getFakeData();
        });
    });
  }

  dataExistsCheck(tableName: string): any {
    return new Promise((resolve, reject) => {
      this.storage.executeSql('SELECT count(*) AS numRows FROM ' + tableName, {})
        .then((data: any) => {
          var numRows = data.rows.item(0).numRows;
          resolve(numRows);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  retrieveAllRecords(): Promise<any> {
    return new Promise((resolve, reject) => {

      this.storage.executeSql('SELECT id, name, description FROM technologies', {})
        .then((data: any) => {
          let items: any = [];
          if (data.rows.length > 0) {
            var k;

            // iterate through returned records and push as nested objects into
            // the items array
            for (k = 0; k < data.rows.length; k++) {
              items.push(
                {
                  id: data.rows.item(k).id,
                  name: data.rows.item(k).name,
                  description: data.rows.item(k).description
                });
            }
          }
          resolve(items);
        })
        .catch((error: any) => {
          reject(error);
        });

    });
  }

  
  importJSON(json: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.sqlPorter
        .importJsonToDb(this.storage, json)
        .then((data) => {
          resolve(data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }


  clear(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.sqlPorter
        .wipeDb(this.storage)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }


  fetchSongs(): Observable<Song[]> {
    return this.songsList.asObservable();
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  // Render fake data
  getFakeData() {
    this.httpClient.get(
      'assets/datos.sql',
      { responseType: 'text' }
    ).subscribe(data => {
      this.sqlPorter.importSqlToDb(this.storage, data)
        .then(_ => {
          this.getSongs();
          this.isDbReady.next(true);
        })
        .catch(error => console.error(error));
    });
  }

  // Get list
  getSongs() {
    return this.storage.executeSql('SELECT * FROM songtable', []).then(res => {
      let items: Song[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            artist_name: res.rows.item(i).artist_name,
            song_name: res.rows.item(i).song_name
          });
        }
      }
      this.songsList.next(items);
    });
  }

  // Add
  addSong(artist_name, song_name) {
    let data = [artist_name, song_name];
    return this.storage.executeSql('INSERT INTO songtable (artist_name, song_name) VALUES (?, ?)', data)
      .then(res => {
        this.getSongs();
      });
  }

  // Get single object
  getSong(id): Promise<Song> {
    return this.storage.executeSql('SELECT * FROM songtable WHERE id = ?', [id]).then(res => {
      return {
        id: res.rows.item(0).id,
        artist_name: res.rows.item(0).artist_name,
        song_name: res.rows.item(0).song_name
      }
    });
  }

  // Update
  updateSong(id, song: Song) {
    let data = [song.artist_name, song.song_name];
    return this.storage.executeSql(`UPDATE songtable SET artist_name = ?, song_name = ? WHERE id = ${id}`, data)
      .then(data => {
        this.getSongs();
      })
  }

  // Delete
  deleteSong(id) {
    return this.storage.executeSql('DELETE FROM songtable WHERE id = ?', [id])
      .then(_ => {
        this.getSongs();
      });
  }
*/
}
