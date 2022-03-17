import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { cargarUsuario, cargarUsuarioError, cargarUsuarioSuccess } from "../actions";
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { of } from "rxjs";



@Injectable()
export class UsuarioEffects {
  constructor(
    private actions$: Actions,
    private usuariosService: UsuarioService
  ) { }

  cargarUsuario$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(cargarUsuario),
       // tap(data => console.log('effec tap', data)),
        mergeMap(
          (action) => this.usuariosService.getUserById(action.id)
            .pipe(
             // tap(data => console.log('getUsers effec', data)),
              map(user => cargarUsuarioSuccess({ usuario: user as Usuario })),
              catchError(err => of(cargarUsuarioError({ payload: err })))
            )
        )
      )
  );
}