import template from './sw-cms-el-config-image-text.html.twig';
import './sw-cms-el-config-image-text.scss';

const { Component, Mixin } = Shopware;

Component.register('sw-cms-el-config-image-text', {
    template,

    inject: ['repositoryFactory'],

    mixins: [
        Mixin.getByName('cms-element'),
    ],

    data() {
        return {
            mediaModalIsOpen: false,
            initialFolderId: null,
        };
    },

    computed: {
        mediaRepository() {
            return this.repositoryFactory.create('media');
        },

        uploadTag() {
            return `cms-element-media-config-${this.element.id}`;
        },

        previewSource() {
            if (this.element.data && this.element.data.media && this.element.data.media.id) {
                return this.element.data.media;
            }

            return this.element.config.media.value;
        },
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            if (this.element.config.disableImage.value) {
                delete this.element.config.media.required;
            } else {
                this.element.config.media.required = true;
            }

            this.initElementConfig('image-text');
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
            console.log('test');
        },

        async onImageUpload({ targetId }) {
            const mediaEntity = await this.mediaRepository.get(targetId);

            this.element.config.media.value = mediaEntity.id;
            this.element.config.media.source = 'static';

            this.updateElementData(mediaEntity);

            this.$emit('element-update', this.element);
        },

        onImageRemove() {
            this.element.config.media.value = null;

            this.updateElementData();

            this.$emit('element-update', this.element);
        },

        onCloseModal() {
            this.mediaModalIsOpen = false;
        },

        onSelectionChanges(mediaEntity) {
            const media = mediaEntity[0];
            this.element.config.media.value = media.id;

            this.updateElementData(media);

            this.$emit('element-update', this.element);
        },

        updateElementData(media = null) {
            const mediaId = media === null ? null : media.id;
            if (!this.element.data) {
                this.$set(this.element, 'data', { mediaId, media });
            } else {
                this.$set(this.element.data, 'mediaId', mediaId);
                this.$set(this.element.data, 'media', media);
            }
        },

        onOpenMediaModal() {
            this.mediaModalIsOpen = true;
        },

        onChangeDisableImage() {
            if (this.element.config.disableImage.value) {
                delete this.element.config.media.required;
            } else {
                this.element.config.media.required = true;
            }
        },

        onChangeAspectRatio(value) {
            this.element.config.aspectRatio.value = value === null ? '' : value;

            this.$emit('element-update', this.element);
        },

        onChangeAspectRatioSm(value) {
            this.element.config.aspectRatioSm.value = value === null ? '' : value;

            this.$emit('element-update', this.element);
        },

        onChangeAspectRatioMd(value) {
            this.element.config.aspectRatioMd.value = value === null ? '' : value;

            this.$emit('element-update', this.element);
        },

        onChangeAspectRatioLg(value) {
            this.element.config.aspectRatioLg.value = value === null ? '' : value;

            this.$emit('element-update', this.element);
        },

        onChangeAspectRatioXl(value) {
            this.element.config.aspectRatioXl.value = value === null ? '' : value;

            this.$emit('element-update', this.element);
        },

        onChangeAspectRatioXxl(value) {
            this.element.config.aspectRatioXxl.value = value === null ? '' : value;

            this.$emit('element-update', this.element);
        },

        onChangePaddingText(value) {
            this.element.config.paddingText.value = value === null ? '' : value;

            this.$emit('element-update', this.element);
        },
    },
});
