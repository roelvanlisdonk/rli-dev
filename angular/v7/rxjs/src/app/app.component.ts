import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rxjs';

  execute() {
    // Output 1 dot, 2 dots, 3 dots ... 10 dots.
    interval(350).pipe(
        take(10),
        map(num => '•'.repeat(num + 1))
    ).subscribe(console.log);
  }
}
