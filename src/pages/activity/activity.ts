/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  05.11.2016
 * Time: 22:43
 */


'use strict';


import { Component, ElementRef } from '@angular/core';

import { DateService } from "../../services/date.service";
import { TransactionService } from "../../services/transaction.service";
import { UserService } from "../../services/user.service";
import { Utils } from "../../libs/Utils";


@Component({
    selector: 'page-activity',
    templateUrl: 'activity.html'
})


export class ActivityPage {


    public title: string;
    public dateISO: any;
    public monthNames: string;
    public monthShortNames: string;
    public dayNames: string;
    public dayShortNames: string;
    public transactions: any[];
    public balance: string;
    public totalCount: number;

    private buttonAdd: any;
    private offset: number;
    private stepOffset: number;
    private limit: number;
    private date: number;


    /**
     *
     * @param element
     * @param dateService
     * @param transactionService
     * @param userService
     */
    constructor(
        private element: ElementRef,
        private dateService: DateService,
        private transactionService: TransactionService,
        private userService: UserService) {

        this.title = 'Активность';
        this.monthNames = this.dateService.getLocaleString('monthNames');
        this.monthShortNames = this.dateService.getLocaleString('monthShortNames');
        this.dayNames = this.dateService.getLocaleString('dayNames');
        this.dayShortNames = this.dateService.getLocaleString('dayShortNames');
        this.dateISO = this.dateService.getISODate(new Date());
        this.transactions = [];
        this.balance = '0';

        this.offset = 0;
        this.stepOffset = 15;
        this.limit = 15;
        this.totalCount = -1;
        this.date = +new Date();
    }


    /**
     *
     */
    public ionViewWillEnter(): void {
        this.cleanTransactions();
        this.renderTransactions();
        this.setCountTransactions();
        this.updateBalance();
    }


    /**
     *
     */
    public ionViewDidEnter(): void {
        this.buttonAdd = this.element.nativeElement.querySelector('.button-add-transaction');
        this.showButtonAddTransaction();
    }


    /**
     *
     */
    public ionViewDidLeave(): void {
        this.hideButtonAddTransaction();
    }


    /**
     *
     * @param infiniteScroll
     */
    public doInfinite(infiniteScroll: any): void {
        this.offset += this.stepOffset;
        this.getTransactions().then(
            (transactions)=> {
                this.transactions = Array.prototype.concat(this.transactions, transactions);
                infiniteScroll.complete();
            },
            (error) => {
                infiniteScroll.complete();
                console.error(`Error: ${error}`);
            }
        );
    }


    /**
     *
     * @param event
     */
    public changeDate(event): void {
        this.cleanTransactions();
        let { day, month, year } = event;
        let date = new Date(`${month.value}.${day.value}.${year.value}`);
        this.date = +date.setHours(23,59,59,59);
        this.renderTransactions();
        this.setCountTransactions();
    }


    /**
     *
     */
    private updateBalance(): void {
        let promise: any = this.userService.getBalance();
        promise.then(
            (result) => {
                let value = result.value;
                if(value != null) {
                    this.balance = Utils.separatedBySpaceNumber(value);
                }
            },
            (error) => {
                console.error(error);
        });
    }


    /**
     *
     */
    private showButtonAddTransaction(): void {
        if(this.buttonAdd != null) {
            this.buttonAdd.classList.add('show');
        }
    }


    /**
     *
     */
    private hideButtonAddTransaction(): void {
        if(this.buttonAdd != null) {
            this.buttonAdd.classList.remove('show');
        }
    }


    /**
     *
     */
    private renderTransactions(): void {
        this.getTransactions().then(
            (transactions)=> {
                this.transactions = Array.prototype.concat(this.transactions, transactions);
            },
            (error) => {
                console.error(error);
            }
        );
    }


    /**
     *
     * @returns {any}
     */
    private getTransactions(): any {
        return this.transactionService.getTransactions(this.limit, this.offset, this.date);
    }


    /**
     *
     */
    private setCountTransactions() {
        this.transactionService.getCountTransactions(this.date).then(
            (count: number) => {
                this.totalCount = count;
            }, (err) => {
                console.error(err);
        });
    }


    /**
     *
     */
    private cleanTransactions(): void {
        this.transactions = [];
        this.offset = 0;
        this.totalCount = -1;
        this.date = +new Date();
    }

}
