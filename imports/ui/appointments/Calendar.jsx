import React, { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/en";
import AppointmentForm from "./AppointmentForm";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { AppointmentsApi } from "../../api/AppointmentApi";
import AppointmentCalendar from "./AppointmentCalendar";
import Modal from "antd/lib/modal";

const initAppointmentForm = {
  _id: undefined,
  title: null,
  start: null,
  end: null,
  location: null,
  recurring: false,
  days: undefined,
  rhythm: undefined,
  tags: [],
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
  const [modalStatus, setModalStatus] = useState("closed");
  const [model, setModel] = useState(initAppointmentForm);
  const [selectedDay, setSelectedDay] = useState(dayjs());
  const resetDrawer = () => {
    setModalStatus("closed");
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
        setModalStatus={setModalStatus}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        setModel={setModel}
      />
      <Modal
        open={modalStatus !== "closed"}
        onCancel={resetDrawer}
        title="Appointment"
        width={"25%"}
        children={
          <AppointmentForm
            onFinish={onFinish}
            model={model}
            onCancel={resetDrawer}
          />
        }
        footer={false}
      />
    </>
  );
};

export default Calendar;
