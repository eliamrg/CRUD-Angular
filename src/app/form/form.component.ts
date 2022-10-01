import { Component, Input, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DatabaseService } from '../database.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(private db : DatabaseService, public formBuilder : FormBuilder) {}

  alumnos : any = []
  AltaForm!: FormGroup;
  isSubmitted = false;
  
  @Input() nombreAlumno: string = "";
  @Input() apellidoAlumno: string = "";
  @Input() matriculaAlumno: string = "";

  agregarAlumnos() : void {
    if(this.nombreAlumno.length==0 || this.apellidoAlumno.length==0 || this.matriculaAlumno.length==0){
      alert("Complete todos los campos");
    }
    else{
      var nuevoAlumno : any = {
            //Propiedades del alumno
            "nombre" : this.nombreAlumno,
            "apellido" : this.apellidoAlumno,
            "matricula" : this.matriculaAlumno
          }
          this.alumnos.push(nuevoAlumno);
    }
  }

  ngOnInit(): void {
    this.AltaForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(1)]],
      apellido: ['', [Validators.required, Validators.minLength(1)]],
      matricula: ['', [Validators.required, Validators.minLength(1)]]
    })
  }

  /*Subir(postData : {"nombre" : string, "apellido" : string, "matricula" : string}) {
    this.db.postAlumno(postData);
  }*/

  SubirForm(){
    this.isSubmitted = true;
    if (!this.AltaForm.valid) {
      console.log('Llenar todos los campos')
      return false;
    } else {
      console.log(this.AltaForm.value);
      this.alumnos = this.alumnos.concat(this.AltaForm.value);
      this.db.postAlumno(this.AltaForm.value);
      return true;
    }
  }

}
