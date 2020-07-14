import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { DownloadFromYoutubeRequest } from './DownloadFromYoutubeRequest';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  youtubeDownloadForm: FormGroup;

  get youtubeUrl(): AbstractControl {
    return this.youtubeDownloadForm.get('youtubeUrl');
  }

  constructor(private readonly http: HttpClient, private readonly formBuilder: FormBuilder) {
  }

  downloadFromYoutube() {
    this.http.post('/Build/DownloadFromYoutube', {
    }).subscribe(
      (response) => {
        console.info(response);
      },
      (error) => {
        console.info(error);
      },
    );
  }

  ngOnInit() {
    this.youtubeDownloadForm = this.formBuilder.group({
      youtubeUrl: [null, Validators.required],
    });
  }

  runMijnZvdZBuild() {
    this.http.post<DownloadFromYoutubeRequest>('/Build/Run', {
      youtubeUrl: this.youtubeUrl.value
    }).subscribe(
      (response) => {
        console.info(response);
      },
      (error) => {
        console.info(error);
      },);
  }
}
