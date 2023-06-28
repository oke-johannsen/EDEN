import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const AppointmentsApi = new Mongo.Collection("appointments");

if (Meteor.isServer) {
  Meteor.publish("appointments", (filter = {}, fields = {}, sort = {}) => {
    return AppointmentsApi.find(filter, fields, sort);
  });
  Meteor.methods({
    "appointments.insert": (payload) => {
      const userId = Meteor.user()?._id;
      const timestamp = new Date();
      AppointmentsApi.insert({
        ...payload,
        createdBy: userId,
        updatedBy: userId,
        createdAt: timestamp,
        updatedAt: timestamp,
      });
    },
    "appointments.update": (payload) => {
      data = {
        ...payload,
        _id: undefined,
      };
      const userId = Meteor.user()?._id;
      const timestamp = new Date();
      AppointmentsApi.update(payload._id, {
        $set: { ...data, updatedBy: userId, updatedAt: timestamp },
      });
    },
    "appointments.delete": (noteId) => {
      const note = AppointmentsApi.findOne(noteId);
      if (note?._id) {
        AppointmentsApi.remove(note._id);
      }
    },
  });
}
