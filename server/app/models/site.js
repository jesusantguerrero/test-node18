import mongoose  from  "mongoose";

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId;

export const Selector = mongoose.model('Selector', new Schema({
    url:String,
    text: String,
    title: String,
    description: String,
    actions: Object,
    results: Object,
    active: Boolean,
}))

export const Site = mongoose.model('Site', new Schema({
    title: String,
    url: String,
    selector: String,
    actions: Object,
    results: Array,
    published: Boolean,
    createdAt: { type: Date, default: Date.now()}
}));
  
export const Notification = mongoose.model('Notification', new Schema({
    entityId: ObjectId,      
    entity:  String,
    createdAt: Date,
    updatedAt: Date,
    handlers:  Object,
    subject:  String,
    message:   String,
    data: Object,
    channel:  String,
    status: String    //check (status in('scheduled', 'sent', 'failed')) default 'scheduled'
}));

  