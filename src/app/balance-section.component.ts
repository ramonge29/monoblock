import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { computedAsync } from 'ngxtension/computed-async';
import { ShyftApiService } from './shyft-api.service';

@Component({
  selector: 'monoblock-balance-section',
  standalone: true,
  template: `
    <section class="flex flex-row h-16 mt-16 m-auto w-11/12 align-middle">
      <p class="text-center align-middle">Tu balance es:</p>
      @if (account()) {
        <div class="flex align-middle gap-4 ml-6">
          <img [src]="account()?.info?.image" class="w-8 h-8 " />
          <p>{{ account()?.balance }}</p>
        </div>
      }
    </section>
  `,
})
export class BalanceSectionComponent {
  private readonly _ShyftApiService = inject(ShyftApiService);
  private readonly _walletStore = inject(WalletStore);
  private readonly _publicKey = toSignal(this._walletStore.publicKey$);

  readonly account = computedAsync(
    () => this._ShyftApiService.getAccount(this._publicKey()?.toBase58()),
    { requireSync: true },
  );
}
