import {
  getCodeFromProductList,
  getRandom,
  getRandomFromRange,
  LotteryProduct,
  simulateFromLotterProductList,
} from "./index";

const lotteryProductList: LotteryProduct[] = [
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

console.log(simulateFromLotterProductList(10000, lotteryProductList));
console.log(getCodeFromProductList(lotteryProductList));
console.log(getRandom());
console.log(getRandomFromRange(100, 150));
