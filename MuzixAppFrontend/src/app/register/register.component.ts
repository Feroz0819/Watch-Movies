import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  

 registerForm!: FormGroup;
  hide = true; // For toggling password visibility

  constructor(private fb: FormBuilder,private service:AuthService, private router: Router,private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [ Validators.required, Validators.pattern(/^[A-Za-z\s]+$/), // Alphabets and spaces only
         Validators.minLength(3),Validators.maxLength(12) ]
      ],
      password: ['',[Validators.required,   Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) ]],
      email: ['', [Validators.required,Validators.pattern("^[a-zA-Z0-9._%+-]{4,}@[a-zA-Z0-9-]{4,}\.[a-zA-Z]{2,}$")]],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) { // Check if the form is valid
      console.log(this.registerForm.value);
      this.service.register(this.registerForm.value).subscribe(
        (response) => {
          if (response && response.email) {
            this.snackBar.open(`Hello ${response.username}, you have successfully registered!`, 'Close', {
              duration: 15000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
            this.router.navigate(['/login']); // Navigate to login page
          } else {
            this.snackBar.open("Registration failed, please try again.", 'Close', {
              duration: 15000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          }
        },
        (error) => {
          console.error("Registration error: ", error);
          this.snackBar.open("The email address is already registered,try with some other email address", 'Close', {
            duration: 15000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        }
      );
    } else {
      this.snackBar.open("Please fill out all required fields correctly.", 'Close', {
        duration: 15000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
    }
  }
  confirmcheck(): boolean {
    // Check if the form is dirty or invalid
    if (this.registerForm.dirty && !this.registerForm.valid) {
      return confirm("You have unsaved changes or the form is incomplete. Do you really want to leave?");
    }
    // If the form is clean or valid, allow navigation
    return true;
  }
  }