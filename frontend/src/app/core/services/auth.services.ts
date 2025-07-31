import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  uid: string;
  email?: string; // Assuming email might be in the token payload
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string): Observable<boolean> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, { email }).pipe(
      tap((response) => this.setToken(response.token)),
      map(() => true),
      catchError(() => of(false))
    );
  }

  register(email: string): Observable<boolean> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/register`, { email }).pipe(
      tap((response) => this.setToken(response.token)),
      map(() => true)
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getCurrentUser(): string | null {
    const token = this.getToken();
    if (token) {
      const decoded: JwtPayload = jwtDecode(token);
      return decoded.email || null;
    }
    return null;
  }

  getCurrentUserId(): string | null {
    const token = this.getToken();
    if (token) {
      const decoded: JwtPayload = jwtDecode(token);
      return decoded.uid;
    }
    return null;
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
