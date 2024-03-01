import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { computedAsync } from 'ngxtension/computed-async';
import { ShyftApiService } from './shyft-api.service';
import { transferModalComponent } from './transfer-modal.componet';


@Component({
  selector: 'monoblock-balance-section',
  standalone: true,
  template: `
    <section class="flex flex-row h-16 mt-16 m-auto w-11/12 align-middle justify-center">
      <p class="text-center align-middle">Tu balance es:</p>
      @if (account()) {
        <div class="flex align-middle gap-4 ml-6">
          <img [src]="account()?.info?.image" class="w-8 h-8 " />
          <p>{{ account()?.balance }}</p>
        </div>
      }
    </section>
    <div>
      <button class="flex justify-center w-full" (click)="onTransfer()"> Tranferir </button>
    </div>  
  `,
})
export class BalanceSectionComponent {
  private readonly _ShyftApiService = inject(ShyftApiService);
  private readonly _walletStore = inject(WalletStore);
  private readonly _publicKey = toSignal(this._walletStore.publicKey$);
  private readonly _matDialog = inject(MatDialog);

  readonly account = computedAsync(
    () => this._ShyftApiService.getAccount(this._publicKey()?.toBase58()),
    { requireSync: true },
  );

  onTransfer() {
    this._matDialog.open(transferModalComponent)
  }


}
