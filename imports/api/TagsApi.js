import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const TagsApi = new Mongo.Collection("tags");

if (Meteor.isServer) {
  Meteor.publish("tags", (filter = {}, fields = {}, sort = {}) => {
    return TagsApi.find(filter, fields, sort);
  });
  Meteor.methods({
    "tags.insert": (payload) => {
      const userId = Meteor.user()?._id;
      const timestamp = new Date();
      TagsApi.insert({
        ...payload,
        createdBy: userId,
        updatedBy: userId,
        createdAt: timestamp,
        updatedAt: timestamp,
      });
    },
    "tags.update": (payload) => {
      const data = { ...payload, _id: undefined };
      const userId = Meteor.user()?._id;
      const timestamp = new Date();
      TagsApi.update(payload._id, {
        $set: { ...data, updatedBy: userId, updatedAt: timestamp },
      });
    },
    "tags.delete": (tagId) => {
      const tag = TagsApi.findOne(tagId);
      if (tag?._id) {
        TagsApi.remove(tag._id);
      }
    },
  });
}
