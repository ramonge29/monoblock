import { Component, inject } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { injectPublicKey } from '@heavy-duty/wallet-adapter';
import { computedAsync } from 'ngxtension/computed-async';
import { ShyftApiService } from './shyft-api.service';

@Component({
  selector: 'monoblock-transaction-section',
  standalone: true,
  imports: [MatCard, MatTableModule],
  template: `
    <mat-card class="w-[600px] px-4 py-8 justify-center m-auto mt-5">
      <h2 class="text-center text-3xl mb-3">Historial de transacciones</h2>
      @if (!transaction()) {
        <p class="text-center justify-center items-center">
          Contecta tu Wallet para ver las transcciones:
        </p>
      } @else if (transaction().length === 0) {
        <p class="text-white">No hay transacciones disponibles.</p>
      } @else {
        <table mat-table [dataSource]="transaction()">
          <ng-container matColumnDef="type">
            <th mat-Header-cell *matHeaderCellDef>Type</th>
            <td mat-cell *matCellDef="let element">{{ element.type }}</td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-Header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let element">{{ element.status }}</td>
          </ng-container>

          <ng-container matColumnDef="timestamp">
            <th mat-Header-cell *matHeaderCellDef>Timestamp</th>
            <td mat-cell *matCellDef="let element">{{ element.timestamp }}</td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      }
    </mat-card>
  `,
})
export class TransactionSectionComponent {
  private readonly _ShyftApiService = inject(ShyftApiService);
  private readonly _publicKey = injectPublicKey();

  readonly displayedColumns = ['type', 'status', 'timestamp'];
  readonly transaction = computedAsync(
    () => this._ShyftApiService.getTransactions(this._publicKey()?.toBase58()),
    { requireSync: true },
  );
}
