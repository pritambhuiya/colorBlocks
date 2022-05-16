/* eslint-disable no-magic-numbers */
const fs = require('fs');

const random = () => Math.floor(Math.random() * 256);

const colorCode = () => [random(), random(), random()].join(',');

const colorPicker = () => 'rgb(' + colorCode() + ');';

const generateStyle = (styleContents) => ' style = "' + styleContents + '"';

const generateTag = (tag, contents, style = '') =>
  '<' + tag + style + '>' + contents + '</' + tag.split(' ')[0] + '>';

const block = () => {
  const blockStyle = 'width: 5%;height: 5%;background-color:' + colorPicker();
  return generateTag('div', '', generateStyle(blockStyle));
};

const allBlocks = (numberOfBlocks) => {
  let blocks = '';

  Array(numberOfBlocks).fill(1).forEach(() => {
    blocks += block();
  });

  return blocks;
};

const colorBlocksContainer = (colorBlocks) => {
  // eslint-disable-next-line max-len
  const containerStyle = 'display: flex; flex-wrap: wrap; align-content: center; overflow:hidden; width: 900px; height: 900px';

  return generateTag('div', colorBlocks, generateStyle(containerStyle));
};

const generatePage = (container) =>
  generateTag('html', generateTag('body', container));

const colorBlocks = function (numberOfBlocks) {
  const colorBlocks = allBlocks(numberOfBlocks);
  const container = colorBlocksContainer(colorBlocks);
  const pageContents = generatePage(container);

  fs.writeFileSync('colorBlocks.html', pageContents, 'utf8');
};

colorBlocks(1000);
