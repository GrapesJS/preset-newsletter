import type grapesjs from 'grapesjs';
import openImportCommand from './openImportCommand';
import openExportCommand from './openExportCommand';
import tglImagesCommand from './toggleImagesCommand';
import { PluginOptions } from './blocks'; // TODO MOVE

export default (editor: grapesjs.Editor, opts: Required<PluginOptions>) => {
    const cmdm = editor.Commands;

    openImportCommand(editor, opts);
    openExportCommand(editor, opts);
    tglImagesCommand(editor, opts);

    // Overwrite export template after the editor is loaded
    // (default commands are loaded after plugins)
    // editor.on('load', () => {
    //   cmdm.add('export-template', exportCommand(opt));
    // });

    cmdm.add('undo', {
      run(editor, sender) {
        sender.set('active', 0);
        editor.UndoManager.undo();
      }
    });

    cmdm.add('redo', {
      run(editor, sender) {
        sender.set('active', 0);
        editor.UndoManager.redo();
      }
    });

    cmdm.add('set-device-desktop', {
      run(editor) {
        editor.setDevice('Desktop');
      }
    });

    cmdm.add('set-device-tablet', {
      run(editor) {
        editor.setDevice('Tablet');
      }
    });

    cmdm.add('set-device-mobile', {
      run(editor) {
        editor.setDevice('Mobile portrait');
      }
    });
};