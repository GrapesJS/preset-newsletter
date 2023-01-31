import type grapesjs from 'grapesjs';
import { PluginOptions } from './blocks'; // TODO MOVE

export default (editor: grapesjs.Editor, opts: Required<PluginOptions>) => {
  const cmdm = editor.Commands;

  cmdm.add(opts.cmdOpenImport, {
    createCodeViewer(): any {
      // @ts-ignore
      return editor.CodeManager.createViewer({
        codeName: 'htmlmixed',
        theme: opts.codeViewerTheme,
        readOnly: false,
      });
    },

    createCodeEditor(label: string) {
      const el = document.createElement('div');
      const elLabel = document.createElement('div');
      const codeEditor = this.createCodeViewer();

      elLabel.innerHTML = label;
      el.style.flex = '1 0 auto';
      el.style.padding = '5px';
      el.style.maxWidth = '50%';
      el.style.boxSizing = 'border-box';
      el.appendChild(elLabel);
      el.appendChild(codeEditor.getElement());

      return { codeEditor, el };
    },

    getCodeContainer(): HTMLDivElement {
      let containerEl = this.containerEl as HTMLDivElement;

      if (!containerEl) {
        containerEl = document.createElement('div');
        containerEl.style.display = 'flex';
        containerEl.style.justifyContent = 'space-between';
        this.containerEl = containerEl;
      }

      return containerEl;
    },

    run(editor) {
      const container = this.getCodeContainer();
      let { codeEditorHtml } = this as any;

      // Init code viewer if not yet instantiated
      if (!codeEditorHtml) {
        const codeViewer = this.createCodeEditor('HTML');
        const btnImp = document.createElement("button");
        const pfx = editor.getConfig().stylePrefix;
        codeEditorHtml = codeViewer.codeEditor;
        this.codeEditorHtml = codeEditorHtml;

        if(opts.modalLabelImport){
          let labelEl = document.createElement('div');
          labelEl.className = `${editor.getConfig().stylePrefix}import-label`;
          labelEl.innerHTML = opts.modalLabelImport;
          container.appendChild(labelEl);
        }

        // Init import button
        btnImp.innerHTML = opts.modalBtnImport;
        btnImp.className = `${pfx}btn-prim ${pfx}btn-import`;
        btnImp.onclick = () => {
          const code = codeViewer.codeEditor.getValue();
          editor.Components.clear();
          editor.Css.clear();
          editor.setComponents(code);
          editor.Modal.close();
        };

        container.appendChild(codeViewer.el);
        container.appendChild(btnImp);
      }

      editor.Modal.open({
        title: opts.modalTitleImport,
        content: container,
      });

      if (codeEditorHtml) {
        codeEditorHtml.setContent(opts.importPlaceholder || '');
        codeEditorHtml.editor.refresh();
      }
    },
  });
};