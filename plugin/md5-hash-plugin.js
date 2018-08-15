const crypto = require('crypto');

module.exports = class Md5HashPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('chunk-hash', function (compilation) {
      compilation.hooks.chunkHash.tap("chunk-hash", function (chunk, chunkHash) {
        const source = deduplicateAndConcatValue(Array.from(chunk.modulesIterable).concat(chunk.entryModule._source ? chunk.entryModule : chunk.entryModule.modules));
        const chunk_hash = md5(source);
        chunkHash.digest = function () {
          return chunk_hash;
        };
      });
    });
  }
};

function deduplicateAndConcatValue(modules) {
  const o = {};

  modules.forEach(m => {
    if (m.resource)
      o[m.resource] = (m._source && m._source._value) ? m._source._value.replace(/(?<=require\(['"]).*node_modules\//g, '') : '';
  });

  return Object.keys(o).sort(sortModule).map(key => o[key]).join('');
}

function sortModule(a, b) {
  return a.resource < b.resource ? -1 : 1;
}

function md5(str, len = 20) {
  return crypto.createHash('md5').update(str).digest('hex').substring(0, len);
}
