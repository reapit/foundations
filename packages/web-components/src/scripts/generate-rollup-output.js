const generateRollupOutput = ({ fileName, name, production }) => {
  const IIFEOutput = {
    sourcemap: !production,
    format: 'iife',
    name: `${name}IIFE`,
    file: `./public/dist/${fileName}.js`,
  }

  if (production) {
    return [
      IIFEOutput,
      {
        sourcemap: !production,
        format: 'cjs',
        name: `${name}Cjs`,
        file: `./public/dist-npm/cjs/${fileName}.js`,
      },
      {
        sourcemap: !production,
        format: 'es',
        name: `${name}Esm`,
        file: `./public/dist-npm/esm/${fileName}.js`,
      },
    ]
  }

  return IIFEOutput
}

export default generateRollupOutput
