"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const lotteryProductList = [
    {
        code: "A1",
        unit: 120,
    },
    {
        code: "A2",
        unit: 240,
    },
    {
        code: "A3",
        unit: 480,
    },
    {
        code: "A4",
        unit: 960,
    },
    {
        code: "B1",
        unit: 560,
    },
    {
        code: "B2",
        unit: 100,
    },
    {
        code: "B3",
        unit: 100,
    },
    {
        code: "VIP",
        unit: 2,
    },
];
console.log((0, index_1.simulateFromLotterProductList)(10000, lotteryProductList));
console.log((0, index_1.getCodeFromProductList)(lotteryProductList));
console.log((0, index_1.getRandom)());
console.log((0, index_1.getRandomFromRange)(100, 150));
