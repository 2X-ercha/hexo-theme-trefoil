(() => {
  class Welcome {
    static init() {
      console.info(`%c
  ████████╗██████╗ ███████╗███████╗ ██████╗ ██╗██╗
  ╚══██╔══╝██╔══██╗██╔════╝██╔════╝██╔═══██╗██║██║
     ██║   ██████╔╝█████╗  █████╗  ██║   ██║██║██║
     ██║   ██╔══██╗██╔══╝  ██╔══╝  ██║   ██║██║██║
     ██║   ██║  ██║███████╗██║     ╚██████╔╝██║███████╗
     ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝      ╚═════╝ ╚═╝╚══════╝
                  Welcome to trefoil!
`, "color:#1fc7b6")
    }
  }

  class Trefoil {
    static init() {
      function toastify(level, message, options) {
        Toastify({
          gravity: "bottom",
          ...options,
          text: message,
          className: `toastify-${level}`
        }).showToast()
      }

      Object.defineProperty(window, 'trefoil', {
        value: {
          // TODO: notification test
          notification: {
            info(message, options = {}) {
              toastify('info', message, options)
            },
            success(message, options = {}) {
              toastify('success', message, options)
            },
            error(message, options = {}) {
              toastify('error', message, options)
            },
            warn(message, options = {}) {
              toastify('warn', message, options)
            },
          }
        },
        configurable: false
      })
    }
  }

  class CodeUtils {
    static initCopy() {
      function onSuccess(deprecatedApi = false) {
        if (deprecatedApi) {
          trefoil.notification.warn('由于浏览器版本/网页http问题，无法确定是否复制成功', {duration: 3000})
        } else {
          trefoil.notification.success('复制成功', {duration: 1000})
        }
      }

      function onFailed() {
        trefoil.notification.error('复制失败', {duration: 1000})
      }

      function CopyText(content) {
        const clipboard = navigator.clipboard

          if (clipboard) {
            clipboard.writeText(content).then(() => {
              onSuccess()
            }).catch(err => {
              console.error(err)
              onFailed()
            })
          } else {
            try {
              const tmp = document.createElement('textarea');
              document.body.appendChild(tmp);
              tmp.value = content;
              tmp.select();
              document.execCommand('copy');
              document.body.removeChild(tmp)
              onSuccess(true)
            } catch (err) {
              console.error(err)
              onFailed()
            }
          }
      }

      document.querySelectorAll('figure.highlight').forEach(box => {
        box.addEventListener('click', (ev) => {
          if (ev.target !== box.querySelector('figcaption > i')) {
            return
          }
          CopyText(box.querySelector('.code').innerText)
        })
      })

      document.querySelectorAll('.tag-copy').forEach(box => {
        box.addEventListener('click', (ev) => {
          if (ev.target !== box.querySelector('.tag-copy button.copy-btn')) {
            return
          }
          CopyText(box.querySelector('input.copy-area').value)
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
      window.addEventListener('load', () => {
        document.querySelectorAll('figure.highlight').forEach(box => {
          const code_expand_btn = box.querySelector('.code-expand-btn')
          const figure_table = box.querySelector('table')
          figure_table.style.setProperty('--code-height', figure_table.scrollHeight + 'px')
          if ((figure_table.scrollHeight === figure_table.clientHeight) &&
            (figure_table.scrollHeight <= GLOBAL_CONFIG.code.height_limit)) {
            code_expand_btn.style.display = 'none'
          }
        })
      })
    }

    static init() {
      this.initCopy()
      this.initExpand()
      this.initExpandHidden()
    }
  }

  class LayoutGlobalChange {
    static BigImageMatch() {
      document.querySelectorAll('article p span:has(img)').forEach(box => {
        const image = box.querySelector('img')
        if (image.clientHeight > 240 && image.clientWidth > 240) {
            box.classList.add('bigimg')
        } else {
          box.classList.remove('bigimg')
        }
      })
    }

    static init() {
      let timer = 0
      const objserver = new ResizeObserver((entries) => {
        timer && clearTimeout(timer)
        timer = setTimeout(() => {
          entries.forEach(() => {
            this.BigImageMatch()
          })
        }, 100)
      })
      objserver.observe(document.querySelector('#post'))
    }
  }

  class ImageLazyLoad {
    static init() {
      function onError() {
        this.removeEventListener('error', onError)
        this.srcset = GLOBAL_CONFIG.lazyload.onerror
      }

      const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const image = entry.target;
            image.srcset = image.getAttribute('data-srcset');
            image.addEventListener('error', onError)
            image.classList.add('loaded')
            observer.unobserve(image)
          }
        });
      });

      document.querySelectorAll('img.lazy-load').forEach((it) => {
        observer.observe(it)
      })
    }
  }

  Welcome.init()
  Trefoil.init()
  CodeUtils.init()
  LayoutGlobalChange.init()
  ImageLazyLoad.init()
})()