import React from "react";
import Calendar from "antd/lib/calendar";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Button from "antd/lib/button";
import dayjs from "dayjs";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
const isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const getWeekDayName = (input) => {
  switch (input) {
    case 0:
      return "monday";
    case 1:
      return "tuesday";
    case 2:
      return "wednesday";
    case 3:
      return "thursday";
    case 4:
      return "friday";
    case 5:
      return "saturday";
    case 6:
      return "sunday";
    default:
      return null;
  }
};

const AppointmentCalendar = ({
  appointments,
  setDrawerStatus,
  selectedDay,
  setSelectedDay,
  setModel,
}) => {
  const openAppointment = (appointment) => {
    setDrawerStatus("opened");
    const model = {
      ...appointment,
      start: dayjs(appointment.start),
      end: dayjs(appointment.end),
      recurring: appointment.recurring ? 1 : 0,
      days: appointment.days || undefined,
      rhythm: appointment.rhythm || undefined,
    };
    setModel(model);
  };
  // Define a function to generate the date cell render content
  const cellRender = (value) => {
    const dayAppointments = appointments.filter((appointment) => {
      const currentDay = dayjs(value).startOf("day").toDate();
      const start = dayjs(appointment.start);
      const end = dayjs(appointment.end);
      const checkRecurrence = () => {
        if (appointment.recurring) {
          const weekDay = dayjs(currentDay).day();
          return (
            start.isSameOrBefore(currentDay) &&
            end.isSameOrAfter(currentDay) &&
            appointment.days.includes(getWeekDayName(weekDay))
          );
        }
      };
      return (
        (start.startOf("day").isSameOrBefore(currentDay) &&
          end.isSameOrAfter(currentDay)) ||
        (start.isSameOrAfter(currentDay) &&
          end.isSameOrBefore(dayjs(currentDay).endOf("day").toDate())) ||
        checkRecurrence()
      );
    });

    return (
      <ul>
        {dayAppointments.map((appointment) => (
          <li
            key={appointment._id}
            onClick={() => openAppointment(appointment)}
          >
            {appointment.title}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Calendar
      cellRender={cellRender}
      value={selectedDay}
      onSelect={() => setDrawerStatus("opened")}
      headerRender={() => {
        return (
          <Row gutter={8} align="middle" style={{ width: "100%" }}>
            <Col>
              <Button
                onClick={() =>
                  setSelectedDay(dayjs(selectedDay).subtract(1, "month"))
                }
              >
                <LeftOutlined />
              </Button>
            </Col>
            <Col>
              <Button
                style={{ minWidth: 135 }}
                type="primary"
                onClick={() => setSelectedDay(dayjs())}
              >
                {dayjs(selectedDay).format("DD. MMMM")}
              </Button>
            </Col>
            <Col>
              <Button
                onClick={() =>
                  setSelectedDay(dayjs(selectedDay).add(1, "month"))
                }
              >
                <RightOutlined />
              </Button>
            </Col>
          </Row>
        );
      }}
    />
  );
};

export default AppointmentCalendar;