import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
import { BalanceSectionComponent } from './balance-section.component';
import { TransactionSectionComponent } from './transaction-section.component';


@Component({
  standalone: true,
  imports: [RouterModule, HdWalletMultiButtonComponent, BalanceSectionComponent, TransactionSectionComponent],
  selector: 'monoblock-root',
  template: `
    <header class="border-2 border-current w-full h-16 flex items-center p-2 justify-between">
        <h2>MONOBLOCK APP</h2>

        <hd-wallet-multi-button></hd-wallet-multi-button>
    </header>
    <monoblock-balance-section></monoblock-balance-section>
    <monoblock-transaction-section></monoblock-transaction-section>
  
    `,
})
export class AppComponent {}
