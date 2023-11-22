# Lottery Product Simulation Script

![TypeScript](https://img.shields.io/badge/language-TypeScript-blue)
![Version](https://img.shields.io/badge/version-1.0.0-orange)

## Introduction
This script provides a set of TypeScript functions for simulating lottery draws based on a list of products. It utilizes a custom random number generator (mulberry32) and offers functionality for simulating draws, calculating expected percentages, and getting random numbers within a specified range.

## Features
- Custom Random Number Generator: Uses mulberry32 for generating random numbers.
- Lottery Draw Simulation: Simulate lottery draws based on product units.
- Expected Percentage Calculation: Calculate the expected percentage for each product.
- Range-based Random Number Generation: Generate random numbers within a specified range.

## Installation
This script is written in TypeScript. Ensure you have Node.js and TypeScript installed in your environment.

1. Install Node.js: [Download Node.js](https://nodejs.org/en)
2. Install NPM: Run `npm install`

## Usage
Import the functions from the script into your TypeScript project:
```typescript
import {
  getCodeFromProductList,
  simulateFromLotterProductList,
  getRandom,
  getRandomFromRange,
} from './path-to-script';
```

## Functions
- `getCodeFromProductList`: Retrieves a random product code from the list based on the product units.
- `simulateFromLotterProductList`: Simulates a set number of lottery draws and returns the results.
- `getRandom`: Returns a random number between 0 and 1.
- `getRandomFromRange`: Generates a random number within a specified range.


## Examples

### Simulating Lottery Draws

```javascript
const productList = [
  { code: "A", unit: 10 },
  { code: "B", unit: 20 },
  // more products...
];

const simulationResults = simulateFromLotterProductList(1000, productList);
console.log(simulationResults);
```

### Generating a Random Number within a Range

```javascript
const randomNum = getRandomFromRange(10, 50);
console.log(randomNum);
```