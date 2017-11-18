/**
 * 测试模块
 * @type {fn}
 */

const convert = require('../index');
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    body: String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
        votes: Number,
        favs: Number
    }
});
console.log(JSON.stringify(convert('Blog', blogSchema), null, 2));