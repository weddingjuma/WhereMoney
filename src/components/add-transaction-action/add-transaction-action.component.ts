/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  05.11.2016
 * Time: 23:56
 */


import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AddTransactionPage } from '../../pages/add-transaction/add-transaction';


@Component({
    selector: 'add-transaction-action-component',
    templateUrl: 'add-transaction-action.component.html'
})


export class AddTransactionAction {


    /**
     *
     * @param navCtrl
     */
    constructor(private navCtrl: NavController) { }


    public handlerClick(): void {
        this.navCtrl.push(AddTransactionPage);
    }


}