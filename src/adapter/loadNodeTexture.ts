import canvasModule from 'canvas';
import { extensions, ExtensionType, settings, Texture, TextureSource, utils } from '@pixi/core';
import { NodeCanvasElement } from './NodeCanvasElement';

import type { LoaderParser, ResolvedAsset } from '@pixi/assets';

const { loadImage } = canvasModule;
const validImages = ['.jpg', '.png', '.jpeg', '.svg'];

/** loads our textures into a node canvas */
export const loadNodeTexture = {
    extension: ExtensionType.LoadParser,

    name: 'loadNodeTexture',

    test(url: string): boolean
    {
        return validImages.includes(utils.path.extname(url).toLowerCase());
    },

    async load(url: string, asset: ResolvedAsset): Promise<Texture>
    {
        const data = await settings.ADAPTER.fetch(url);
        const image = await loadImage(Buffer.from(await data.arrayBuffer()));
        const canvas = new NodeCanvasElement(image.width, image.height);
        const ctx = canvas.getContext('2d');

        ctx?.drawImage(image as unknown as CanvasImageSource, 0, 0);
        const texture = Texture.from(canvas as unknown as TextureSource, {
            resolution: utils.getResolutionOfUrl(url),
            ...asset.data
        });

        return texture;
    },

    unload(texture: Texture): void
    {
        texture.destroy(true);
    }
} as LoaderParser<Texture>;

extensions.add(loadNodeTexture);
