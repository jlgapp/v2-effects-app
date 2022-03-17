import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { cargarUsuario } from '../../store/actions/usuario.actions';
import { Usuario } from '../../models/usuario.model';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [
  ]
})
export class UsuarioComponent implements OnInit {

  usuario!: Usuario;

  constructor(private router: ActivatedRoute,
    private sotore: Store<AppState>) { }

  ngOnInit(): void {
    this.sotore.select('usuario')
    .pipe(      
      filter(user => user.user!=null)
    )    
    .subscribe( usuario => {
      this.usuario = usuario.user!;
      console.log(this.usuario);
      
    });

    this.router.params.subscribe(({ id }) => {
      this.sotore.dispatch(cargarUsuario({ id }));
    }
    )
  }

}
