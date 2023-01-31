import type grapesjs from 'grapesjs';
import { PluginOptions } from '.';

export default (editor: grapesjs.Editor, opts: Required<PluginOptions>) => {
  const pnm = editor.Panels;
  const { cmdOpenImport, cmdTglImages } = opts;

  pnm.addButton('options', {
    id: cmdOpenImport,
    className: 'fa fa-download', // TODO remove
    command: cmdOpenImport,
  });

  pnm.addButton('options', {
    id: cmdTglImages,
    className: 'fa fa-warning',
    command: cmdTglImages,
  });

  // Clean commands panel
  const cmdPanel = pnm.getPanel('commands');

  if (cmdPanel) {
    const cmdBtns = cmdPanel.get('buttons') as any;
    cmdBtns.reset();
    cmdBtns.add([{
      id: 'undo',
      className: 'fa fa-undo',
      command: 'undo',
    }, {
      id: 'redo',
      className: 'fa fa-repeat',
      command: 'redo',
    }]);
  }

  // Turn off default devices select and create new one
  editor.getConfig().showDevices = false;

  const devicePanel = pnm.addPanel({ id: 'devices-c' });
  (devicePanel.get('buttons') as any).add([{
    id: 'deviceDesktop',
    command: 'set-device-desktop',
    className: 'fa fa-desktop',
    active: 1,
  }, {
    id: 'deviceTablet',
    command: 'set-device-tablet',
    className: 'fa fa-tablet',
  }, {
    id: 'deviceMobile',
    command: 'set-device-mobile',
    className: 'fa fa-mobile',
  }])
};