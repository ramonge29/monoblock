import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConnectionStore } from '@heavy-duty/wallet-adapter';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
import { BalanceSectionComponent } from './balance-section.component';
import { ShyftApiService } from './shyft-api.service';
import { TransactionSectionComponent } from './transaction-section.component';
@Component({
  standalone: true,
  imports: [
    RouterModule,
    HdWalletMultiButtonComponent,
    BalanceSectionComponent,
    TransactionSectionComponent,
  ],
  selector: 'monoblock-root',
  template: `
    <header
      class="border-2 border-current w-full h-16 flex items-center p-2 justify-between"
    >
      <h2 class="text-4xl">MONOBLOCK APP</h2>

      <hd-wallet-multi-button></hd-wallet-multi-button>
    </header>
    <monoblock-balance-section></monoblock-balance-section>
    <monoblock-transaction-section></monoblock-transaction-section>
  `,
})
export class AppComponent implements OnInit {
  private readonly _connectionStore = inject(ConnectionStore);
  private readonly _ShyftApiService = inject(ShyftApiService);

  ngOnInit() {
    this._connectionStore.setEndpoint(this._ShyftApiService.getEndPoint());
  }
}
