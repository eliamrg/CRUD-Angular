import { Component, OnInit, Input, ɵisListLikeIterable } from '@angular/core';

import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {

  constructor(private db: DatabaseService) { }

  arreglo: any = [];
  alumnos: any = [];
  key:string="";
  ngOnInit(): void {
    this.consultaDBAlumnos()
  }

buscar:string="";
  @Input() nombreAlumno: string = "";
  @Input() apellidoAlumno: string = "";
  @Input() matriculaAlumno: string = "";



  alumnoDetalle(key:any){

    let keys=Object.keys(this.arreglo);
    console.log("VER ALUMNO CON MATRICULA:"+keys[key])
    window.location.href="/alumno-detalle/"+keys[key];
  }
  eliminarAlumno(key:any){
    console.log(key )
    let keys=Object.keys(this.arreglo);
    console.log("BORRAR ALUMNO CON MATRICULA:"+keys[key])
    this.db.deleteAlumno(keys[key]).subscribe(res => {
      console.log("Se actualizo la base de datos")
      window.location.reload();
    });
    
    /*for(let i=0; i<this.arreglo.length;i++){
      if(this.arreglo.matricula==matricula){
        console.log(Object.keys(this.arreglo[i]));
      }
    }this.db.deleteAlumno(x).subscribe(res => {
      console.log("Se actualizo la base de datos")
      this.consultaDBAlumnos();
    });*/
    
  }
  
  tester : any = [];
  consultaDBAlumnos(){
    this.db.getListAlumnos().subscribe(resp => {
      console.log(resp);
      
      this.arreglo=resp;
      this.tester = Object.values(resp);
      console.log(this.tester);
      for(let test of this.tester){
        if(test != null){
          this.alumnos = this.alumnos.concat(test);
        }
      }
      console.log(this.alumnos);
    })
  }
  
  

  like(): void {
    
    console.log("like!");
  }

  agregarAlumno(): void {
    var nuevoAlumno: any = {
      "nombre": this.nombreAlumno,
      "apellido": this.apellidoAlumno,
      "matricula": this.matriculaAlumno
    }

    this.alumnos.push(nuevoAlumno); //Funcion en TypeScript 
  }
}
