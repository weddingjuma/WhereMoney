/**
 * Created by 1 on 02.11.2016.
 */




'use strict'


export class Utils {



    /**
     *
     * @param target
     * @param objects
     * @returns {*}
     */
    static extend(target, objects): any {

        for (var object in objects) {
            if (objects.hasOwnProperty(object)) {
                recursiveMerge(target, objects[object]);
            }
        }

        function recursiveMerge(target, object) {
            for (var property in object) {
                if (object.hasOwnProperty(property)) {
                    var current = object[property];
                    if (Utils.getConstructor(current) === 'Object') {
                        if (!target[property]) {
                            target[property] = {};
                        }
                        recursiveMerge(target[property], current);
                    }
                    else {
                        target[property] = current;
                    }
                }
            }
        }

        return target;
    }


    /**
     *
     * @param object
     * @returns {string}
     */
    static getConstructor(object: any): string {
        return Object.prototype.toString.call(object).slice(8, -1);
    }


    /**
     *
     * @param json
     * @returns {null}
     */
    static jsonParse(json: string): any {
        let result = null;
        try {
            result = JSON.parse(json);
        }
        catch (e) {
            throw new Error(e);
        }

        return result;
    }


    /**
     *
     * @param date
     * @returns {any}
     */
    static dateFormatting(date): any {
        let result = '';
        if(date != null) {

            let dateNative = new Date(date);
            if(isNaN(dateNative.getDate())) {
                return date;
            }

            let day = dateNative.getDate();
            let dayResult = day.toString();
            if(day < 10) {
                dayResult = '0' + dayResult;
            }

            let month = dateNative.getMonth() + 1;
            let monthResult = month.toString();
            if(month < 10) {
                monthResult = '0' + monthResult;
            }

            result = dayResult + '.' + monthResult + '.' + dateNative.getFullYear().toString();
        }

        return result;
    }


    /**
     *
     * @param func
     * @param ms
     * @returns {Function}
     */
    static debounce(func: any, ms: number) {
        var state = null;
        var COOLDOWN = 1;
        return function() {
            if (state) {
                return;
            }

            func.apply(this, arguments);
            state = COOLDOWN;

            setTimeout(function() {
                state = null
            }, ms);
        }
    }


    /**
     *
     * @param fields
     * @returns {function(any, any): *}
     */
    static sortBy (...fields) {
        return function(A, B) {
            var a, b, field, key, reverse, result;
            for (var i = 0, l = fields.length; i < l; i++) {
                result = 0;
                field = fields[i];

                key = typeof field === 'string' ? field : field.name;

                a = A[key];
                b = B[key];

                reverse = (field.reverse) ? -1 : 1;

                if (a < b) result = reverse * -1;
                if (a > b) result = reverse * 1;
                if (result !== 0) break;
            }
            return result;
        }
    }


    /**
     *
     * @param number
     * @param titles
     * @returns {string}
     */
    static declOfNum(number: number, titles: string[]): string {
        const cases = [2, 0, 1, 1, 1, 2];
        return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }


    /**
     *
     * @param object
     * @returns {any[]}
     */
    static getObjectValues(object: any): any[] {
        let result: any[] = [];
        if(object != null) {
            for(let key in object) {
                result.push(object[key]);
            }
        }
        else {
            console.error('object is null!')
        }
        return result;
    }


    /**
     *
     * @param number
     * @returns {any}
     */
    static separatedBySpaceNumber(number: any): string {
        if(typeof number === 'number') {
            number = String(number);
        }
        number = number.replace(/\s/gi, '');
        number = number.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        number = number[0] == '-' ?  '- ' + number.slice(1) : number;
        return number;
    }



    /**
     *
     * @param number
     * @param fixed
     * @returns {string}
     */
    static toFixed(number: number, fixed: number): string {
        let result: string = number.toFixed(fixed);
        let numberToArray: string[] = result.split('.');
        let decimals: any = numberToArray[1];
        if(decimals == null) {
            return result;
        }
        else {
            decimals = decimals.split('');
        }

        for(let i = decimals.length - 1; i >= 0; i--) {
            if(decimals[i] === '0') {
                decimals.splice(i, 1);
                i--;
            }
            else {
                break;
            }
        }

        if(decimals.length > 0) {
            result = numberToArray[0] + '.' + decimals.join('');
        }
        else {
            result = numberToArray[0];
        }

        return result;
    }


    /**
     *
     * @param min
     * @param max
     * @returns {number}
     */
    static randomInteger(min: number, max: number): number {
        var rand = min - 0.5 + Math.random() * (max - min + 1);
        rand = Math.round(rand);
        return rand;
    }

}