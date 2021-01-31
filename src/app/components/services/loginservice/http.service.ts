import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {
  }

  private address: string = 'http://ta-lad-noi.com/php-taladnoi/';

  // ส่งข้อมูลแบบ Post method
  requestPost(url: string, body: any, accessToken?: string) {
    return this.http.post(`${this.address}${url}`, body, {
      headers: this.appendHeaders(accessToken)
    });
  }

  // ส่งข้อมูลแบบ Put method
  requestPut(url: string, body: any, accessToken?: string) {
    return this.http.put(`${this.address}${url}`, body, {
      headers: this.appendHeaders(accessToken)
    });
  }

  // ส่งข้อมูลแบบ Get method
  requestGet(url: string, accessToken?: string) {
    return this.http.get(`${this.address}${url}`, {
      headers: this.appendHeaders(accessToken)
    });
  }

  // เพิ่ม header
  private appendHeaders(accessToken){
    const headers = {};
    if(accessToken) headers['Authorization'] = `Bearer ${accessToken}`;
    return new HttpHeaders(headers);
  }
}
