/**
 * Created by PhpStorm.
 * Author: 1
 * Project: WhereMoney
 * Date:  04.11.2016
 * Time: 9:40
 */


import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { ActivityPage } from '../activity/activity';
import { BudgetPage } from '../budget/budget';
import { StatsPage } from '../stats/stats';


@Component({
    selector: 'tabs',
    templateUrl: 'tabs.html'
})


export class TabsPage {


    public tab1Root: any = ActivityPage;
    public tab2Root: any = BudgetPage;
    public tab3Root: any = StatsPage;

    private mySelectedIndex: number;


    /**
     *
     * @param navParams
     */
    constructor(private navParams: NavParams) {
        this.mySelectedIndex = navParams.data.tabIndex || 0;
    }


}
