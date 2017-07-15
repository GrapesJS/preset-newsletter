define(function() {
  const juice = require('juice');
  return (opt = {}) => {
    let editor = opt.editor;
    let codeViewer = editor && editor.CodeManager.getViewer('CodeMirror').clone();
    let container = document.createElement("div");
    let pfx = opt.pfx || '';
    var cmdm = editor.Commands;
    // Init code viewer
    codeViewer.set({
      codeName: 'htmlmixed',
      theme: opt.codeViewerTheme,
    });
    // Set the command which could be used outside
    cmdm.add(pfx + 'get-inlined-html', {
      run(editor) {
        const tmpl = editor.getHtml() + `<style>${editor.getCss()}</style>`;
        return juice(tmpl);
      }
    })
    return {
      run(editor, sender) {
        let result = '';
        let md = editor.Modal;
        let modalContent = md.getContentEl();
        let viewer = codeViewer.editor;
        md.setTitle(opt.modalTitleExport);
        // Init code viewer if not yet instantiated
        if (!viewer) {
          let txtarea = document.createElement('textarea');
          if (opt.modalLabelExport) {
            let labelEl = document.createElement('div');
            labelEl.className = pfx + 'export-label';
            labelEl.innerHTML = opt.modalLabelExport;
            container.appendChild(labelEl);
          }
          container.appendChild(txtarea);
          codeViewer.init(txtarea);
          viewer = codeViewer.editor;
          viewer.setOption('lineWrapping', 1);
        }
        md.setContent('');
        md.setContent(container);
        const tmpl = editor.getHtml() + `<style>${editor.getCss()}</style>`;
        codeViewer.setContent(opt.inlineCss ? juice(tmpl) : tmpl);
        md.open();
        viewer.refresh();
        sender && sender.set('active', 0);
      },
    }
  };
});
