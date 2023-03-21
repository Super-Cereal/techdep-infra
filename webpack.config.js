const path = require('path');

// каждый из следующих нужно устанавливать через npm install (у нас уже установлены)
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

// NODE_ENV проставляется в package.json -> scripts
const isDev = process.env.NODE_ENV === 'development';

// Писал этот конфиг с помощью документации и видоса https://www.youtube.com/watch?v=uNLaS0S2FmU
// Дополнительно описал в readme.md
module.exports = {
    target: 'web',

    entry: {
        // Вместо app можно писать любое название бандла, в обьекте output оно будет подставляться вместо [name]
        app: './src/app',
    },

    output: {
        filename: isDev ? '[name].js' : '[name]_[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },

    mode: isDev ? 'development' : 'production',

    resolve: {
        // Если в коде импортируем файл без расширения, то вебпак попробует подставить следующие:
        extensions: ['.tsx', '.jsx', '.ts', '.js'],

        // Позволяет при импортах вместо условного "../../../../src/utils/get-data" писать "utils/get-data"
        alias: {
            src: path.resolve(__dirname, 'src'),
            utils: path.resolve(__dirname, 'src/utils'),
        },
    },

    optimization: {
        minimizer: [
            // In webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`)
            '...',

            // Ужимает css, убирает пустые теги, повторяющиеся теги обьединяет и тд
            new CssMinimizerPlugin(),
        ],
    },

    // Следующие правила обьявляют какие обработчики (лоадеры) использовать для того или иного расширения файла
    module: {
        rules: [
            {
                // Регулярные выражения
                test: /\.(jsx?|tsx?)$/,
                exclude: /(node_modules)/,

                // Для jsx, js, tsx и ts используем babel-loader с доп.настройками
                // babel-loader и его пресеты нужно устанавливать с помощью npm install (у нас уже установлены)
                // jsx и tsx – расширения для React комопнентов (синтаксис html внутри js), в src есть несколько таких файлов
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                    },
                },
            },
            {
                test: /\.s?css$/,
                exclude: /(node_modules)/,

                // Для scss и css используем несколько лоадеров, они применяются в обратном порядке:
                // style-loader(css-loader(sass-loader(...code...)))
                //
                // sass-loader – компилирует scss в css
                // css-loader – компилирует современный css в более поддерживаемый css (что позволяет не писать префиксы типа webkit- для поддержки отдельных браузеров или новых фичей)
                // style-loader – помещает css в html в тег <style></style>
                // или MiniCssExtractPlugin.loader для продакшен-сборки – помещает css в файл app.css, который подгрузит в html через тег <link />
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: isDev },
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: isDev },
                    },
                ],
            },
        ],
    },

    plugins: [
        // Очищает папку dist перед новым билдом
        new CleanWebpackPlugin(),

        // Позволяет подключать скрипты и css в наш html файлик
        // и добавлять ему нек-рые параметры (типа title или favicon)
        new HtmlWebpackPlugin({
            title: 'TechDep App',
            template: path.resolve(__dirname, 'public/index.html'),
        }),

        // Нужен для работы MiniCssExtractPlugin.loader
        new MiniCssExtractPlugin({
            filename: isDev ? '[name].css' : '[name]_[contenthash].css',
        }),
    ],
};
