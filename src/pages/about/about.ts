/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  05.11.2016
 * Time: 23:56
 */


import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';


@Component({
    selector: 'page-about',
    templateUrl: 'about.html'
})


export class AboutPage {


    public title: string;


    constructor(public navCtrl: NavController) {
        this.title = 'О приложении';
    }


}
