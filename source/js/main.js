class CodeUtils {
  static initCopy() {
    document.querySelectorAll('figure.highlight').forEach(box => {
      box.addEventListener('click', (ev) => {
        if (ev.target !== box.querySelector('figcaption > span')) {
          return
        }

        const code = box.querySelector('.code').innerText
        const clipboard = navigator.clipboard

        if (clipboard) {
          clipboard.writeText(code).catch(err => console.log(err))
        } else {
          const tmp = document.createElement('textarea');
          document.body.appendChild(tmp);
          tmp.value = code;
          tmp.select();
          document.execCommand('copy');
          document.body.removeChild(tmp)
        }
      })
    })
  }
  static init() {
    this.initCopy()
  }
}

CodeUtils.init()
