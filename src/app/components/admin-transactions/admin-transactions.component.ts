import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Transaction, TransactionsService } from 'src/app/services/transactions.service';
import { CurrencyPipe } from '@angular/common';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AddTransactionComponent } from '../add-transaction/add-transaction.component';

@Component({
  selector: 'app-admin-transactions',
  templateUrl: './admin-transactions.component.html',
  providers: [CurrencyPipe]
})
export class AdminTransctionsComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['date', 'time', 'user', 'product', 'total', 'actions'];
  transactions: Transaction[] = [];
  dataSource = new MatTableDataSource(this.transactions);
  userNameMap = new Map<string, string>();

  constructor(
    private _transactionService: TransactionsService,
    private currencyPipe: CurrencyPipe,
    private bottomSheet: MatBottomSheet
  ) { }

  public userNameDisplay(transaction: Transaction) {
    return this.userNameMap.get(transaction.user.path);
  }

  public creationDateDisplay(transaction: Transaction): string {
    const date = new Date(transaction.creationTime);
    return date.toLocaleDateString();
  }

  public creationTimeDisplay(transaction: Transaction): string {
    const date = new Date(transaction.creationTime);
    return date.toLocaleTimeString();
  }

  public addTransaction() {
    this.bottomSheet.open(AddTransactionComponent, {
      data: []
    });
  }

  public deleteTransaction(transaction: Transaction) {
    this._transactionService.deleteTransaction(transaction);
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator!.firstPage();
  }

  ngAfterViewInit() {
    this._transactionService.transactions.subscribe((transactions) => {
      this.transactions = transactions;
      this.dataSource.data = transactions;
      transactions.forEach((transaction) => {
        transaction.user.get().then((user) => {
          this.userNameMap.set(transaction.user.path, user.data()!.displayName);
        });
      })
    });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate = (data, filter: string) => {
      let searchString =
        this.currencyPipe.transform(data.product.price, "EUR", "symbol", "2.2", "de-DE") + " " +
        this.creationDateDisplay(data) + " " +
        this.creationTimeDisplay(data) + " " +
        data.product.name + " " +
        this.userNameMap.get(data.user.path);
      searchString = searchString.trim().toLowerCase();
      return searchString.includes(filter);
    };
  }
}

