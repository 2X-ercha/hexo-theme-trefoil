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

  static initExpand() {
    document.querySelectorAll('.code-expand-btn').forEach(box => {
      box.addEventListener('click', (ev) => {
        const element = ev.target;
        if (element.classList.contains('expand-done')) {
          element.classList.remove('expand-done')
        } else {
          element.classList.add('expand-done')
        }
      })
    })
  }

  static init() {
    this.initCopy()
    this.initExpand()
  }
}

CodeUtils.init()
