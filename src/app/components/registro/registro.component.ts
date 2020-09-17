import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registroForm:FormGroup
  data:{}
  indice: Number  
  alerta:String
  edicion: Boolean = false
  url = '/api/usuario';
  constructor(
    private httpClient: HttpClient,
    private _builder: FormBuilder


  ) {
    this.cargar();
    this.registroForm = this._builder.group({
      nombre:[''],
      rut: ['', Validators.required],
      correo: ['',Validators.compose([Validators.required, Validators.email])],
      telefono: [''],
    })
  }

    crear(value){
        if(this.edicion){
            this.httpClient.put<any>(`${this.url}/${this.indice}`, value).subscribe(data => {
            })
        }else{
            this.httpClient.post<any>(this.url, value).subscribe(data => {
                this.registroForm = this._builder.group({
                    nombre:[''],
                    rut:[''],
                    correo: [''],
                    telefono: [''],
                })
            })
            
        }
        this.edicion = false
        this.cargar();
    }

    cargar(){
        this.httpClient.get<any>(this.url).subscribe(data => {
            this.data = data;
        }) 
    }

    editar(usuario){
        this.edicion = true;
        this.indice = usuario.id;
        this.registroForm = this._builder.group({
            nombre:usuario.nombre,
            rut:usuario.rut,
            correo: usuario.correo,
            telefono: usuario.telefono
          })
         
    }

    eliminar(indice){
        this.httpClient.delete<any>(`${this.url}/${indice}`,indice).subscribe(data => {
            this.cargar();
        }) 
    }

  ngOnInit(): void {
  }

}
