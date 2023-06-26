import React, { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/en";
import Drawer from "antd/lib/drawer";
import AppointmentForm from "./AppointmentForm";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { AppointmentsApi } from "../api/AppointmentApi";
import AppointmentCalendar from "./AppointmentCalendar";

const initAppointmentForm = {
  _id: undefined,
  title: null,
  start: null,
  end: null,
  location: null,
  recurring: false,
  days: undefined,
  rhythm: undefined,
};

const Calendar = () => {
  const { ready, appointments } = useTracker(() => {
    const subscription = Meteor.subscribe("appointments");
    return {
      ready: subscription.ready(),
      appointments: AppointmentsApi.find({
        createdBy: Meteor.user()._id,
      }).fetch(),
    };
  }, []);
  const [drawerStatus, setDrawerStatus] = useState("closed");
  const [model, setModel] = useState(initAppointmentForm);
  const [selectedDay, setSelectedDay] = useState(dayjs());
  const resetDrawer = () => {
    setDrawerStatus("closed");
    setModel(initAppointmentForm);
  };

  const onFinish = (values) => {
    data = {
      ...model,
      ...values,
      start: dayjs(values.start).toDate(),
      end: dayjs(values.end).toDate(),
      recurring: values.recurring ? true : false,
    };
    const method = model._id ? "update" : "insert";
    console.log("Appointment details:", data);
    Meteor.call(`appointments.${method}`, data, () => {
      resetDrawer();
    });
  };
  return (
    <>
      <AppointmentCalendar
        appointments={appointments}
        setDrawerStatus={setDrawerStatus}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        setModel={setModel}
      />
      <Drawer
        open={drawerStatus !== "closed"}
        onClose={resetDrawer}
        title="Appointment"
        width={"25%"}
        children={<AppointmentForm onFinish={onFinish} model={model} />}
      />
    </>
  );
};

export default Calendar;
