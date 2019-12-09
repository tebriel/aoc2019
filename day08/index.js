#!/usr/bin/env node
const argv = require('yargs').argv;
const fs = require('fs');
const process = require('process');

/**
 * Build a layer from a set of pixels
 *
 * @param   {string} pixels - A list of width * height pixels
 * @param   {number} width  - The width of the layer
 * @param   {number} height - The height of the layer
 * @returns {Array}         - The 2D array of the layer
 */
function buildLayer(pixels, width, height) {
  const result = [];
  let strIdx = 0;
  for (let row = 0; row < height; row += 1) {
    result[row] = new Int8Array(width);
    for (let column = 0; column < width; column += 1) {
      strIdx = width * row + column;
      result[row][column] = Number.parseInt(pixels[strIdx], 10);
    }
  }
  return result;
}

/**
 * Count the instances of a value in a layer
 *
 * @param   {number} instance  - The instance to count
 * @param   {Array} layer      - The layer to search in
 * @returns {number}             The count of the instances
 */
function countInstances(instance, layer) {
  let total = 0;
  // eslint-disable-next-line no-return-assign
  layer.forEach((row) => row.forEach((column) => total += (1 ? column === instance : 0)));
  return total;
}

module.exports = { buildLayer, countInstances };

if (require.main === module) {
  const input = fs.readFileSync(argv.data, 'utf-8').split('\n')[0];
  const layerSize = 25 * 6;
  const layers = [];
  for (let idx = layerSize; idx < input.length; idx += layerSize) {
    layers.push(buildLayer(input.slice(idx - layerSize, idx + 1), 25, 6));
  }

  const zerosCount = layers.map((layer) => countInstances(0, layer));
  const largestCount = Math.min(...zerosCount);
  const targetLayer = layers[zerosCount.indexOf(largestCount)];
  const onesCount = countInstances(1, targetLayer);
  const twosCount = countInstances(2, targetLayer);
  process.stdout.write(`${onesCount} * ${twosCount} == ${onesCount * twosCount}\n`);
}
