define(function() {

  return (opt = {}) => {
    let tableStyleStr = '';
    let tableStyleNoW = '';
    let editor = opt.editor;
    let tableStyle = opt.tableStyle || {};
    let cellCls = opt.tableCellCls || '';
    let bm = editor.BlockManager;

    for (let prop in tableStyle){
      tableStyleStr += `${prop}: ${tableStyle[prop]}; `;

      if(prop != 'width')
        tableStyleNoW += `${prop}: ${tableStyle[prop]}; `;
    }

    bm.getAll().reset();
    let tablefull = `table100`;
    bm.add('sect100', {
      label: '1 Section',
      attributes: { class:'gjs-fonts gjs-f-b1'},
      content: `<table style="${tableStyleStr}">
        <tr>
          <td class="${cellCls}"></td>
        </tr>
        </table>
        <style>
        </style>`,
    });
    bm.add('sect50', {
      label: '1/2 Section',
      attributes: {class:'gjs-fonts gjs-f-b2'},
      content: `<table style="${tableStyleStr}">
        <tr>
          <td class="${cellCls} ${cellCls}2"></td>
          <td class="${cellCls} ${cellCls}2"></td>
        </tr>
        </table>
        <style>
        .${cellCls}2 {
          width: 50%
        }
        </style>`,
    });
    bm.add('sect30', {
      label: '1/3 Section',
      attributes: {class:'gjs-fonts gjs-f-b3'},
      content: `<table style="${tableStyleStr}">
        <tr>
          <td class="${cellCls} ${cellCls}3"></td>
          <td class="${cellCls} ${cellCls}3"></td>
          <td class="${cellCls} ${cellCls}3"></td>
        </tr>
        </table>
        <style>
        .${cellCls}3 {
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
    bm.add('button', {
      label: 'Button',
      content: '<a class="button">Button</a>',
      attributes: {class:'gjs-fonts gjs-f-button'}
    });
    bm.add('divider', {
      label: 'Divider',
      content: `<table style="width: 100%; margin-top: 10px; margin-bottom: 10px;">
        <tr>
          <td class="divider"></td>
        </tr>
      <table>
      <style>
      .divider {
        background-color: rgba(0, 0, 0, 0.1);
        height: 1px;
      }
      </style>`,
      attributes: {class:'gjs-fonts gjs-f-divider'}
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
        style: {color: 'black'},
        activeOnRender: 1
      },
    });

    bm.add('quote', {
      label: 'Quote',
      content: '<blockquote class="quote">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ipsum dolor sit</blockquote>',
      attributes: {class:'fa fa-quote-right'}
    });

    let gridItem = `<table class="grid-item-card">
      <tr>
        <td class="grid-item-card-cell">
          <img class="grid-item-image" src="http://placehold.it/250x150/78c5d6/fff/" alt="Image"/>

          <table class="grid-item-card-body">
            <tr>
              <td class="grid-item-card-content">
                <h1 class="card-title">Title here
                </h1>
                <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                </p>
              </td>
            </tr>
          </table>

        </td>
      </tr>
    </table>`;
    bm.add('grid-items', {
      label: 'Grid items',
      content: `<table class="grid-item-row">
        <tr>
          <td class="grid-item-cell2-l">${gridItem}</td>
          <td class="grid-item-cell2-r">${gridItem}</td>
        </tr>
      </table>`,
      attributes: {class:'fa fa-th'}
    });

    let listItem = `<table class="list-item">
      <tr>
        <td class="list-item-cell">
          <table class="list-item-content">
            <tr class="list-item-row">
              <td class="list-cell-left">
                <img class="list-item-image" src="http://placehold.it/150x150/78c5d6/fff/" alt="Image"/>
              </td>
              <td class="list-cell-right">
                <h1 class="card-title">Title here
                </h1>
                <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>`;
    bm.add('list-items', {
      label: 'List items',
      content: listItem + listItem,
      attributes: {class:'fa fa-th-list'}
    });
  };
})
