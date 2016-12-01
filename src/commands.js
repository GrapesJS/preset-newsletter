define(function() {

  return (opt = {}) => {
    let editor = opt.editor;
    let cmdm = editor.Commands;
    let importCommand = require('./openImportCommand');
    let tglImagesCommand = require('./toggleImagesCommand');

    cmdm.add(opt.cmdOpenImport, importCommand(opt));
    cmdm.add(opt.cmdTglImages, tglImagesCommand(opt));

    cmdm.add('undo', {
      run: 	function(editor, sender){
        sender.set('active', 0);
        editor.UndoManager.undo(1);
      }
    });

    cmdm.add('redo', {
      run: 	function(editor, sender){
        sender.set('active', 0);
        editor.UndoManager.redo(1);
      }
    });
  };
})
