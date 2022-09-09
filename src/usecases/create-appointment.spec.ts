import { describe, expect, it } from "vitest";
import { Appointment } from "../entities/appointment";
import { CreateAppointmentUseCase } from "./create-appointment";

const makeCreateAppointmentRequest = () => {
  const startsAt = new Date();
  const endsAt = new Date();

  startsAt.setDate(startsAt.getDate() + 1);
  endsAt.setDate(endsAt.getDate() + 2);

  const createAppointmentRequest = {
    customer: "John Doe",
    startsAt,
    endsAt,
  };

  return createAppointmentRequest;
};

const makeCreateAppointmentUseCase = () => {
  const createAppointmentUseCase = new CreateAppointmentUseCase();
  return createAppointmentUseCase;
};

describe("Create Appointment Use Case", () => {
  it("should be able to create an Appointment", async () => {
    const createAppointmentUseCase = makeCreateAppointmentUseCase();
    const createAppointmentRequest = makeCreateAppointmentRequest();

    expect(
      createAppointmentUseCase.execute(createAppointmentRequest),
    ).resolves.toBeInstanceOf(Appointment);
  });
});
