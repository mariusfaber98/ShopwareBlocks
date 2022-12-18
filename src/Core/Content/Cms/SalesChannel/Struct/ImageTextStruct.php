<?php declare(strict_types=1);

namespace FlareBlocks\Core\Content\Cms\SalesChannel\Struct;

use Shopware\Core\Content\Media\MediaEntity;
use Shopware\Core\Framework\Struct\Struct;

class ImageTextStruct extends Struct
{
    /**
     * @var MediaEntity|null
     */
    protected $media;

    /**
     * @var string|null
     */
    protected $mediaId;

    /**
     * @var string|null
     */
    protected $url;

    /**
     * @var bool|null
     */
    protected $newTab;

    /**
     * @var string|null
     */
    protected $content;

    public function getMedia(): ?MediaEntity
    {
        return $this->media;
    }

    public function setMedia(MediaEntity $media): void
    {
        $this->media = $media;
    }

    public function getMediaId(): ?string
    {
        return $this->mediaId;
    }

    public function setMediaId(string $mediaId): void
    {
        $this->mediaId = $mediaId;
    }

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(?string $url): void
    {
        $this->url = $url;
    }

    public function getNewTab(): ?bool
    {
        return $this->newTab;
    }

    public function setNewTab(?bool $newTab): void
    {
        $this->newTab = $newTab;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): void
    {
        $this->content = $content;
    }

    public function getApiAlias(): string
    {
        return 'cms_image_text';
    }
}
