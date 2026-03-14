import { Form } from '@angular/forms';
import { CanActivateFn, CanDeactivate, CanDeactivateFn, Routes } from '@angular/router';

export interface HizoCambios {
  hizoCambios(): boolean
}

export const deactivateGuard: CanDeactivateFn<HizoCambios> = (component) => {
  if(component.hizoCambios()){
    return confirm('¿Salir sin guardar cambios? ')
  }
  return true;

};
