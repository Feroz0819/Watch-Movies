import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { window, windowToggle } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  hide = true;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,private snackBar: MatSnackBar) {

    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log("Form Value: ", this.loginForm.value);

      // Call generateToken method to authenticate and get the JWT token
      this.authService.generateToken(this.loginForm.value).subscribe(
        (response: any) => {
          console.log("Login Response: ", response);
          
          // Store the token using AuthService
          this.authService.loginUser(response.token);
          
          
          // Notify the user and navigate to the registration page
          this.snackBar.open('Login successful', 'Close', {
            duration: 12000, // Duration in milliseconds
          });
          
          this.router.navigateByUrl("/");
          
        },
        (err) => {
          this.snackBar.open('Invalid credentials', 'Close', {
            duration: 12000,
          });
          console.error("Error: ", err);
        }
      );
    } else {
      this.snackBar.open('Please fill in all required fields.', 'Close', {
        duration: 12000,
      });
    }
  }
  }

