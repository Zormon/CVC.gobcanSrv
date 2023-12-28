import * as esbuild from 'esbuild';

const options = {
  entryPoints: ['./src/index.ts'],
  outfile: './dist/index.js',
  bundle: true,
  packages: 'external',
  platform: 'node',
  format: 'cjs',
  plugins: [],
}


if (process.env.WATCH === 'yes') {
  const ctx = await esbuild.context(options);
  await ctx.watch();
} else {
  esbuild.build(options);
}
