import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
    name: 'image-text',
    label: 'sw-cms.elements.imageText.label',
    component: 'sw-cms-el-image-text',
    configComponent: 'sw-cms-el-config-image-text',
    previewComponent: 'sw-cms-el-preview-image-text',
    defaultConfig: {
        media: {
            source: 'static',
            value: null,
            required: true,
            entity: {
                name: 'media',
            },
        },
        content: {
            source: 'static',
            value: '<h2 style="text-align: center; color: #FFFFFF">Lorem Ipsum</h2>'.trim(),
        },
        displayMode: {
            source: 'static',
            value: 'standard',
        },
        hoverAnimation: {
            source: 'static',
            value: 'zoom',
        },
        aspectRatio: {
            source: 'static',
            value: '1:1',
        },
        aspectRatioSm: {
            source: 'static',
            value: '1:1',
        },
        aspectRatioMd: {
            source: 'static',
            value: '1:1',
        },
        aspectRatioLg: {
            source: 'static',
            value: '1:1',
        },
        aspectRatioXl: {
            source: 'static',
            value: '1:1',
        },
        aspectRatioXxl: {
            source: 'static',
            value: '1:1',
        },
        fullHeight: {
            source: 'static',
            value: false,
        },
        verticalAlignText: {
            source: 'static',
            value: 'center',
        },
        horizontalAlignText: {
            source: 'static',
            value: 'center',
        },
        paddingText: {
            source: 'static',
            value: '10px',
        },
        color: {
            source: 'static',
            value: '#000000',
        },
        opacity: {
            source: 'static',
            value: '0.8',
        },
        disableImage: {
            source: 'static',
            value: false,
        },
        cssClass: {
            source: 'static',
            value: null,
        },
        url: {
            source: 'static',
            value: null,
        },
        newTab: {
            source: 'static',
            value: false,
        },
    },
});
