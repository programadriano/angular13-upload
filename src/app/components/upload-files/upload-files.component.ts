import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadFilesService } from 'src/app/services/upload-files.service';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {

  selectedFiles?: Array<FileList>;
  message: string[] = [];
  imageInfos?: Observable<any>;

  constructor(private uploadService: UploadFilesService) { }

  ngOnInit() { }

  selectFiles(event: any): void {
    this.message = [];

    this.selectedFiles = [];
    if (event.target.files.length === 0) {
      return;
    }
    for (let i = 0; i < event.target.files.length; i++) {
      console.log(event.target.files[i]);
      this.selectedFiles.push(event.target.files[i]);
    }

  }

  uploadFiles(): void {
    this.message = [];
    if (!this.selectedFiles || this.selectedFiles.length === 0) {
      return;
    }

    const formData = new FormData();
    this.selectedFiles.forEach((f: any) => {
      formData.append('file', f)
    });


    this.upload(formData);

  }

  upload(file: any): void {
    if (file) {
      this.uploadService.upload(file).subscribe(
        (event: any) => {
          this.message = event.body.urlImagem;
        },
        (err: any) => {
          const msg = 'Could not upload';
          this.message.push(msg);
        });
    }
  }
}
