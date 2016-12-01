define(function() {

  return (opt = {}) => {
    let editor = opt.editor;
    let codeViewer = editor && editor.CodeManager.getViewer('CodeMirror').clone();
    let container = document.createElement("div");
    let pfx = opt.pfx || '';

    // Init code viewer
    codeViewer.set({
      codeName: 'htmlmixed',
      theme: opt.theme || 'hopscotch'
    });

    return {
      run(editor, sender) {
        let md = editor.Modal;
        let modalContent = md.getContentEl();
        let viewer = codeViewer.editor;
        md.setTitle(opt.modalExportTitle);

        // Init code viewer if not yet instantiated
        if(!viewer){
          let txtarea = document.createElement('textarea');
          if(opt.modalExportLabel){
            let labelEl = document.createElement('div');
            labelEl.className = pfx + 'import-label';
            labelEl.innerHTML = opt.modalExportLabel;
            container.appendChild(labelEl);
          }
          container.appendChild(txtarea);
          codeViewer.init(txtarea);
          viewer = codeViewer.editor;
          viewer.setOption('lineWrapping', 1);
        }

        md.setContent('');
        md.setContent(container);
        codeViewer.setContent(editor.getHtml());
        md.open();
        viewer.refresh();
        sender && sender.set('active', 0);
      },
    }

  };
});
