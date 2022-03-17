import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { cargarUsuarios } from "../actions";
import { UsuarioService } from '../../services/usuario.service';
import { cargarUsuariosSuccess, cargarUsuariosError } from '../actions/usuarios.actions';
import { Usuario } from '../../models/usuario.model';
import { of } from "rxjs";



@Injectable()
export class UsuariosEffects {
  constructor(
    private actions$: Actions,
    private usuariosService: UsuarioService
  ) { }

  cargarUsuarios$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(cargarUsuarios),
       // tap(data => console.log('effec tap', data)),
        mergeMap(
          () => this.usuariosService.getUsers()
            .pipe(
             // tap(data => console.log('getUsers effec', data)),
              map(users => cargarUsuariosSuccess({ usuarios: users as Usuario[] })),
              catchError(err => of(cargarUsuariosError({ payload: err })))
            )
        )
      )
  );
}