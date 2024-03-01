/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component } from '@angular/core';
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
    onTransfer(payload: TransferFormPayLoad) {
        console.log('hola mundo', payload);
    }
}