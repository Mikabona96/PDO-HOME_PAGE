// Core
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';
// @ts-ignore
import FontminPlugin from 'fontmin-webpack';

// Constants
import { SOURCE_DIRECTORY, APP_NAME } from '../constants';

export const connectHtml = (): Configuration => ({
    plugins: [
        new HtmlWebpackPlugin({
            template: `${SOURCE_DIRECTORY}/index.handlebars`,
            title:    APP_NAME,
            favicon:  `${SOURCE_DIRECTORY}/favicon.ico`,
        }),
    ],
});


export const loadImagesDev = (): Configuration => ({
    module: {
        rules: [
            {
                test:      /\.(png|svg|jpg|jpeg|gif|mp4|webp|webm)$/i,
                type:      'asset/resource',
                generator: {
                    filename: 'assets/images/[name][ext]',
                },
            },
        ],
    },
});

export const loadImagesProd = (): Configuration => {
    return {
        module: {
            rules: [
                {
                    test:      /\.(png|svg|jpg|jpeg|gif|mp4|webp|webm)$/i,
                    type:      'asset/resource',
                    generator: {
                        filename: 'assets/images/[name][ext]',
                    },
                },
            ],
        },

        optimization: {
            minimizer: [
                new ImageMinimizerPlugin({
                    minimizer: {
                        implementation: ImageMinimizerPlugin.imageminMinify,
                        options:        {
                            plugins: [
                                'imagemin-gifsicle',
                                'imagemin-mozjpeg',
                                'imagemin-pngquant',
                                'imagemin-svgo',
                            ],
                        },
                    },
                    loader: false,
                }),
            ],
        },
    };
};

export const loadFontsDev = (): Configuration => ({
    module: {
        rules: [
            {
                test:      /\.(woff|woff2|eot|ttf|otf)$/i,
                type:      'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext]',
                },
            },
        ],
    },
});

export const loadFontsProd = (): Configuration => ({
    module: {
        rules: [
            {
                test:      /\.(woff|woff2|eot|ttf|otf)$/i,
                type:      'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext]',
                },
            },
        ],
    },
    plugins: [
        new FontminPlugin({
            autodetect:        true,
            glyphs:            [],
            allowedFilesRegex: null,
            skippedFilesRegex: null,
        }),
    ],
});
