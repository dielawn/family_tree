const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mediaSchema = new Schema({
    url: { type: String, required: true },
    description: { type: String },
    date: { type: Date }
});

const personSchema = new Schema({
    first_name: { type: String, required: true, },
    middle_name: { type: String, },
    last_name: { type: String, required: true, },
    dob: { type: Date, },
    dod: { type: Date, },
    parents: { 
        bio_father: { type: Schema.Types.ObjectId, ref: 'Person' }, 
        bio_mother: { type: Schema.Types.ObjectId, ref: 'Person' },
        adopted_father: { type: Schema.Types.ObjectId, ref: 'Person' },
        adopted_mother: { type: Schema.Types.ObjectId, ref: 'Person' },
    },
    children: [{ type: Schema.Types.ObjectId, ref: 'Person' }],
    refrences: [mediaSchema],
    photos: [mediaSchema],
    audio_video: [mediaSchema]
});

const Person = mongoose.model('Person', personSchema)

module.exports = Person;