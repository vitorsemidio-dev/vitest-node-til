import { expect, test } from "vitest";

import { getFutureDate } from "../tests/utils/get-future-date";
import { getPastDate } from "../tests/utils/get-past-date";
import { Appointment } from "./appointment";

const makeAppointmentProps = () => {
  const startsAt = getFutureDate("2022-10-10");
  const endsAt = getFutureDate("2022-10-11");

  const appointmentProps = {
    customer: "John Doe",
    startsAt,
    endsAt,
  };

  return { appointmentProps };
};

test("create an appointment", () => {
  const { appointmentProps } = makeAppointmentProps();

  const appointment = new Appointment(appointmentProps);

  expect(appointment).toBeInstanceOf(Appointment);
  expect(appointment.customer).toEqual("John Doe");
});

test("cannot create an appointment with end date before start date", () => {
  const { appointmentProps } = makeAppointmentProps();
  appointmentProps.endsAt.setDate(appointmentProps.startsAt.getDate() - 1);

  expect(() => {
    return new Appointment(appointmentProps);
  }).toThrow();
});

test("cannot create an appointment with start date before now", () => {
  const { appointmentProps } = makeAppointmentProps();
  appointmentProps.startsAt = getPastDate("2022-05-05");

  expect(() => {
    return new Appointment(appointmentProps);
  }).toThrow();
});
