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
  let modalTitle = 'Import template';
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
  let importButtons = require('./buttons');
  importButtons({
    cmdOpenImport,
    modalTitle,
    cmdTglImages,
    editor
  });

  // Set default template if the canvas is empty
  if(!editor.getHtml() && defaultTmpl){
    editor.setComponents(defaultTmpl);
  }

  // On component change show the Style Manager
  editor.on('change:selectedComponent', function() {
    var openLayersBtn = editor.Panels.getButton('views', 'open-layers');

    // Don't switch when the Layer Manager is on
    if(!openLayersBtn || !openLayersBtn.get('active')){
      var openSmBtn = editor.Panels.getButton('views', 'open-sm');
      openSmBtn && openSmBtn.set('active', 1);
    }
  });

  // Do stuff on load
  editor.on('load', function() {
    // Open block manager
    var openBlocksBtn = editor.Panels.getButton('views', 'open-blocks');
    openBlocksBtn && openBlocksBtn.set('active', 1);

    editor.trigger('change:canvasOffset');
  });

});
