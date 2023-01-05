class CodeUtils {
  static initCopy() {
    document.querySelectorAll('figure.highlight').forEach(box => {
      box.addEventListener('click', (ev) => {
        if (ev.target !== box.querySelector('figcaption > i')) {
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
    document.querySelectorAll('.code-expand-btn i').forEach(box => {
      box.addEventListener('click', (ev) => {
        const code_expand_btn_icon = ev.target
        const code_expand_btn = ev.target.parentNode;
        if (code_expand_btn.classList.contains('expand-done')) {
          code_expand_btn.classList.remove('expand-done')
          code_expand_btn_icon.classList.remove('ri-arrow-up-s-fill')
          code_expand_btn_icon.classList.add('ri-arrow-down-s-fill')
        } else {
          code_expand_btn.classList.add('expand-done')
          code_expand_btn_icon.classList.remove('ri-arrow-down-s-fill')
          code_expand_btn_icon.classList.add('ri-arrow-up-s-fill')
        }
      })
    })
  }

  static initExpandHidden() {
    document.querySelectorAll('figure.highlight').forEach(box => {
      const code_expand_btn = box.querySelector('.code-expand-btn')
      const figure_table = box.querySelector('table')
      if ((figure_table.scrollHeight === figure_table.clientHeight) && figure_table.scrollHeight <= GLOBAL_CONFIG.code.height_limit) {
        code_expand_btn.style.display = 'none'
      }
    })
  }

  static init() {
    this.initCopy()
    this.initExpand()
    this.initExpandHidden()
  }
}

CodeUtils.init()
