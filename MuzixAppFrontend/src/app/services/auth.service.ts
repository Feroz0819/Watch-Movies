import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, window } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl="http://localhost:8082/api/v2/register";
  register(signRequest:any):Observable<any>{
     return this.http.post(this.registerUrl,signRequest).pipe(
catchError(this.handleError)
);
}
 // Error handling
 private handleError(error: HttpErrorResponse) {
  console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
  return throwError('Something went wrong with registration; please try again later.');
}
private apiUrl: string = "http://localhost:8082/api/v1/login";
  constructor(private http: HttpClient) {}
  // Generate token method
  generateToken(data: any): Observable<any> {
    
    return this.http.post<any>(this.apiUrl, data);
  }
  // Save the token in localStorage
  loginUser(token: string) {
    
    localStorage.setItem('token', token);
    
  }
  // Retrieve the token from localStorage
  getToken() {
    return localStorage.getItem('token');
  }
  // Check if the user is logged in
  isLoggedIn(): boolean {
    let token = this.getToken();
    return token !== undefined && token !== null && token !== '';
  }
  // Logout by clearing the token
  logout() {
    
    localStorage.removeItem('token');
  }
  
  
}
