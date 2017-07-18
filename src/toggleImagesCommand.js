define(function() {
  return (opt = {}) => {
    let toggleImages = (components, on) => {
      const srcPlh = '##';
      components.each((comp) => {
        if(comp.get('type') == 'image'){
          let src = comp.get('src');
          if(on){
            if(src == srcPlh){
              comp.set('src', comp.get('src_bkp'));
            }
          }else{
            if(src != srcPlh){
              comp.set('src_bkp', comp.get('src'));
              comp.set('src', srcPlh);
            }
          }
        }
        toggleImages(comp.get('components'), on);
      });
    };
    return {
      run(editor) {
        var components = editor.getComponents();
        toggleImages(components);
      },
      stop(editor) {
        var components = editor.getComponents();
        toggleImages(components, 1);
      }
    }
  };
});