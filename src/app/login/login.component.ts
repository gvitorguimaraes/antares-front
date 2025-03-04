import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { Login } from '../model/Login';
import { AuthService } from '../servicos/auth.service';
import { AuthToken } from '../model/AuthToken';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public loginForm: Login = new Login();

  public constructor(private route:Router, private service: AuthService)
  {

  }

  public login()
  {
    this.service.login(this.loginForm).subscribe
    ({
        next: (AuthToken) => this.route.navigate([""]),
        error: (any) => alert("Não foi possivel efetuar o login!")
      })
  }
}
