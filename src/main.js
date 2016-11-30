grapesjs.plugins.add('gjs-preset-newsletter', (editor, opts) => {
  let c = opts || {};
  let config = editor.getConfig();
  let pfx = config.stylePrefix;
  let blkStyle = '.blk-row::after{ content: ""; clear: both; display: block;} .blk-row{padding: 10px;}';
  let tableStyle = {
    'min-height': '150px',
    padding: '10px',
    width: '100%',
    height: '0'
  };
  let tableStyleStr = 'min-height:150px; height:0; width:100%';
  let cmdOpenImport = 'gjs-open-import-template';
  let modalTitle = 'Import newsletter template';
  let modalLabel = 'Paste all your code here';
  let btnLabel = 'Import';
  let cellCls = 'cell';

  // Custom
  let theme = 'material';
  let defaultTmpl = `<table>
  <tr>
    <td>Sample template</td>
    <td>Hello</td>
  </tr>
</table>`;

  // Add commands
  let cmdm = editor.Commands;
  let cm = editor.CodeManager;
  let importCommand = require('./openImportCommand');
  cmdm.add(cmdOpenImport, importCommand({
    defaultTmpl,
    modalTitle,
    modalLabel,
    btnLabel,
    editor,
    theme,
    pfx
  }));

  // Add blocks
  let importBlocks = require('./blocks');
  importBlocks({
    tableStyleStr,
    tableStyle,
    cellCls,
    editor
  });

  // Add buttons
  let pnm = editor.Panels;
  pnm.addButton('options', {
    id: cmdOpenImport,
    className: 'fa fa-download',
    command: cmdOpenImport,
    attributes: { title: modalTitle },
  });
  // Clean commands panel
  let cmdPanel = pnm.getPanel('commands');
  if(cmdPanel){
    var cmdBtns = cmdPanel.get('buttons');
    cmdBtns.reset();
    cmdBtns.add({
			id: 'move-comp',
			command: 'move-comp',
			className: 'fa fa-arrows',
			attributes: { title: 'Move elements' },
			stopDefaultCommand: 1,
		});
  }


  // Add blocks


  // Do stuff on load
  editor.on('load', function() {
    // Open block manager
    var openBlocksBtn = pnm.getButton('views', 'open-blocks');
    openBlocksBtn && openBlocksBtn.set('active', 1);
  });

});
