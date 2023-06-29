import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import dayjs from "dayjs";

export const TasksApi = new Mongo.Collection("tasks");

if (Meteor.isServer) {
  Meteor.publish("tasks", (filter = {}, fields = {}, sort = {}) => {
    return TasksApi.find(filter, fields, sort);
  });
  Meteor.methods({
    "tasks.insert": (payload) => {
      const userId = Meteor.user()?._id;
      const timestamp = new Date();
      TasksApi.insert({
        ...payload,
        dueDate: payload.dueDate
          ? dayjs(payload?.dueDate).startOf("day").toDate()
          : undefined,
        createdBy: userId,
        updatedBy: userId,
        createdAt: timestamp,
        updatedAt: timestamp,
      });
    },
    "tasks.update": (payload) => {
      const userId = Meteor.user()?._id;
      const timestamp = new Date();
      const data = {
        ...payload,
        dueDate: payload.dueDate
          ? dayjs(payload?.dueDate).startOf("day").toDate()
          : undefined,
        _id: undefined,
      };
      TasksApi.update(payload._id, {
        $set: {
          ...data,
          updatedBy: userId,
          updatedAt: timestamp,
        },
      });
    },
    "tasks.delete": (taskId) => {
      const task = TasksApi.findOne(taskId);
      if (task?._id) {
        TasksApi.remove(task._id);
      }
    },
  });
}
