import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
import { BalanceSectionComponent } from './balance-section.component';


@Component({
  standalone: true,
  imports: [RouterModule, HdWalletMultiButtonComponent, BalanceSectionComponent],
  selector: 'monoblock-root',
  template: `
    <header class="border-2 border-current h-16 flex items-center p-2 justify-between">
        <h2>MONOBLOCK APP</h2>

        <hd-wallet-multi-button></hd-wallet-multi-button>
    </header>
    <monoblock-balance-section></monoblock-balance-section>

    `,
})
export class AppComponent {}
