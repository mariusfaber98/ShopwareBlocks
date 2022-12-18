import template from './sw-cms-el-image-text.html.twig';
import './sw-cms-el-image-text.scss';

const { Component, Mixin, Filter } = Shopware;

Component.register('sw-cms-el-image-text', {
    template,

    mixins: [
        Mixin.getByName('cms-element'),
    ],

    data() {
        return {
            editable: true,
            demoValue: '',
        };
    },

    computed: {
        displayModeClass() {
            if (this.element.config.displayMode.value === 'standard') {
                return null;
            }

            return `is--${this.element.config.displayMode.value}`;
        },

        customCssClass() {
            return 'test';
        },

        styles() {
            return {
                'height': this.element.config.fullHeight.value ? '100%' : null,
                '--aspect-ratio': this.element.config.aspectRatio.value.replace(':', '/'),
            };
        },

        stylesContent() {
            return {
                'background-color': this.element.config.color.value || null,
            };
        },

        stylesMedia() {
            return {
                'opacity': this.element.config.opacity.value || null,
            };
        },

        stylesText() {
            return {
                'justify-content': this.element.config.horizontalAlignText.value || null,
                'align-items': this.element.config.verticalAlignText.value || null,
                'padding': this.element.config.paddingText.value || null,
            };
        },

        mediaUrl() {
            const staticFallBackImage = this.assetFilter(`administration/static/img/cms/preview_mountain_large.jpg`);
            const elemData = this.element.data.media;
            const elemConfig = this.element.config.media;

            if (elemConfig.source === 'mapped') {
                const demoMedia = this.getDemoValue(elemConfig.value);

                if (demoMedia?.url) {
                    return demoMedia.url;
                }

                return staticFallBackImage;
            }

            if (elemConfig.source === 'default') {
                // use only the filename
                const fileName = elemConfig.value.slice(elemConfig.value.lastIndexOf('/') + 1);
                console.log(fileName);
                return this.assetFilter(`administration/static/img/cms/${fileName}`);
            }

            if (elemData?.id) {
                return this.element.data.media.url;
            }

            if (elemData?.url) {
                return this.assetFilter(elemConfig.url);
            }

            return staticFallBackImage;
        },

        assetFilter() {
            return Filter.getByName('asset');
        },

        mediaConfigValue() {
            return this.element?.config?.sliderItems?.value;
        },
    },

    watch: {
        cmsPageState: {
            deep: true,
            handler() {
                this.$forceUpdate();
                this.updateDemoValue();
            },
        },

        mediaConfigValue(value) {
            const mediaId = this.element?.data?.media?.id;
            const isSourceStatic = this.element?.config?.media?.source === 'static';

            if (isSourceStatic && mediaId && value !== mediaId) {
                this.element.config.media.value = mediaId;
            }
        },

        'element.config.content.source': {
            handler() {
                this.updateDemoValue();
            },
        },
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('image-text');
            this.initElementData('image-text');

            if (this.element.config.disableImage.value) {
                console.log('disable created');
                delete this.element.config.media.required;
            } else {
                this.element.config.media.required = true;
            }
        },

        updateDemoValue() {
            if (this.element.config.content.source === 'mapped') {
                this.demoValue = this.getDemoValue(this.element.config.content.value);
            }
        },

        onBlur(content) {
            this.emitChanges(content);
        },

        onInput(content) {
            this.emitChanges(content);
        },

        emitChanges(content) {
            if (content !== this.element.config.content.value) {
                this.element.config.content.value = content;
                this.$emit('element-update', this.element);
            }
        },
    },
});
