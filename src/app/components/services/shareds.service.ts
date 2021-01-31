import { Injectable } from '@angular/core';

@Injectable()
export class SharedsService {

  // ตำแหน่งของสมาชิก
  positionItem: any[] = [
    'แอดมิน',
    'สมาชิก'
  ];

  // แปลงไฟล์รูปเป็น base64
  onConvertImage(input: HTMLInputElement) {
    return new Promise((resolve, reject) => {
      const imageTypes = ['image/jpeg', 'image/png'];
      const imageSize = 500;
  //  หากไม่มีการอัพโหลดภาพ
      if (input.files.length == 0) {
        return resolve(null); }
  // ตรวจสอบชนิดไฟล์รูปที่อัพโหลด
      if (imageTypes.indexOf(input.files[0].type) < 0) {
      return reject({ Message: 'กรุณาอัพโหลดรูปเท่านั้น'});
    }
  // ตรวจสอบขนาดของรูปภาพ
      if ((input.files[0].size / 1024) > imageSize) {
      return reject({ Message: `กรุณาอัพโหลดภาพไม่เกิน ${imageSize} KB`});
    }
      const reader = new FileReader();
      reader.readAsDataURL(input.files[0]);
      // คืนค่า image base64
      reader.addEventListener('load', () => resolve(reader.result));
    });
  }

}
