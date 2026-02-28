import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private usuario: User | null = null;
  private auth = getAuth();

  login(email: string, password: string){
    //Metodo de dfirebase auth para
    signInWithEmailAndPassword(this.auth, email, password)
    //ejecutar cuando el incioi de sesion es exitoso
    .then(usuarioAutenticado => this.usuario = usuarioAutenticado.user)
    //Ejecutar cuando falla el inicio de sesion
    .catch(err => console.log('Usuario incorrecto', err.message)
    );
  }

  logout(){
    signOut(this.auth);
    this.usuario=null
  }

  
}
