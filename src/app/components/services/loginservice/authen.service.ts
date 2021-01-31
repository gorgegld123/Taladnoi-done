import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthenService {
  private accessKey = 'accessToken';

  // กำหนดค่า access token ไว้ในความจำ browser
  setAuthenticated(accessToken: string): void {
    localStorage.setItem(this.accessKey, accessToken);
  }

  getAuthenticated(): string {
    return localStorage.getItem(this.accessKey);
  }

  async clearAuthenticated() {
    console.log('clear session storage before ->', localStorage.getItem(this.accessKey));
    await localStorage.removeItem(this.accessKey);
    console.log('clear session storage finish ->', localStorage.getItem(this.accessKey));
  }

}
