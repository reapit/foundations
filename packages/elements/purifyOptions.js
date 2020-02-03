// Other node scripts will used this file: webpack.sass.prod
module.exports = {
  output: 'dist/index.css',
  minify: true,
  whitelist: [
    '*react-datepicker*',
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
  ],
  // Uncomment this line if you want to see the CSS purified from the package
  // rejected: true
}
