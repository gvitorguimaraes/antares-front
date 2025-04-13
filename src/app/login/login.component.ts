import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { Login } from '../model/Login';
import { AuthService } from '../servicos/auth.service';
import { AuthToken } from '../model/AuthToken';
import { HttpClientModule } from '@angular/common/http';
import { WaitIconComponent } from '../components/wait-icon/wait-icon.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
            RouterModule, 
            FormsModule, 
            CommonModule, 
            WaitIconComponent
          ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public loginForm: Login = new Login();
  public loading: boolean = false;

  public exibirMsgErroLogin: boolean = false;

  public constructor(private route:Router, private service: AuthService)
  {

  }

  public ngOnInit(): void
  {
    if (this.service.getLocalStorageToken() != null)
    {
      this.route.navigate(["home"]);
    }
  }

  public login()
  {
    this.loading = true;
    this.exibirMsgErroLogin = false;
    this.service.login(this.loginForm).subscribe
    ({
        next: (authToken: AuthToken) => {
                              this.loading=false; 
                              localStorage.setItem("authToken", authToken.token)
                              this.route.navigate(["home"]);
                            },
        error: (error) => {
                          this.exibirMsgErroLogin = true;
                          this.loading=false; 
                        }
      });
  }
}
