#!/usr/bin/env node

import * as esbuild from 'esbuild';
import svgr from 'esbuild-plugin-svgr';
import fs from 'fs';
import crypto from 'crypto';

const isWatchMode = process.argv.includes('--watch');

// https://gist.github.com/adamziel/ab4bf95756d70c1aefd1dc56fbed2c62
const wpDepsPlugin = {
  name: 'import-wordpress-deps',
  setup(currentBuild) {
    currentBuild.onResolve({ filter: /^react|react-dom$/ }, (args) => ({
      path: args.path,
      namespace: 'wp-element',
    }));
    currentBuild.onLoad({ filter: /^react\/jsx-runtime$/ }, () => ({
      contents:
        'module.exports = { default: window.ReactJSXRuntime, ...window.ReactJSXRuntime }',
      loader: 'js',
    }));
    currentBuild.onLoad({ filter: /.*/, namespace: 'wp-element' }, () => ({
      contents:
        'module.exports = { default: window.wp.element, ...window.wp.element }',
      loader: 'js',
    }));

    const wpImportMap = {
      '@wordpress/a11y': 'wp.a11y',
      '@wordpress/api-fetch': 'wp.apiFetch',
      '@wordpress/autop': 'wp.autop',
      '@wordpress/blob': 'wp.blob',
      '@wordpress/block-directory': 'wp.blockDirectory',
      '@wordpress/block-editor': 'wp.blockEditor',
      '@wordpress/block-library': 'wp.blockLibrary',
      '@wordpress/block-serialization-default-parser':
        'wp.blockSerializationDefaultParser',
      '@wordpress/blocks': 'wp.blocks',
      '@wordpress/components': 'wp.components',
      '@wordpress/compose': 'wp.compose',
      '@wordpress/core-data': 'wp.coreData',
      '@wordpress/data': 'wp.data',
      '@wordpress/date': 'wp.date',
      '@wordpress/deprecated': 'wp.deprecated',
      '@wordpress/dom': 'wp.dom',
      '@wordpress/dom-ready': 'wp.domReady',
      '@wordpress/edit-navigation': 'wp.editNavigation',
      '@wordpress/edit-post': 'wp.editPost',
      '@wordpress/edit-site': 'wp.editSite',
      '@wordpress/edit-widgets': 'wp.editWidgets',
      '@wordpress/editor': 'wp.editor',
      '@wordpress/element': 'wp.element',
      '@wordpress/escape-html': 'wp.escapeHtml',
      '@wordpress/format-library': 'wp.formatLibrary',
      '@wordpress/hooks': 'wp.hooks',
      '@wordpress/html-entities': 'wp.htmlEntities',
      '@wordpress/i18n': 'wp.i18n',
      '@wordpress/icons': 'wp.icons',
      '@wordpress/is-shallow-equal': 'wp.isShallowEqual',
      '@wordpress/keyboard-shortcuts': 'wp.keyboardShortcuts',
      '@wordpress/keycodes': 'wp.keycodes',
      '@wordpress/notices': 'wp.notices',
      '@wordpress/nux': 'wp.nux',
      '@wordpress/plugins': 'wp.plugins',
      '@wordpress/preferences': 'wp.preferences',
      '@wordpress/preferences-persistence': 'wp.preferencesPersistence',
      '@wordpress/primitives': 'wp.primitives',
      '@wordpress/reusable-blocks': 'wp.reusableBlocks',
      '@wordpress/rich-text': 'wp.richText',
      '@wordpress/shortcode': 'wp.shortcode',
      '@wordpress/url': 'wp.url',
      '@wordpress/viewport': 'wp.viewport',
      '@wordpress/warning': 'wp.warning',
      '@wordpress/widgets': 'wp.widgets',
      '@wordpress/wordcount': 'wp.wordcount',
    };

    const resolvedWpDeps = new Set();
    for (const [src, dest] of Object.entries(wpImportMap)) {
      currentBuild.onResolve({ filter: new RegExp(`^${src}$`) }, (args) => {
        resolvedWpDeps.add(dest);
        return {
          path: args.path,
          namespace: src,
        };
      });
      currentBuild.onLoad({ filter: /.*/, namespace: src }, () => {
        return {
          contents: 'module.exports = ' + dest,
          loader: 'js',
        };
      });
    }

    currentBuild.onEnd(() => {
      // Get all entrypoints
      const entrypoints = currentBuild.initialOptions.entryPoints;
      const deps = JSON.stringify(
        [...resolvedWpDeps]
          // wp.element to wp-element
          .map((dep) => dep.replace('.', '-'))
          // wp-blockEditor to wp-block-editor
          .map((dep) =>
            dep.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
          )
      );
      // Get all built files paths
      for (const outfile in entrypoints) {
        const builtFile =
          currentBuild.initialOptions.outdir + '/' + outfile + '.js';
        const hash = hashFiles([builtFile]);
        const hashesFile =
          currentBuild.initialOptions.outdir + `/${outfile}.asset.php`;
        // Write hash and deps to a PHP file
        fs.writeFileSync(
          hashesFile,
          `<?php return array(
            'version' => '${hash}',
            'dependencies' => ${deps}
          );
          `
        );
      }
    });
  },
};

const buildOptions = {
  entryPoints: {
    app: './assets/entry.jsx'
  },
  outdir: 'dist',
  bundle: true,
  minify: !isWatchMode,
  sourcemap: isWatchMode,
  target: 'es6',
  logLevel: 'info',
  platform: 'browser',
  jsxFactory: 'wp.element.createElement',
  jsxImportSource: 'react',
  jsxFragment: 'wp.element.Fragment',
  tsconfig: './tsconfig.json',
  plugins: [
    svgr(),
    wpDepsPlugin,
    cleanup()
  ]
};

if (isWatchMode) {
  let ctx = await esbuild.context(buildOptions);
  await ctx.watch();
  console.log('Watching...');
} else {
  console.log('Building...');
  await esbuild.build(buildOptions);
}

function hashFiles(filePaths) {
  // if all files exist
  if (!filePaths.every(fs.existsSync)) {
    return '';
  }
  return sha256(
    Buffer.concat(filePaths.map((filePath) => fs.readFileSync(filePath)))
  );
}

function cleanup() {
  return {
    name: 'cleanupFiles',
    setup(build) {
      const options = build.initialOptions;
      build.onStart(() => {
        if (fs.existsSync(options.outdir)) {
          fs.readdirSync(options.outdir).forEach((path) => {
            fs.unlinkSync(options.outdir + '/' + path);
          });
        }
      });
    },
  };
}

function sha256(buffer) {
  const hash = crypto.createHash('sha256');
  hash.update(buffer);
  return hash.digest('hex');
}