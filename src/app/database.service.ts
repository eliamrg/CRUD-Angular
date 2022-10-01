import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }


  //GET
  getAlumnos(){
    return this.http.get('https://alumnos-1905762-default-rtdb.firebaseio.com/alumnos.json')
  }

  getAlumnoDetalle(id: string ) {
    return this.http.get('https://alumnos-1905762-default-rtdb.firebaseio.com/alumnos/'+ id +'.json')
  }

  //POST
  getListAlumnos() {
    return this.http.get('https://alumnos-1905762-default-rtdb.firebaseio.com/alumnos/.json');
  }
  postAlumno(objeto : Object) {
     this.http.post('https://alumnos-1905762-default-rtdb.firebaseio.com/alumnos/.json',objeto).subscribe(resp => {console.log(resp)});
  }
  //UPDATE
  updateAlumni(id: string, nuevosDatos: any) {
    return this.http.put('https://alumnos-1905762-default-rtdb.firebaseio.com/alumnos/'+ id +'.json', nuevosDatos)
  }
  //DELETE
  deleteAlumno(id: string ) {
    return this.http.delete('https://alumnos-1905762-default-rtdb.firebaseio.com/alumnos/'+ id +'.json')
  }
}
