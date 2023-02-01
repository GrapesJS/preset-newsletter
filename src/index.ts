import juice from 'juice';
import loadCommands from './commands';
import loadBlocks from './blocks';
import loadPanels from './panels';
import loadStyles from './styles';
import type grapesjs from 'grapesjs';

export interface PluginOptions {
  /**
   * Which blocks to add.
   */
  blocks?: string[];

  /**
   * Add custom block options, based on block id.
   * @default (blockId) => ({})
   * @example (blockId) => blockId === 'quote' ? { attributes: {...} } : {};
   */
  block?: (blockId: string) => ({});

  /**
   * Custom style for table blocks.
   */
  tableStyle?: Record<string, string>;

  /**
   * Custom style for table cell blocks.
   */
  cellStyle?: Record<string, string>;

  /**
   * Import command id.
   * @default 'gjs-open-import-template'
   */
  cmdOpenImport?: string;

  /**
   * Toggle images command id.
   * @default 'gjs-toggle-images'
   */
  cmdTglImages?: string;

  /**
   * Get inlined HTML command id.
   * @default 'gjs-get-inlined-html'
   */
  cmdInlineHtml?: string,

  /**
   * Title for the import modal.
   * @default 'Import template'
   */
  modalTitleImport?: string;

  /**
   * Title for the export modal.
   * @default 'Export template'
   */
  modalTitleExport?: string,

  /**
   * Label for the export modal.
   * @default ''
   */
  modalLabelExport?: string,

  /**
   * Label for the import modal.
   * @default ''
   */
  modalLabelImport?: string,

  /**
   * Label for the import button.
   * @default 'Import'
   */
  modalBtnImport?: string,

  /**
   * Template as a placeholder inside import modal.
   * @default ''
   */
  importPlaceholder?: string;

  /**
   * If `true`, inlines CSS on export.
   * @default true
   */
  inlineCss?: boolean;

  /**
   * Update Style Manager with more reliable style properties to use for newsletters.
   * @default true
   */
  updateStyleManager?: boolean;

  /**
   * Show the Style Manager on component change.
   * @default true
   */
  showStylesOnChange?: boolean;

  /**
   * Show the Block Manager on load.
   * @default true
   */
  showBlocksOnLoad?: boolean;

  /**
   * Code viewer theme.
   * @default 'hopscotch'
   */
  codeViewerTheme?: string;

  /**
   * Custom options for `juice` HTML inliner.
   * @default {}
   */
  juiceOpts?: juice.Options;

  /**
   * Confirm text before clearing the canvas.
   * @default 'Are you sure you want to clear the canvas?'
   */
  textCleanCanvas?: string;

  /**
   * Load custom preset theme.
   * @default true
   */
  useCustomTheme?: boolean;
};

export type RequiredPluginOptions = Required<PluginOptions>;

const plugin: grapesjs.Plugin<PluginOptions> = (editor, opts: Partial<PluginOptions> = {}) => {
  let config = editor.getConfig();

  const options: RequiredPluginOptions = {
    blocks: ['sect100', 'sect50', 'sect30', 'sect37', 'button', 'divider', 'text', 'text-sect', 'image', 'quote', 'link', 'link-block', 'grid-items', 'list-items'],
    block: () => ({}),
    juiceOpts: {},
    cmdOpenImport: 'gjs-open-import-template',
    cmdTglImages: 'gjs-toggle-images',
    cmdInlineHtml: 'gjs-get-inlined-html',
    modalTitleImport: 'Import template',
    modalTitleExport: 'Export template',
    modalLabelImport: '',
    modalLabelExport: '',
    modalBtnImport: 'Import',
    codeViewerTheme: 'hopscotch',
    importPlaceholder: '',
    inlineCss: true,
    cellStyle: {
      padding: '0',
      margin: '0',
      'vertical-align': 'top',
    },
    tableStyle: {
      height: '150px',
      margin: '0 auto 10px auto',
      padding: '5px 5px 5px 5px',
      width: '100%'
    },
    updateStyleManager: true,
    showStylesOnChange: true,
    showBlocksOnLoad: true,
    useCustomTheme: true,
    textCleanCanvas: 'Are you sure you want to clear the canvas?',
    ...opts,
  };

  // Change some config
  config.devicePreviewMode = true;

  if (options.useCustomTheme && typeof window !== 'undefined') {
    const primaryColor = '#373d49';
    const secondaryColor = '#dae5e6';
    const tertiaryColor = '#4c9790';
    const quaternaryColor = '#35d7bb';
    const prefix = 'gjs-';
    let cssString = '';

    [
      ['one', primaryColor],
      ['two', secondaryColor],
      ['three', tertiaryColor],
      ['four', quaternaryColor],
    ].forEach(([cnum, ccol]) => {
      cssString += `
        .${prefix}${cnum}-bg {
          background-color: ${ccol};
        }
        .${prefix}${cnum}-color {
          color: ${ccol};
        }
        .${prefix}${cnum}-color-h:hover {
          color: ${ccol};
        }
      `;
    });

    const style = document.createElement('style');
    style.innerText = cssString;
    document.head.appendChild(style);
  }

  loadCommands(editor, options);
  loadBlocks(editor, options);
  loadPanels(editor, options);
  loadStyles(editor, options);
};

export default plugin;
