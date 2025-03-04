import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../servicos/auth.service';
import { Register } from '../model/Register';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  public registerForm = new Register();
  public constructor(private route:Router, private service: AuthService)
  {
    
  }

  public register()
  {
    this.service.registerNewUser(this.registerForm).subscribe
    ({
        next: (any) => this.route.navigate(["login"]),
        error: (any) => alert("Não foi possivel registrar o usuario!")
      })
  }
}
