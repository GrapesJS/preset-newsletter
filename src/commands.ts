import type grapesjs from 'grapesjs';
import openImportCommand from './openImportCommand';
import openExportCommand from './openExportCommand';
import tglImagesCommand from './toggleImagesCommand';
import { PluginOptions } from '.';
import { cmdDeviceDesktop, cmdDeviceMobile, cmdDeviceTablet } from './consts';

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

    cmdm.add(cmdDeviceDesktop, {
      run: (ed) => ed.setDevice('Desktop'),
      stop: () => {},
    });

    cmdm.add(cmdDeviceTablet, {
      run: (ed) => ed.setDevice('Tablet'),
      stop: () => {},
    });

    cmdm.add(cmdDeviceMobile, {
      run: (ed) => ed.setDevice('Mobile portrait'),
      stop: () => {},
    });
};