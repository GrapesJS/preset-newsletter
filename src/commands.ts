import type { Editor } from 'grapesjs';
import { PluginOptions } from '.';
import { cmdClear, cmdDeviceDesktop, cmdDeviceMobile, cmdDeviceTablet } from './consts';
import openExportCommand from './openExportCommand';
import openImportCommand from './openImportCommand';
import tglImagesCommand from './toggleImagesCommand';

export default (editor: Editor, opts: Required<PluginOptions>) => {
    const { Commands } = editor;
    const txtConfirm = opts.textCleanCanvas;

    openImportCommand(editor, opts);
    openExportCommand(editor, opts);
    tglImagesCommand(editor, opts);

    Commands.add(cmdDeviceDesktop, {
      run: (ed) => ed.setDevice('Desktop'),
      stop: () => {},
    });

    Commands.add(cmdDeviceTablet, {
      run: (ed) => ed.setDevice('Tablet'),
      stop: () => {},
    });

    Commands.add(cmdDeviceMobile, {
      run: (ed) => ed.setDevice('Mobile portrait'),
      stop: () => {},
    });

    Commands.add(cmdClear, {
      run: (ed) => {
        const cmd = 'core:canvas-clear';
        if (txtConfirm) {
          confirm(txtConfirm) && ed.runCommand(cmd);
        } else {
          ed.runCommand(cmd);
        }
      }
    });
};