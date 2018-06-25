var MarkupIt = require('markup-it');
var markdownSyntax = require('markup-it/syntaxes/markdown');
var htmlSyntax = require('markup-it/syntaxes/html');

var markdown = new MarkupIt(markdownSyntax);
var html = new MarkupIt(htmlSyntax);

function parseMarkdown (text) {
  md = markdown.toContent(text);
  parsed = html.toText(md);
  return parsed;
};

function wrap (block, position) {
  var body = ('<div class="ba-'+ position + '">'
  + parseMarkdown(block.body)
  + '</div>');

  return {
    body: body,
    parse: true
  };
}

module.exports = {
    website: {
      assets: './assets',
      css: [ 'plugin.css' ]
    },
    ebook: {
      assets: './assets',
      css: [ 'plugin.css' ]
    },
    blocks: {
      left: {
        process: function(block) {
          return wrap(block, 'left');
        }
      },
      right: {
        process: function(block) {
          return wrap(block, 'right');
        }
      },
      center: {
        process: function(block) {
          return wrap(block, 'center');
        }
      }
    }
};
