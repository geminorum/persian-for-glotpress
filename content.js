var VirastarWE;

function init() {
  var elements = document.querySelectorAll('textarea.foreign-text');

  if (elements.length < 1) {
    return false;
  }

  VirastarWE = new Virastar({
    fix_english_numbers: false,
    skip_markdown_ordered_lists_numbers_conversion: false,
    preserve_brackets: false,
    preserve_braces: false
  });

  appendButton(elements);
  appendLogo();

  console.log('Persian for GlotPress is running!');
}

function appendLogo () {
  var container = document.getElementsByClassName('gp-content')[0];

  if ( !container ) {
    return;
  }

  var manifest = chrome.runtime.getManifest();

  var html = '<a class="pfgp-trello" target="_blank" title="برد تیم ترجمه وردپرس فارسی" href="https://trello.com/b/2oemHWY2/wp-persian-translation-team"><img src="'+chrome.runtime.getURL('trello.png')+'" /></a>'
    +'<a class="pfgp-logo" target="_blank" title="'+manifest.description+'" href="'+manifest.homepage_url+'"><img src="'+chrome.runtime.getURL('wp-persian.svg')+'" /></a>';

  var wrap = document.createElement('div');
  wrap.innerHTML = html;
  wrap.classList.add('pfgp-wrap-html');

  container.insertBefore(wrap, container.firstChild);
}

function appendButton (elements) {
  Array.prototype.forEach.call(elements, function (el, i) {
    // skip on disabled
    if (el.getAttribute('disabled') === 'disabled') {
      return;
    }

    var wrap = document.createElement('span');
    wrap.innerHTML = el.outerHTML + '<a class="do-virastar-we" href="#" title="ویراستار!" tabindex="-1"><svg class="-virastar-we-icon"><use xlink:href="#icon-virastar"></use></svg></a>';
    wrap.classList.add('virastar-wrap-html');

    el.parentNode.insertBefore(wrap, el);
    el.remove();
  });

  var buttons = document.getElementsByClassName('do-virastar-we');

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', doButton, false);
  }

  var svg = document.createElement('div');
  svg.innerHTML = '<svg style="position: absolute; width: 0; height: 0; overflow: hidden" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><symbol id="icon-virastar" viewBox="0 0 32 32"><path class="path1" d="M31.818 9.122l-8.939-8.939c-0.292-0.292-0.676-0.226-0.855 0.146l-1.199 2.497 8.35 8.35 2.497-1.199c0.372-0.178 0.438-0.563 0.146-0.855z"></path><path class="path2" d="M19.231 4.231l-8.231 0.686c-0.547 0.068-1.002 0.184-1.159 0.899-0 0.001-0 0.001-0.001 0.002-2.232 10.721-9.84 21.183-9.84 21.183l1.793 1.793 8.5-8.5c-0.187-0.392-0.293-0.83-0.293-1.293 0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3c-0.463 0-0.902-0.105-1.293-0.293l-8.5 8.5 1.793 1.793c0 0 10.462-7.608 21.183-9.84 0.001-0 0.001-0 0.002-0.001 0.714-0.157 0.831-0.612 0.898-1.159l0.686-8.231-8.538-8.539z"></path></symbol></defs></svg>';

  document.getElementsByTagName('body')[0].appendChild(svg);
}

function doButton (event) {
  event.preventDefault();

  var element = this.parentNode.getElementsByTagName('textarea')[0];
  var cleaned = VirastarWE.cleanup(element.value);

  // enables undo history
  // https://stackoverflow.com/a/27028331/
  element.selectionStart = 0;
  element.selectionEnd = element.value.length;
  element.focus();
  document.execCommand("insertText", false, cleaned.trim());
}

init();
