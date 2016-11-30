define(function() {

  return (opt = {}) => {
    let editor = opt.editor;
    let codeViewer = editor && editor.CodeManager.getViewer('CodeMirror').clone();
    let btnImp = document.createElement("button");
    let container = document.createElement("div");
    let pfx = opt.pfx || '';

    // Init export button
    btnImp.innerHTML = opt.btnLabel;
    btnImp.className = pfx + 'btn-prim';
    btnImp.onclick = () => {
      let code = codeViewer.editor.getValue();
      editor.DomComponents.getWrapper().set('content', '');
      editor.setComponents(code);
      editor.Modal.close();
    };

    // Init code viewer
    codeViewer.set({
      codeName: 'htmlmixed',
      theme: opt.theme || 'hopscotch',
      readOnly: 0
    });

    return {
      run(editor, sender) {
        let md = editor.Modal;
        let modalContent = md.getContentEl();
        let viewer = codeViewer.editor;
        md.setTitle(opt.modalTitle);

        // Init code viewer if not yet instantiated
        if(!viewer){
          let txtarea = document.createElement('textarea');
          if(opt.modalLabel){
            let labelEl = document.createElement('div');
            labelEl.className = pfx + 'import-label';
            labelEl.innerHTML = opt.modalLabel;
            container.appendChild(labelEl);
          }
          container.appendChild(txtarea);
          container.appendChild(btnImp);
          codeViewer.init(txtarea);
          viewer = codeViewer.editor;
        }

        md.setContent(container);
        codeViewer.setContent(opt.defaultTmpl || '');
        md.open();
        viewer.refresh();
        sender && sender.set('active', 0);
      },
    }

  };
});
