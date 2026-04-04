import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private http = inject(HttpClient);

  private API_USUARIOS = 'http://localhost:8080/usuarios';


  //Metodo GET
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.API_USUARIOS);
  }

  //Metodo POST
  postUsuario(usuario: Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(`${this.API_USUARIOS}/guardarUsuario`, usuario);
  }

  //Metodo PUT
  putUsuario(id: string, usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(`${this.API_USUARIOS}/actualizarUsuario/${id}`, usuario);
  }

  //Metodo PUT
  deleteUsuario(id: string): Observable<Usuario>{
    return this.http.delete<Usuario>(`${this.API_USUARIOS}/eliminarUsuario/${id}`);
  }
}
