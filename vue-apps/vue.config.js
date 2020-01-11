const path = require("path");
module.exports = {
    pages: {
        note: {
            entry: 'notes/notes.js',
            template: 'notes/notes.html',
            filename: 'notes.html',
            title: 'Notesapp',
        },
        verifynote: {
            entry: 'verifynotes/verifynotes.js',
            template: 'verifynotes/verifynotes.html',
            filename: 'verifynotes.html',
            title: 'Verifynote'
        },
        qp: {
            entry: 'qp/qp.js',
            template: 'qp/qp.html',
            filename: 'qp.html',
            title: 'Question'
        },
        verifyqp: {
            entry: 'verifyqp/verifyqp.js',
            template: 'verifyqp/verifyqp.html',
            filename: 'verifyqp.html',
            title: 'Verifyqp'
        },
        syllabus: {
            entry: 'syllabus/syllabus.js',
            template: 'syllabus/syllabus.html',
            filename: 'syllabus.html',
            title: 'Syllabus'
        }
    },
    chainWebpack: config =>
    {
        config.optimization.splitChunks(false)
    },
    runtimeCompiler: true,
    configureWebpack: {
        devServer: {
            disableHostCheck: true,
            clientLogLevel: 'info',
            proxy: 'http://notespedia.in'
        }
    },
    outputDir: path.resolve(__dirname, "../html/view/"),
    assetsDir: "./static/",  //relative to outputDir
    publicPath: process.env.NODE_ENV === 'production'
        ? "../view/"
        : '/'
}