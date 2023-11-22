const mulberry32 = (range: number) => {
  const timeSeed = Date.now();
  const randomSeed = Math.random() * Math.pow(10, 14);
  let seed: number = timeSeed + randomSeed;
  var t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return Math.floor((((t ^ (t >>> 14)) >>> 0) / 4294967296) * range);
};

const accCountFromArrayWithIndex = (index: number, array: number[]) => {
  return array.reduce((acc, curr, i) => (index > i ? acc + curr : acc), 0);
};

const getRangeList = (unitList: Array<number>) => {
  return [
    ...[0],
    ...unitList.map((v, i) => accCountFromArrayWithIndex(i + 1, unitList)),
  ];
};

export interface LotteryProduct {
  code: string | number;
  unit: number;
}

export interface LotteryProductSimmulateResult {
  code: string | number;
  unit: number;
  drawCount?: number;
  percent: number;
  drawPercent?: number;
  differentPercent?: number;
}

export const getIndexFromUnitList = (
  value: number,
  countTable: Array<number>
): number => {
  if (countTable.indexOf(0) > -1) return -1;
  const rangeTable = getRangeList(countTable);
  for (let i = 0; i < rangeTable.length - 1; i++) {
    if (
      rangeTable[i] <= Math.floor(value) &&
      Math.floor(value) < rangeTable[i + 1]
    ) {
      return i;
    }
  }
  return -1;
};

export const getCodeFromProductList = (
  productList: LotteryProduct[]
): string | number => {
  const codeList = productList.map((product) => product.code);
  const unitList = productList.map((product) => product.unit);
  const totalCount = unitList.reduce((p, v) => p + v, 0);
  const index = getIndexFromUnitList(mulberry32(totalCount), unitList);
  return codeList[index];
};

export const getExpectdPercentFromProductList = (
  productList: LotteryProduct[]
): LotteryProductSimmulateResult[] => {
  const totalUnit = productList.reduce((p, v) => p + v.unit, 0);
  return productList.map<LotteryProductSimmulateResult>((product) => {
    return {
      code: product.code,
      unit: product.unit,
      percent: (product.unit / totalUnit) * 100,
    };
  });
};

export const simulateFromLotterProductList = (
  simulateCount: number,
  productList: LotteryProduct[]
): LotteryProductSimmulateResult[] => {
  let result = getExpectdPercentFromProductList(productList);
  const unitList = productList.map((product) => product.unit);
  const resultIndexList = new Array(unitList.length).fill(0);
  const totalUnit = productList.reduce((p, v) => p + v.unit, 0);

  for (let i = 0; i < simulateCount; i++) {
    resultIndexList[getIndexFromUnitList(mulberry32(totalUnit), unitList)]++;
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

export const getRandom = (): number => {
  return mulberry32(10000000) / 10000000;
};

export const getRandomFromRange = (start: number, end: number): number => {
  if (end > start) return mulberry32(end - start) + start;
  return -1;
};