define(function() {

  return (opt = {}) => {
    let editor = opt.editor;

    let pnm = editor.Panels;

    pnm.addButton('options', {
      id: opt.cmdOpenImport,
      className: 'fa fa-download',
      command: opt.cmdOpenImport,
      attributes: { title: opt.modalTitle },
    });

    pnm.addButton('options', {
      id: opt.cmdTglImages,
      className: 'fa fa-warning',
      command: opt.cmdTglImages,
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
  };
})
