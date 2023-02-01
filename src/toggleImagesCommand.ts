import type grapesjs from 'grapesjs';
import { PluginOptions } from '.';

export default (editor: grapesjs.Editor,  opts: Required<PluginOptions>) => {
  return editor.Commands.add(opts.cmdTglImages, {
    run(editor) {
        const components = editor.getComponents();
        this.toggleImages(components);
    },

    stop(editor) {
        const components = editor.getComponents();
        this.toggleImages(components, true);
    },

    toggleImages(components: any, on: boolean = false) {
        const srcPlh = '##';

        components.forEach((component: grapesjs.Component) => {
            if (component.get('type') === 'image') {
                const source = component.get('src');

                if (on) {
                    if (source === srcPlh) {
                        component.set('src', component.get('src_bkp'));
                    }
                } else if (source !== srcPlh) {
                    component.set('src_bkp', component.get('src'));
                    component.set('src', srcPlh);
                }
            }

            this.toggleImages(component.get('components'), on);
        });
    },
});
};
