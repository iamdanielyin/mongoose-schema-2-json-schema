/**
 * 导出convert
 */

module.exports = convert;

/**
 * 类型转换
 * @param type Mongoose-Schema类型
 * @returns {*} JSON-Schema类型
 */
function typeConvert(type) {
    switch (type) {
        case 'ObjectID':
            return 'string';
        case 'Date':
            return 'date-time';
        case 'Buffer':
            return 'file';
        case 'Mixed':
            return 'any';
        default:
            return type.toLowerCase();
    }
}

/**
 * 转换函数
 * @param schema Mongoose-Schema
 * @returns JSON-Schema
 */
function convert(title, schema) {
    schema = schema || title;
    const object = {};
    if (typeof title === 'string') {
        Object.assign(object, {
            schema: 'http://json-schema.org/schema#',
            title
        });
    }
    Object.assign(object, {
        type: 'object',
        properties: {}
    });
    const paths = schema.paths;
    for (const key in schema.paths) {
        const v = schema.paths[key];
        const property = {};
        property.type = typeConvert(v.instance);
        if (v.isRequired) {
            property.required = v.isRequired;
        }
        if (v.options.ref) property.type = v.options.ref;
        if (v.options.description) property.description = v.options.description;
        if (v.options.example) property.example = v.options.example;
        if (v.options.datetype && instance === 'Date') property.type = v.options.datetype;
        if (v.defaultValue !== null && v.defaultValue !== undefined && (typeof v.defaultValue !== 'function')) property.default = v.defaultValue;
        if (v.options.displayName) property.displayName = v.options.displayName;
        if (v.enumValues && v.enumValues.length > 0) property.enum = v.enumValues;
        if (property.type === 'array' && v.$isMongooseDocumentArray === true) property.items = convert(v.schema);
        if (v.validators && v.validators.length > 0) {
            if (v.validators.type) property.type = v.options.datetype;
            for (let validator of v.validators) {
                switch (v.instance) {
                    case 'Number':
                        if (validator.type === 'min') property.minimum = validator.min;
                        if (validator.type === 'max') property.maximum = validator.max;
                        break;
                }
            }
        }
        object.properties[v.path] = property;
    }
    return object;
}