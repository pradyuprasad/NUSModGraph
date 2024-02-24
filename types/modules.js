"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Semesters = exports.TimesOfDay = exports.DaysOfWeek = exports.WorkingDaysOfWeek = void 0;
exports.WorkingDaysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];
exports.DaysOfWeek = __spreadArray(__spreadArray([], exports.WorkingDaysOfWeek, true), ['Sunday'], false);
exports.TimesOfDay = ['Morning', 'Afternoon', 'Evening'];
exports.Semesters = [1, 2, 3, 4];
