import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private router = inject(Router)

  private usuario: User | null = null;
  private auth = getAuth();
  private isAuth: boolean = false

  login(email: string, password: string){
    //Metodo de dfirebase auth para
    signInWithEmailAndPassword(this.auth, email, password)
    //ejecutar cuando el incioi de sesion es exitoso
    .then(usuarioAutenticado => {
      this.router.navigate(['usuarios'])
      this.usuario = usuarioAutenticado.user})
    //Ejecutar cuando falla el inicio de sesion
    .catch(err => this.router.navigate(['login']))
    ;
  }

  logout(){
    signOut(this.auth);
    this.usuario=null
  }

  
}
