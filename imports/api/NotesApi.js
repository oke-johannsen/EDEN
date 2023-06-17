import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const NotesApi = new Mongo.Collection("notes");

if (Meteor.isServer) {
  Meteor.publish("notes", (filter = {}, fields = {}, sort = {}) => {
    return NotesApi.find(filter, fields, sort);
  });
  Meteor.methods({
    "notes.insert": (payload) => {
      const { blocks, entityMap } = payload;
      const userId = Meteor.user()?._id;
      const timestamp = new Date();
      NotesApi.insert({
        blocks,
        entityMap,
        createdBy: userId,
        updatedBy: userId,
        createdAt: timestamp,
        updatedAt: timestamp,
      });
    },
    "notes.update": (payload) => {
      const { blocks, entityMap } = payload;
      const userId = Meteor.user()?._id;
      const timestamp = new Date();
      NotesApi.update(payload._id, {
        $set: { blocks, entityMap, updatedBy: userId, updatedAt: timestamp },
      });
    },
    "notes.delete": (noteId) => {
      const note = NotesApi.findOne(noteId);
      if (note?._id) {
        NotesApi.remove(note._id);
      }
    },
  });
}
