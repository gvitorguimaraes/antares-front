import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../servicos/auth.service';
import { Register } from '../model/Register';
import { WaitIconComponent } from '../components/wait-icon/wait-icon.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
            RouterModule, 
            FormsModule, 
            WaitIconComponent, 
            CommonModule
          ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  public registerForm = new Register();
  public loading: boolean = false;

  public constructor(private route:Router, private service: AuthService)
  {
    
  }

  public register()
  {
    this.loading = true;
    this.service.registerNewUser(this.registerForm).subscribe
    ({
        next: (any) => {
                        this.loading = false;  
                        this.route.navigate(["login"]);
                      },
        error: (any) => {
                          this.loading = false;
                          alert("Não foi possivel registrar o usuario!");
                        } 
      })
  }
}
