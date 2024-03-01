import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';

export interface TransferFormModel {
    memo: string | null;
    amount : number | null;
    receiverAddress: string | null;
}

export interface TransferFormPayLoad{
    memo: string;
    amount: number;
    receiverAddress: string;
}


@Component({
    selector: 'monoblock-transfer-form',
    standalone: true,
    imports: [FormsModule, MatFormFieldModule, MatInput, MatIcon, MatButton],
    template:`
        <form #form="ngForm" class="w-[400px]" (ngSubmit)="onSubmitForm(form)">
            <mat-form-field appearance="fill" class="w-full mb-4">
            <mat-label>Concept</mat-label>
            <input 
                matInput
                name="memo"
                type="text" 
                placeholder="Ejemplo: compra asado."
                [(ngModel)]="model.memo"
                required
                #memoControl="ngModel"
            />
            <mat-icon matSuffix>description</mat-icon>

            @if (form.submitted && memoControl.errors) {
                <mat-error>
                    @if (memoControl.errors['required']){
                        El motivo es obligatorio
                    }
                </mat-error>
            } @else {
                <mat-hint> Debe ser el motivo de la transferencia </mat-hint>
            }
        </mat-form-field>
        <mat-form-field appearance="fill" class="w-full mb-4">
            <mat-label>Monto</mat-label>
            <input 
                matInput
                name="amount"
                type="numbre" 
                min="0"
                placeholder="Ingresa el monto acá"
                [(ngModel)]="model.amount"
                required
                #amountControl="ngModel"
            />
            <mat-icon matSuffix>attach_money</mat-icon>

            @if (form.submitted && amountControl.errors) {
                <mat-error>
                    @if (amountControl.errors['required']){
                        El monto es obligatorio
                    } @else if (amountControl.errors['min']){
                        El monto debe ser mayor a cero (0)
                    }
                </mat-error>
            } @else {
                <mat-hint> Debe ser ser un monto mayor a cero. </mat-hint>
            }
        </mat-form-field>
        <mat-form-field appearance="fill" class="w-full mb-4">
            <mat-label>Destinatario</mat-label>
            <input 
                matInput
                name="receiverAddress"
                type="string" 
                placeholder="Public Key de la Wallet del destinatario"
                [(ngModel)]="model.receiverAddress"
                required
                #receiverAddressControl="ngModel"
            />
            <mat-icon matSuffix>key</mat-icon>

            @if (form.submitted && receiverAddressControl.errors) {
                <mat-error>
                    @if (receiverAddressControl.errors['required']){
                        El destinatario es obligatorio
                    }
                </mat-error>
            } @else {
                <mat-hint> Debe ser ser una Wallet de Solana. </mat-hint>
            }
        </mat-form-field>
        <div class="flex justify-center">
            <button type="submit" mat-raised-button color="primary"> Enviar</button>
        </div>
        </form>
    `,
    })

export class TransferFormComponent {
    readonly model : TransferFormModel = {
        memo : null,
        amount: null,
        receiverAddress: null,
    }
    
    @Output() readonly submitForm = new EventEmitter<TransferFormPayLoad>()
    
    onSubmitForm(form: NgForm) {
        if (form.invalid || 
            this.model.amount === null || 
            this.model.memo === null || 
            this.model.receiverAddress === null) {
            console.error('El Fomulario es inválido.')
        } else {
            this.submitForm.emit({
                amount: this.model.amount,
                memo: this.model.memo,
                receiverAddress: this.model.receiverAddress
            })
        }
    }
}
