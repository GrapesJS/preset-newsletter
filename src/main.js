grapesjs.plugins.add('gjs-preset-newsletter', (editor, opts) => {
  let c = opts || {};
  var blkStyle = '.blk-row::after{ content: ""; clear: both; display: block;} .blk-row{padding: 10px;}';
  var tableStyle = {
    'min-height': '150px',
    padding: '10px',
    width: '100%',
    height: '0'
  };
  var tableStyleStr = 'min-height:150px; height:0; width:100%';
  var cellCls = 'cell';

  // Add blocks
  var bm = editor.BlockManager;
  bm.getAll().reset();
  bm.add('sect100', {
    label: '1 Section',
    attributes: { class:'gjs-fonts gjs-f-b1'},
    content: {
      type: 'table',
      columns: 1,
      rows: 1,
      style: tableStyle
    },
  });
  bm.add('sect50', {
    label: '1/2 Section',
    attributes: {class:'gjs-fonts gjs-f-b2'},
    content: `<table style="${tableStyleStr}">
      <tr>
        <td class="${cellCls} cell2"></td>
        <td class="${cellCls} cell2"></td>
      </tr>
      </table>
      <style>
      .cell2 {
        width: 50%
      }
      </style>`,
  });
  bm.add('sect30', {
    label: '1/3 Section',
    attributes: {class:'gjs-fonts gjs-f-b3'},
    content: `<table style="${tableStyleStr}">
      <tr>
        <td class="${cellCls} cell3"></td>
        <td class="${cellCls} cell3"></td>
        <td class="${cellCls} cell3"></td>
      </tr>
      </table>
      <style>
      .cell3 {
        width: 33.3333%
      }
      </style>`,
  });
  bm.add('sect37', {
    label: '3/7 Section',
    attributes: {class:'gjs-fonts gjs-f-b37'},
    content: `<table style="${tableStyleStr}">
      <tr>
        <td class="${cellCls}" style="width:30%"></td>
        <td class="${cellCls}" style="width:70%"></td>
      </tr>
      </table>`,
  });
  bm.add('text', {
    label: 'Text',
    attributes: { class:'gjs-fonts gjs-f-text'},
    content: {
    	type:'text',
    	content:'Insert your text here',
    	style: { padding: '10px'},
    	activeOnRender: 1
    },
  });
  bm.add('text-sect', {
    label: 'Text section',
    content: '<h1 class="heading">Insert title here</h1><p class="paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>',
    attributes: {class:'gjs-fonts gjs-f-h1p'}
  });
  bm.add('image', {
    label: 'Image',
    attributes: {class:'gjs-fonts gjs-f-image'},
    content: {
      type:'image',
      activeOnRender: 1
    },
  });
  bm.add('quote', {
    label: 'Quote',
    content: '<blockquote class="quote">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ipsum dolor sit</blockquote>',
    attributes: {class:'gjs-fonts gjs-f-quo'}
  });

  //TODO Add commands ('open-import-template')

});
