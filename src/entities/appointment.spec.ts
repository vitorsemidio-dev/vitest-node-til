import { expect, test } from "vitest";

import { Appointment } from "./appointment";

const makeAppointmentProps = () => {
  const startsAt = new Date();
  const endsAt = new Date();

  startsAt.setDate(startsAt.getDate() + 1);
  endsAt.setDate(endsAt.getDate() + 2);

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
