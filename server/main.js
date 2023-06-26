import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import "../imports/api/NotesApi";
import "../imports/api/AppointmentApi";
Meteor.startup(async () => {});

if (Meteor.isServer) {
  Meteor.methods({
    "accounts-create": function (payload) {
      const profile = {
        firstname: payload.firstname,
        lastname: payload.lastname,
      };
      Accounts.createUser({
        username: payload.username,
        email: payload.email,
        password: payload.password,
        profile,
      });
    },
  });
}
