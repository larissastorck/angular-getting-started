import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


const isValidId = (id: number) => {
  if (isNaN(id) || id < 1) {
    alert('Invalid product id');
    return false;
  }
  return true;
}


export const productDetailGuard: CanActivateFn = (route, state) => {
  const id = Number(route.params['id']);

  if (!isValidId(id)) {
    inject(Router).navigate(['/products']);
    return false;
  }

  return true;
};
