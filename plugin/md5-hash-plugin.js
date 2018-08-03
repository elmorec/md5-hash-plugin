const crypto = require('crypto');

module.exports = class Md5HashPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('chunk-hash', function (compilation) {
      compilation.hooks.chunkHash.tap("chunk-hash", function (chunk, chunkHash) {
        const source = getSource(chunk.entryModule._source ? chunk.entryModule : chunk.entryModule.modules);
        const chunk_hash = md5(source);
        chunkHash.digest = function () {
          return chunk_hash;
        };
      });
    });
  }
};

function getSource(mod) {
  if (!mod) return '';
  if (Array.isArray(mod)) return mod.map(getSource).sort((a, b) => a.resource < b.resource ? -1 : 1).reduce((integral, i) => integral + i, '');

  const _source = mod._source || {};
  return _source._value ? _source._value.replace(/(?<=require\(['"]).*node_modules\//g, '') : '';
}

function md5(str, len = 20) {
  return crypto.createHash('md5').update(str).digest('hex').substring(0, len);
}
