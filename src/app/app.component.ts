import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';


@Component({
  standalone: true,
  imports: [RouterModule, HdWalletMultiButtonComponent],
  selector: 'monoblock-root',
  template: `
    <header class="border-2 border-current h-16 flex items-center p-2">
        <h2>MONOBLOCK APP</h2>

        <hd-wallet-multi-button></hd-wallet-multi-button>
    </header>  `,
})
export class AppComponent {}
