"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomFromRange = exports.getRandom = exports.simulateFromLotterProductList = exports.getExpectdPercentFromProductList = exports.getCodeFromProductList = exports.getIndexFromUnitList = void 0;
const mulberry32 = (range) => {
    const timeSeed = Date.now();
    const randomSeed = Math.random() * Math.pow(10, 14);
    let seed = timeSeed + randomSeed;
    var t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return Math.floor((((t ^ (t >>> 14)) >>> 0) / 4294967296) * range);
};
const accCountFromArrayWithIndex = (index, array) => {
    return array.reduce((acc, curr, i) => (index > i ? acc + curr : acc), 0);
};
const getRangeList = (unitList) => {
    return [
        ...[0],
        ...unitList.map((v, i) => accCountFromArrayWithIndex(i + 1, unitList)),
    ];
};
const getIndexFromUnitList = (value, countTable) => {
    if (countTable.indexOf(0) > -1)
        return -1;
    const rangeTable = getRangeList(countTable);
    for (let i = 0; i < rangeTable.length - 1; i++) {
        if (rangeTable[i] <= Math.floor(value) &&
            Math.floor(value) < rangeTable[i + 1]) {
            return i;
        }
    }
    return -1;
};
exports.getIndexFromUnitList = getIndexFromUnitList;
const getCodeFromProductList = (productList) => {
    const codeList = productList.map((product) => product.code);
    const unitList = productList.map((product) => product.unit);
    const totalCount = unitList.reduce((p, v) => p + v, 0);
    const index = (0, exports.getIndexFromUnitList)(mulberry32(totalCount), unitList);
    return codeList[index];
};
exports.getCodeFromProductList = getCodeFromProductList;
const getExpectdPercentFromProductList = (productList) => {
    const totalUnit = productList.reduce((p, v) => p + v.unit, 0);
    return productList.map((product) => {
        return {
            code: product.code,
            unit: product.unit,
            percent: (product.unit / totalUnit) * 100,
        };
    });
};
exports.getExpectdPercentFromProductList = getExpectdPercentFromProductList;
const simulateFromLotterProductList = (simulateCount, productList) => {
    let result = (0, exports.getExpectdPercentFromProductList)(productList);
    const unitList = productList.map((product) => product.unit);
    const resultIndexList = new Array(unitList.length).fill(0);
    const totalUnit = productList.reduce((p, v) => p + v.unit, 0);
    for (let i = 0; i < simulateCount; i++) {
        resultIndexList[(0, exports.getIndexFromUnitList)(mulberry32(totalUnit), unitList)]++;
    }
    result = result.map((simulate, index) => {
        simulate.drawCount = resultIndexList[index];
        simulate.drawPercent = (resultIndexList[index] / simulateCount) * 100;
        simulate.differentPercent =
            simulate.percent - (resultIndexList[index] / simulateCount) * 100;
        return simulate;
    });
    return result;
};
exports.simulateFromLotterProductList = simulateFromLotterProductList;
const getRandom = () => {
    return mulberry32(10000000) / 10000000;
};
exports.getRandom = getRandom;
const getRandomFromRange = (start, end) => {
    if (end > start)
        return mulberry32(end - start) + start;
    return -1;
};
exports.getRandomFromRange = getRandomFromRange;
// const lotteryProductList: LotteryProduct[] = [
//   {
//     code: "A1",
//     unit: 120,
//   },
//   {
//     code: "A2",
//     unit: 240,
//   },
//   //   {
//   //     code: "A3",
//   //     unit: 480,
//   //   },
//   //   {
//   //     code: "A4",
//   //     unit: 960,
//   //   },
//   //   {
//   //     code: "B1",
//   //     unit: 560,
//   //   },
//   //   {
//   //     code: "B2",
//   //     unit: 100,
//   //   },
//   //   {
//   //     code: "B3",
//   //     unit: 100,
//   //   },
//   {
//     code: "VIP",
//     unit: 2,
//   },
// ];
// console.log(simulateFromLotterProductList(10000, lotteryProductList));
// console.log(getCodeFromProductList(lotteryProductList));
// console.log(getRandom())
// console.log(getRandomFromRange(100, 150))
