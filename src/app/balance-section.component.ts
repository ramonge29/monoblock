import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { computedAsync } from 'ngxtension/computed-async';
import { ShyftApiService } from './shyft-api.service';
import { transferModalComponent } from './transfer-modal.componet';

@Component({
  selector: 'monoblock-balance-section',
  standalone: true,
  imports: [MatTableModule, MatCard, MatButton],
  template: `
    <!-- <section
      class="flex flex-row h-16 mt-16 m-auto w-11/12 align-middle justify-center"
    >
      <p class="text-center align-middle">Conecta tu Wallet para ver el Balance.</p>
      @if (account()) {
        <div class="flex align-middle gap-4 ml-6">
          <img [src]="account()?.info?.image" class="w-8 h-8 " />
          <p>{{ account()?.balance }}</p>
        </div>
      }
    </section> -->
    <mat-card class="w-[500px] mt-6 px-4 py-8 justify-center flex m-auto">
      <h2 class="text-center text-3xl mb-4">Balance</h2>

      @if (!account()) {
        <p class="text-center">Conecta tu wallet para ver tu balance.</p>
      } @else {
        <div class="flex justify-center items-center gap-2 mb-4">
          <img [src]="account()?.info?.image" class="w-16 h-16" />
          <p class="text-5xl font-bold">{{ account()?.balance }}</p>
        </div>

        <footer class="flex justify-center items-center gap-2">
          <button (click)="onTransfer()" mat-raised-button color="primary">
            Transferir Fondos
          </button>
        </footer>
      }
    </mat-card>
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
    this._matDialog.open(transferModalComponent);
  }
}
