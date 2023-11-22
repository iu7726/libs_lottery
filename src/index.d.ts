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

export function getIndexFromUnitList(
  value: number,
  countTable: Array<number>
): number;

export function getCodeFromProductList(
  productList: LotteryProduct[]
): string | number;

export function getExpectdPercentFromProductList(
  productList: LotteryProduct[]
): LotteryProductSimmulateResult[];

export function simulateFromLotterProductList(
  simulateCount: number,
  productList: LotteryProduct[]
): LotteryProductSimmulateResult[];

export function getRandom(): number;
export function getRandomFromRange(start: number, end: number): number;
