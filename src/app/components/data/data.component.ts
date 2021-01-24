import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import { Observable } from 'rxjs/Rx'


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {

  forma:FormGroup;

  usuario: Object = {

    nombrecompleto: {
      nombre: "Txema",
      apellido: "Serrano"
    },
    correo: "jsersan@gmail.com",
    pasatiempos: [ "Correr","Dormir","Comer" ]
  }

  constructor() {

    console.log(this.usuario);

    this.forma=new FormGroup({
      'nombrecompleto': new FormGroup({

          'nombre': new FormControl('',  [
                                          Validators.required,
                                          Validators.minLength(3)
                                        ]),
          'apellido': new FormControl('',[
                                          Validators.required,
                                          this.noSerranillo
                                        ])
    }),
      'correo': new FormControl('',  [
                                      Validators.required,
                                      Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
                                    ]),
    'pasatiempos': new FormArray([
        new FormControl('Correr', Validators.required) // Valor por defecto: correr
      ]),

      'password1': new FormControl('', Validators.required),
      'password2': new FormControl()
    })

    // this.forma.setValue(this.usuario);

    this.forma.controls['password2'].setValidators([
      Validators.required,
      this.noIgual.bind(this.forma)
    ])
}


  agregarPasatiempo(){
    (<FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl('', Validators.required)
    )
  }

  noSerranillo( control: FormControl): {[s:string]:boolean}{
    if(control.value==="serranillo"){
      return{
        noSerranillo:true // Ha encontrado un error
      }
    }
    return null; // No hay errores
  }

  noIgual( control: FormControl):any {

    //console.log(this);

    let forma:any=this;

    if(control.value !== forma.controls['password1'].value){
      return{
        noiguales:true // Ha encontrado un error
      }
    }
    return null; // No hay errores
  }

  guardarCambios(){
      console.log(this.forma.value)
      console.log(this.forma)

    //   this.forma.reset({
    //     nombrecompleto:{
    //       nombre:"",
    //       apellido:""
    //     },
    //     correo:""
    // });
  }
}
