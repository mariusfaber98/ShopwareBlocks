<?php declare(strict_types=1);

namespace CmsBlocks\Core\Content\Media\Cms;

use FlareBlocks\Core\Content\Cms\SalesChannel\Struct\ImageTextStruct;
use Shopware\Core\Content\Cms\Aggregate\CmsSlot\CmsSlotEntity;
use Shopware\Core\Content\Cms\DataResolver\CriteriaCollection;
use Shopware\Core\Content\Cms\DataResolver\Element\AbstractCmsElementResolver;
use Shopware\Core\Content\Cms\DataResolver\Element\ElementDataCollection;
use Shopware\Core\Content\Cms\DataResolver\FieldConfig;
use Shopware\Core\Content\Cms\DataResolver\ResolverContext\EntityResolverContext;
use Shopware\Core\Content\Cms\DataResolver\ResolverContext\ResolverContext;
use Shopware\Core\Content\Media\MediaDefinition;
use Shopware\Core\Content\Media\MediaEntity;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\Util\HtmlSanitizer;

class ImageTextTypeDataResolver extends AbstractCmsElementResolver
{
    private HtmlSanitizer $sanitizer;

    public function __construct(HtmlSanitizer $sanitizer)
    {
        $this->sanitizer = $sanitizer;
    }

    public function getType(): string
    {
        return 'image-text';
    }

    public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): ?CriteriaCollection
    {
        $mediaConfig = $slot->getFieldConfig()->get('media');
        if ($mediaConfig === null || $mediaConfig->isMapped() || $mediaConfig->getValue() === null) {
            return null;
        }

        $criteria = new Criteria([$mediaConfig->getStringValue()]);

        $criteriaCollection = new CriteriaCollection();
        $criteriaCollection->add('media_' . $slot->getUniqueIdentifier(), MediaDefinition::class, $criteria);

        return $criteriaCollection;
    }

    public function enrich(CmsSlotEntity $slot, ResolverContext $resolverContext, ElementDataCollection $result): void
    {
        $config = $slot->getFieldConfig();
        $imageText = new ImageTextStruct();
        $slot->setData($imageText);

        $contentConfig = $config->get('content');
        if ($contentConfig === null) {
            return;
        }

        $content = null;

        if ($contentConfig->isMapped() && $resolverContext instanceof EntityResolverContext) {
            $content = $this->resolveEntityValueToString($resolverContext->getEntity(), $contentConfig->getStringValue(), $resolverContext);
        }

        if ($contentConfig->isStatic()) {
            if ($resolverContext instanceof EntityResolverContext) {
                $content = (string) $this->resolveEntityValues($resolverContext, $contentConfig->getStringValue());
            } else {
                $content = $contentConfig->getStringValue();
            }
        }

        if ($content !== null) {
            $imageText->setContent($this->sanitizer->sanitize($content));
        }

        $slot->setData($imageText);

        $urlConfig = $config->get('url');
        if ($urlConfig !== null) {
            if ($urlConfig->isStatic()) {
                $imageText->setUrl($urlConfig->getStringValue());
            }

            if ($urlConfig->isMapped() && $resolverContext instanceof EntityResolverContext) {
                $url = $this->resolveEntityValue($resolverContext->getEntity(), $urlConfig->getStringValue());
                if ($url) {
                    $imageText->setUrl($url);
                }
            }

            $newTabConfig = $config->get('newTab');
            if ($newTabConfig !== null) {
                $imageText->setNewTab($newTabConfig->getBoolValue());
            }
        }

        $mediaConfig = $config->get('media');
        if ($mediaConfig && $mediaConfig->getValue()) {
            $this->addMediaEntity($slot, $imageText, $result, $mediaConfig, $resolverContext);
        }
    }

    private function addMediaEntity(
        CmsSlotEntity $slot,
        ImageTextStruct $image,
        ElementDataCollection $result,
        FieldConfig $config,
        ResolverContext $resolverContext
    ): void {
        if ($config->isMapped() && $resolverContext instanceof EntityResolverContext) {
            /** @var MediaEntity|null $media */
            $media = $this->resolveEntityValue($resolverContext->getEntity(), $config->getStringValue());

            if ($media !== null) {
                $image->setMediaId($media->getUniqueIdentifier());
                $image->setMedia($media);
            }
        }

        if ($config->isStatic()) {
            $image->setMediaId($config->getStringValue());

            $searchResult = $result->get('media_' . $slot->getUniqueIdentifier());
            if (!$searchResult) {
                return;
            }

            /** @var MediaEntity|null $media */
            $media = $searchResult->get($config->getValue());
            if (!$media) {
                return;
            }

            $image->setMedia($media);
        }
    }
}
