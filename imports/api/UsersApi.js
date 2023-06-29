import { Meteor } from "meteor/meteor";

export const UsersApi = Meteor.users;

if (Meteor.isServer) {
  Meteor.publish("users", (filter = {}, fields = {}, sort = {}) => {
    return UsersApi.find(filter, fields, sort);
  });
  Meteor.methods({
    "users.update": (userId, payload) => {
      const currentUserId = Meteor.user()?._id;
      const timestamp = new Date();
      const data = {
        username: payload.username,
        profile: {
          firstname: payload.firstname,
          lastname: payload.lastname,
        },
        emails: [{ address: payload.email, verified: false }],
      };
      UsersApi.update(userId, {
        $set: {
          ...data,
          updatedBy: currentUserId,
          updatedAt: timestamp,
        },
      });
    },
    "users.delete": (userId) => {
      const user = UsersApi.findOne(userId);
      if (user?._id) {
        UsersApi.remove(user._id);
      }
    },
  });
}
