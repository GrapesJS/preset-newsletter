define(function() {

  return (opt = {}) => {
    let editor = opt.editor;
    let cmdm = editor.Commands;
    let importCommand = require('./openImportCommand');
    let tglImagesCommand = require('./toggleImagesCommand');

    cmdm.add(opt.cmdOpenImport, importCommand(opt));
    cmdm.add(opt.cmdTglImages, tglImagesCommand(opt));
  };
})
