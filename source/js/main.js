class CodeUtils {
  static initCopy() {
    const options = {
      duration: 1000,
      gravity: "bottom"
    }

    function onSuccess(deprecatedApi = false) {

      Toastify({
        ...options,
        text: "复制成功",
        className: 'toastify-success'
      }).showToast();
      // TODO: notification test
      /*
      Toastify({
        ...options,
        text: "复制失败",
        className: 'toastify-error'
      }).showToast();
      Toastify({
        ...options,
        text: "提示信息",
        className: 'toastify-info'
      }).showToast();
      Toastify({
        ...options,
        text: "警告信息",
        className: 'toastify-warn'
      }).showToast();
      */
      if (deprecatedApi) {
        // TODO: 不要每次复制都弹（？
        Toastify({ ...options, text: "TODO: message" }).showToast()
      }
    }

    function onFailed() {
      Toastify({
        ...options,
        text: "复制失败",
        className: 'toastify-error'
      }).showToast();
    }

    document.querySelectorAll('figure.highlight').forEach(box => {
      box.addEventListener('click', (ev) => {
        if (ev.target !== box.querySelector('figcaption > i')) {
          return
        }

        const code = box.querySelector('.code').innerText
        const clipboard = navigator.clipboard

        if (clipboard) {
          clipboard.writeText(code).then(() => {
            onSuccess()
          }).catch(err => {
            console.error(err)
            onFailed()
          })
        } else {
          try {
            const tmp = document.createElement('textarea');
            document.body.appendChild(tmp);
            tmp.value = code;
            tmp.select();
            document.execCommand('copy');
            document.body.removeChild(tmp)
            onSuccess(true)
          } catch (err) {
            console.error(err)
            onFailed()
          }
        }
      })
    })
  }

  static initExpand() {
    document.querySelectorAll('.code-expand-btn i').forEach(box => {
      box.addEventListener('click', (ev) => {
        const code_expand_btn_icon = ev.target
        const code_expand_btn = code_expand_btn_icon.parentNode;
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
      figure_table.style.setProperty('--code-height', figure_table.scrollHeight + 'px')
      if ((figure_table.scrollHeight === figure_table.clientHeight) &&
          (figure_table.scrollHeight <= GLOBAL_CONFIG.code.height_limit)) {
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
