import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './home.component';


@Component({
  standalone: true,
  imports: [RouterModule, HomePageComponent],
  selector: 'monoblock-root',
  template: `
    <monoblock-home-page></monoblock-home-page>  `,
})
export class AppComponent {
  title = 'monoblock';
}
