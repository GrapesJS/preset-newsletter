grapesjs.plugins.add('gjs-preset-newsletter', (editor, opts) => {
  let c = opts || {};
  let config = editor.getConfig();
  let pfx = config.stylePrefix;

  let defaults = {
    editor,
    pfx: pfx || '',
    cmdOpenImport: 'gjs-open-import-template',
    cmdTglImages: 'gjs-toggle-images',
    cmtTglImagesLabel: 'Toggle Images',
    cmdBtnMoveLabel: 'Move',
    cmdBtnUndoLabel: 'Undo',
    cmdBtnRedoLabel: 'Redo',
    cmdBtnDesktopLabel: 'Desktop',
    cmdBtnTabletLabel: 'Tablet',
    cmdBtnMobileLabel: 'Mobile',
    modalTitleImport: 'Import template',
    modalTitleExport: 'Export template',
    modalLabelImport: '',
    modalLabelExport: '',
    modalBtnImport: 'Import',
    codeViewerTheme: 'hopscotch',
    openBlocksBtnTitle: c.openBlocksBtnTitle || '',
    openLayersBtnTitle: c.openLayersBtnTitle || '',
    openSmBtnTitle: c.openSmBtnTitle || '',
    openTmBtnTitle: c.openTmBtnTitle || '',
    expTplBtnTitle: c.expTplBtnTitle || 'View Code',
    fullScrBtnTitle: c.fullScrBtnTitle || 'FullScreen',
    swichtVwBtnTitle: c.swichtVwBtnTitle || 'View Components',
    categoryLabel: c.categoryLabel || '',
    importPlaceholder: '',
    defaultTemplate: '', // Default template in case the canvas is empty
    inlineCss: 1,
    cellStyle: {
      padding: 0,
      margin: 0,
      'vertical-align': 'top',
    },
    tableStyle: {
      height: '150px',
      margin: '0 auto 10px auto',
      padding: '5px 5px 5px 5px',
      width: '100%'
    },
    sect100BlkLabel: '1 Section',
    sect50BlkLabel: '1/2 Section',
    sect30BlkLabel: '1/3 Section',
    sect37BlkLabel: '3/7 Section',
    buttonBlkLabel: 'Button',
    dividerBlkLabel: 'Divider',
    textBlkLabel: 'Text',
    textSectionBlkLabel: 'Text Section',
    imageBlkLabel: 'Image',
    quoteBlkLabel: 'Quote',
    linkBlkLabel: 'Link',
    linkBlockBlkLabel: 'Link Block',
    gridItemsBlkLabel: 'Grid Items',
    listItemsBlkLabel: 'List Items',
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
      openSmBtn.set('attributes',{ title:defaults.openSmBtnTitle });
      openSmBtn && openSmBtn.set('active', 1);
    }
  });

  // Do stuff on load
  editor.on('load', function() {
    var expTplBtn = editor.Panels.getButton('options', 'export-template');
    expTplBtn.set('attributes', {
      title: defaults.expTplBtnTitle
    });
    var fullScrBtn = editor.Panels.getButton('options', 'fullscreen');
    fullScrBtn.set('attributes', {
      title: defaults.fullScrBtnTitle
    });
    var swichtVwBtn = editor.Panels.getButton('options', 'sw-visibility');
    swichtVwBtn.set('attributes', {
      title: defaults.swichtVwBtnTitle
    });
    var openSmBtn = editor.Panels.getButton('views', 'open-sm');
    openSmBtn.set('attributes', {
      title: defaults.openSmBtnTitle
    });
    var openTmBtn = editor.Panels.getButton('views', 'open-tm');
    openTmBtn.set('attributes', {
      title: defaults.openTmBtnTitle
    });
    var openLayersBtn = editor.Panels.getButton('views', 'open-layers');
    openLayersBtn.set('attributes', {
      title: defaults.openLayersBtnTitle
    });
    // Open block manager
    var openBlocksBtn = editor.Panels.getButton('views', 'open-blocks');
      openBlocksBtn.set('attributes', {
      title: defaults.openBlocksBtnTitle
    });
    openBlocksBtn && openBlocksBtn.set('active', 1);
    //editor.trigger('change:canvasOffset');
  });
});
