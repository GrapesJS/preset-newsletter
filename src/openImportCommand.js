define(function() {

  return (opt = {}) => {
    let editor = opt.editor;
    let codeViewer = editor && editor.CodeManager.getViewer('CodeMirror').clone();
    let btnImp = document.createElement("button");
    let container = document.createElement("div");

    // Init export button
    btnImp.innerHTML = opt.btnLabel;
    btnImp.className = (opt.pfx || '') + 'btn-prim';
    btnImp.onclick = () => {
      let code = codeViewer.editor.getValue();
      editor.DomComponents.getWrapper().set('content', '');
      editor.setComponents(code);
      editor.Modal.close();
    };

    // Init code viewer
    codeViewer.set({
      codeName: 'htmlmixed',
      theme: 'hopscotch',
      readOnly: 0
    });

    return {
      run(editor, sender) {
        let md = editor.Modal;
        let modalContent = md.getContentEl();
        md.setTitle(opt.modalTitle);

        // Init code viewer if not yet instantiated
        if(!codeViewer.editor){
          let txtarea = document.createElement('textarea');
          container.appendChild(txtarea);
          container.appendChild(btnImp);
          codeViewer.init(txtarea);
        }

        md.setContent(container);
        codeViewer.setContent(opt.modalLabel || '');
        md.open();
        codeViewer.editor.refresh();
        sender && sender.set('active', 0);
      },
    }

  };
});
