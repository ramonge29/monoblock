import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BalanceSectionComponent } from './balance-section.component';


@Component ({
    standalone: true,
    selector: 'monoblock-home-page',
    imports: [RouterModule, BalanceSectionComponent],
    template:`
    <monoblock-balance-section></monoblock-balance-section>
    `
    
})

export class HomePageComponent {}