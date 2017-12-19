/**
 * 测试模块
 * @type {fn}
 */

const convert = require('../index');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const defineSchema = new Schema({
    code: {
        type: String,
        displayName: '参数编码',
        unique: true,
        required: '参数编码不能为空',
        index: true
    },
    name: {
        type: String,
        displayName: '参数名称',
        required: '参数名称不能为空'
    },
    value: {
        type: Schema.Types.Mixed,
        displayName: '参数值',
        required: '参数值不能为空'
    }
});
console.log(JSON.stringify(convert('Param', defineSchema), null, 2));