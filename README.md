# mongoose-schema-2-json-schema

Mongoose schema to JSON schema.

## Installation

```shell
npm install mongoose-schema-2-json-schema
```

## Usage

```js
const convert = require('mongoose-schema-2-json-schema');
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
```