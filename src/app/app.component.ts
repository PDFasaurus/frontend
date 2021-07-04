import { Component, OnInit, AfterViewChecked, ChangeDetectorRef, OnDestroy } from '@angular/core';

// This is for the external script in the HTML file
declare global {
  interface Window {
    feather: any;
    mqtt: any;
    Paddle: any;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'pdfasaurus';

  ngOnInit() {
  }

  ngAfterViewChecked() {
    window.feather.replace();
  }
}
