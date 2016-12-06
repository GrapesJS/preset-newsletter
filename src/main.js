grapesjs.plugins.add('gjs-preset-newsletter', (editor, opts) => {
  let c = opts || {};
  let config = editor.getConfig();
  let pfx = config.stylePrefix;

  let defaults = {
    editor,
    pfx: pfx || '',
    cmdOpenImport: 'gjs-open-import-template',
    cmdTglImages: 'gjs-toggle-images',
    modalTitleImport: 'Import template',
    modalTitleExport: 'Export template',
    modalLabelImport: '',
    modalLabelExport: '',
    modalBtnImport: 'Import',
    codeViewerTheme: 'hopscotch',
    importPlaceholder: '',
    defaultTemplate: '', // Default template in case the canvas is empty
    tableCellCls: 'cell',
    inlineCss: 1,
    tableStyle: {
      height: '150px',
      margin: '0 auto 10px auto',
      padding: '5px 5px 5px 5px',
      width: '100%'
    }
  };

  // Change some config
  config.devicePreviewMode = 1;

  // Load defaults
  for (let name in defaults) {
    if (!(name in c))
      c[name] = defaults[name];
  }

  // Add commands
  let importCommands = require('./commands');
  importCommands(c);

  // Add blocks
  let importBlocks = require('./blocks');
  importBlocks(c);

  // Add buttons
  let importButtons = require('./buttons');
  importButtons(c);

  // Load style manager
  let importStyle = require('./style');
  importStyle(c);

  // Set default template if the canvas is empty
  if(!editor.getHtml() && c.defaultTemplate){
    editor.setComponents(c.defaultTemplate);

    // Init components for Undo Manager
    editor.editor.initChildrenComp(editor.DomComponents.getWrapper());
  }

  // On component change show the Style Manager
  editor.on('change:selectedComponent', function() {
    var openLayersBtn = editor.Panels.getButton('views', 'open-layers');

    // Don't switch when the Layer Manager is on or
    // there is no selected component
    if((!openLayersBtn || !openLayersBtn.get('active')) &&
      editor.editor.get('selectedComponent')){
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
