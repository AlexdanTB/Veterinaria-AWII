import { Component, inject, signal } from '@angular/core';
import { UsuarioService } from '../../services/usuario-service';
import { Usuario } from '../../models/usuario';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service';
import { HizoCambios } from '../../guards/deactivate-guard';

@Component({
  selector: 'app-formulario',
  imports: [FormsModule, CommonModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
})
export class Formulario implements HizoCambios{

  public servicioUsuario = inject(UsuarioService);
  public servicioAuth = inject(AuthService)

  //Lista reactiva
  listaUsuarios = signal<Usuario[]>([]);

  //Objeto para vincularlo al formulario
  nuevoUsuario: Usuario = {
    name:'',
    email:'',
    phone:'',
    password: '',
    rol: 'ROLE_VETERINARIO'
  }

  editando: boolean = false;

  usuarioOriginal: Usuario | null = null;

  ngOnInit(){
    this.obtenerUsuarios();
  }

  obtenerUsuarios(){
    this.servicioUsuario.getUsuarios().subscribe(datosUsuarios => {
      this.listaUsuarios.set(datosUsuarios);
    })
  }

  registrarUsuario(){
    if(this.editando && this.nuevoUsuario.id){
      this.servicioUsuario.putUsuario(this.nuevoUsuario.id, this.nuevoUsuario).subscribe(()=>{
        this.obtenerUsuarios()
        this.limpiarFormulario()
      });
    }else{
      this.servicioUsuario.postUsuario(this.nuevoUsuario).subscribe(()=>{
        this.obtenerUsuarios();
        this.limpiarFormulario()
      })
    }
  }

  eliminarUsuario(id: string){
    if (confirm('¿Estás seguro que deseas eliminar el usuario?')){
      this.servicioUsuario.deleteUsuario(id).subscribe(()=>{

        //Elimina de la lista
        //this.listaUsuarios.set(this.listaUsuarios().  filter(u=> u.id !== id))
        this.obtenerUsuarios();
      })
    }
  }


  seleccionarParaEditar(user: Usuario){
    this.editando= true;
    this.nuevoUsuario= {...user}
    this.usuarioOriginal = {...user};
  }

  limpiarFormulario(){
    this.editando= false
    this.nuevoUsuario={
      name: '',
      email: '',
      phone: '',
      password: '',
      rol: 'ROLE_VETERINARIO'
    }
    this.usuarioOriginal = null;
  }

  hizoCambios(): boolean {
    if (!this.editando && (this.nuevoUsuario.name || this.nuevoUsuario.email || this.nuevoUsuario.phone || this.nuevoUsuario.password)) {
      return true;
    }
    if (this.editando && this.usuarioOriginal) {
      return JSON.stringify(this.nuevoUsuario) !== JSON.stringify(this.usuarioOriginal);
    }
    return false;
  }
}