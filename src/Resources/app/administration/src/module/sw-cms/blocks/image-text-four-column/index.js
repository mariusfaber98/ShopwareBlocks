import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'image-text-four-column',
    label: 'sw-cms.blocks.image.imageFourColumn.label',
    category: 'text-image',
    component: 'sw-cms-block-image-text-four-column',
    previewComponent: 'sw-cms-preview-image-text-four-column',
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '20px',
        marginRight: '20px',
        sizingMode: 'boxed',
    },
    slots: {
        left: {
            type: 'image-text',
            default: {
                config: {
                    displayMode: { source: 'static', value: 'cover' },
                },
                data: {
                    media: {
                        value: 'framework/assets/default/cms/preview_camera_large.jpg',
                        source: 'default',
                    },
                },
            },
        },
        'center-left': {
            type: 'image-text',
            default: {
                config: {
                    displayMode: { source: 'static', value: 'cover' },
                },
                data: {
                    media: {
                        value: 'framework/assets/default/cms/preview_plant_large.jpg',
                        source: 'default',
                    },
                },
            },
        },
        'center-right': {
            type: 'image-text',
            default: {
                config: {
                    displayMode: { source: 'static', value: 'cover' },
                },
                data: {
                    media: {
                        value: 'framework/assets/default/cms/preview_glasses_large.jpg',
                        source: 'default',
                    },
                },
            },
        },
        right: {
            type: 'image-text',
            default: {
                config: {
                    displayMode: { source: 'static', value: 'cover' },
                },
                data: {
                    media: {
                        value: 'framework/assets/default/cms/preview_mountain_large.jpg',
                        source: 'default',
                    },
                },
            },
        },
    },
});
