import { NgModule } from '@angular/core';
import { AlumnoDetalleComponent } from '../alumno-detalle/alumno-detalle.component';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosComponent } from '../alumnos/alumnos.component';
import { FormComponent } from '../form/form.component';

const rutas: Routes = [
  { path: 'alumno-detalle/:index', component: AlumnoDetalleComponent },
  { path: 'inicio', component: AlumnosComponent},
  { path: 'form', component: FormComponent},
  
  { path: '**', component: AlumnosComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(rutas)],
  exports: [RouterModule]
})
export class RoutesModule { }
