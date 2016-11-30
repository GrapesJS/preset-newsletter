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
  let cmdTglImages = 'gjs-toggle-images';
  let modalTitle = 'Import newsletter template';
  let modalLabel = 'Paste all your code here below and click import';
  let btnLabel = 'Import';
  let cellCls = 'cell';

  // Custom
  let theme = 'material';
  let defaultTmpl = `<table>
  <tr>
    <td>Sample template</td>
    <td>Hello</td>
    <td><img alt="Test" src="http://placehold.it/350x250/459ba8/fff/image2.jpg"/></td>
  </tr>
</table>`;

  // Add commands
  let importCommands = require('./commands');
  importCommands({
    cmdOpenImport,
    cmdTglImages,
    defaultTmpl,
    modalTitle,
    modalLabel,
    btnLabel,
    editor,
    theme,
    pfx
  });

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
  pnm.addButton('options', {
    id: cmdTglImages,
    className: 'fa fa-warning',
    command: cmdTglImages,
    attributes: { title: 'Toggle images' },
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

  // Set default template if the canvas is empty
  if(!editor.getHtml() && defaultTmpl){
    editor.setComponents(defaultTmpl);
  }


  // Do stuff on load
  editor.on('load', function() {
    // Open block manager
    var openBlocksBtn = pnm.getButton('views', 'open-blocks');
    openBlocksBtn && openBlocksBtn.set('active', 1);
  });

});
