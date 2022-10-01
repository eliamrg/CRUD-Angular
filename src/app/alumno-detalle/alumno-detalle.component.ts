import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ActionSheetController } from '@ionic/angular';

import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-alumno-detalle',
  templateUrl: './alumno-detalle.component.html',
  styleUrls: ['./alumno-detalle.component.css']
})
export class AlumnoDetalleComponent implements OnInit {

  constructor(
    private ruta: ActivatedRoute, 
    public actionSheetController: ActionSheetController,
    private db: DatabaseService) { }

  ngOnInit(): void {
    //this.getAlumnoDetalle(this.matricula);
    this.getDetalle();
    
    
  }

  alumnoDetalle: any = {}

  id: string = this.ruta.snapshot.params['index'];

  getDetalle(){
    this.db.getAlumnoDetalle(this.id).subscribe(res => {
       console.log(res);
       this.alumnoDetalle = res;
     })
   }
  //matricula: string = this.ruta.snapshot.params['matricula'];

  /* getAlumnoDetalle(matricula: string): any {

    for(let i = 0; i < this.alumnos.length; i++){ //Ciclo para buscar alumno por matricula
      if(this.alumnos[i].matricula == this.matricula) { //valida si la matricula coincide en ese alumno
        this.alumnoDetalle = this.alumnos[i]; // asignar alumno a alumno detlle
      }
    } 

   return this.alumnoDetalle;
  }*/

  agregarFavoritos(): void {
    //algo
  }

  async abrirActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      cssClass: 'mi-action-sheet',
      mode: 'ios',
      buttons: [{
        text: 'Borrar',
        role: 'destructive',
        icon: 'trash',
        id: 'delete-button',
        data: {
          type: 'delete'
        },
        handler: () => {
          this.eliminarAlumno(this.id);
          console.log('Delete');
        }
      }, {
        text: 'Editar',
        icon: 'create-outline',
        data: 10,
        handler: () => {
          this.verForm();
          console.log('Share clicked');
        }
      },  {
        text: 'Regresar a Inicio',
        icon: 'arrow-back-outline',
        handler: () => {
          this.agregarFavoritos();
          window.location.href="/inicio";
          //console.log('Favorite clicked');
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }
  IsHidden: boolean=false;

  verForm(){
    this.IsHidden=!this.IsHidden;
    
  }
  guardar(id: string, nuevoAlumno: any) {
    this.db.updateAlumni(id, nuevoAlumno).subscribe(res => {
      console.log("Se actualizo la base de datos")
    });
    this.verForm();
  }

  eliminarAlumno(id:string){
    this.db.deleteAlumno(id).subscribe(res => {
      console.log("Se actualizo la base de datos")
      window.location.href="/inicio";
    });
    
  }
}
