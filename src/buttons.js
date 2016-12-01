define(function() {

  return (opt = {}) => {
    let editor = opt.editor;

    let pnm = editor.Panels;
    const tltAttr = 'title';
    const tltPosAttr = 'data-tooltip-pos';

    pnm.addButton('options', {
      id: opt.cmdOpenImport,
      className: 'fa fa-download',
      command: opt.cmdOpenImport,
      attributes: {[tltAttr]: opt.modalTitle},
    });

    pnm.addButton('options', {
      id: opt.cmdTglImages,
      className: 'fa fa-warning',
      command: opt.cmdTglImages,
      attributes: {[tltAttr]: 'Toggle images'},
    });

    // Fix tooltip position
    let optPanel = pnm.getPanel('options');
    if(optPanel){
      var cmdBtns = optPanel.get('buttons');
      cmdBtns.each((btn) => {
        var attrs = btn.get('attributes');
        attrs[tltPosAttr] = 'bottom';
        btn.set('attributes', attrs);
      });
    }

    // Clean commands panel
    let cmdPanel = pnm.getPanel('commands');
    if(cmdPanel){
      var cmdBtns = cmdPanel.get('buttons');
      cmdBtns.reset();
      cmdBtns.add({
  			id: 'move-comp',
  			command: 'move-comp',
  			className: 'fa fa-arrows',
  			attributes: {
          [tltAttr]: 'Move components',
          [tltPosAttr]: 'bottom'
        },
  			stopDefaultCommand: 1,
  		});
    }
  };
})
