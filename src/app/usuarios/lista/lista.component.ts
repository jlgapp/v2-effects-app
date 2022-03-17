import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, tap } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AppState } from 'src/app/store/app.reducer';
import { Usuario } from '../../models/usuario.model';
import { cargarUsuarios } from '../../store/actions/usuarios.actions';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: [
  ]
})
export class ListaComponent implements OnInit {

  usuarios: Usuario[] = [];
  loading : boolean = false;
  error : any;

  constructor(
    //public usuarioServices:UsuarioService
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    // this.usuarioServices.getUsers()
    // .subscribe( data => this.usuarios = data
    // );
    this.store.select('usuarios')      
      .subscribe(({ users, loading, error }) => {
        //console.log('subs lista', users);
        this.usuarios = users;
        this.loading = loading;
        this.error = error;
      }
      );
    this.store.dispatch(cargarUsuarios());

  }

}
