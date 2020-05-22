// Other node scripts will used this file: webpack.sass.prod
module.exports = {
  output: 'dist/index.css',
  minify: true,
  whitelist: [
    '*react-datepicker*',
    '*is*',
    '*mt*',
    '*mb*',
    '*ml*',
    '*mr*',
    '*mx*',
    '*my*',
    '*pt*',
    '*pb*',
    '*pl*',
    '*pr*',
    '*px*',
    '*py*',
    '*flex*',
    '*justify*',
    '*items-center*',
    '*pin*',
    '*absolute*',
    '*relative*',
    '*capitalize*',
    'mw-100',
    '.data-grid-container .data-grid .cell .value-viewer',
    '.data-grid-container .data-grid .cell .data-editor',
  ],
  // Uncomment this line if you want to see the CSS purified from the package
  // rejected: true
}
