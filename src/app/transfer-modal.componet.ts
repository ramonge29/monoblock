/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component } from '@angular/core';
import { createTransferInstructions } from '@heavy-duty/spl-utils';
import { injectTransactionSender } from '@heavy-duty/wallet-adapter';
import { TransferFormComponent, TransferFormPayLoad } from './transfer-form.component';

@Component({
    selector: 'monoblock-transfer-modal',
    standalone: true,
    imports: [TransferFormComponent],
    template: `
    <div class="px-8 py-16 pb-8">
        <h2 class="text-3xl text-center mb-8">tranferir fondos</h2>
        <monoblock-transfer-form (submitForm)="onTransfer($event)"></monoblock-transfer-form>
    </div>
    `,
})

export class transferModalComponent {
    private readonly _transactionSender = injectTransactionSender();

    onTransfer(payload: TransferFormPayLoad) {
        console.log('hola mundo!', payload);
        
        this._transactionSender
        .send(({ publicKey }) => 
            createTransferInstructions({
                amount: payload.amount,
                mintAddress: '7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs',
                receiverAddress: payload.receiverAddress,
                senderAddress: publicKey.toBase58(),
                fundReceiver: true,
                memo: payload.memo,
            }),     
        )
        .subscribe ({
            next: (signature) => console.log(`Firma: ${signature}`),
            error: error => console.error(error),
            complete: () => console.log('Trasaccion lista')
        })    
    }
}