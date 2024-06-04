const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nameSchema = new Schema({
    first: { type: String, required: true, },
    middle: { type: String, },
    last: { type: String, required: true, },
    maiden: { type: String},
    nickname: { type: String },
});

const mediaSchema = new Schema({
    url: { type: String, required: true },
    description: { type: String },
    date: { type: Date }
});

const personSchema = new Schema({
    name:  nameSchema ,
    bio: { type: String },
    dob: { type: Date, },
    dod: { type: Date, },
    bio_father: { type: Schema.Types.ObjectId, ref: 'Person' }, 
    bio_mother: { type: Schema.Types.ObjectId, ref: 'Person' },
    adopted_father: { type: Schema.Types.ObjectId, ref: 'Person' },
    adopted_mother: { type: Schema.Types.ObjectId, ref: 'Person' },
    children: [{ type: Schema.Types.ObjectId, ref: 'Person' }],
    refrences: [mediaSchema],
    photos: [mediaSchema],
    audio: [mediaSchema],
    video: [mediaSchema]
});

const Person = mongoose.model('Person', personSchema)

module.exports = Person;