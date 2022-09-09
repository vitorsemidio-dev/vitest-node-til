import { describe, expect, it } from "vitest";

import { Appointment } from "../entities/appointment";
import { getFutureDate } from "../tests/utils/get-future-date";
import { CreateAppointmentUseCase } from "./create-appointment";

const makeCreateAppointmentRequest = () => {
  const startsAt = getFutureDate("2022-10-10");
  const endsAt = getFutureDate("2022-10-11");

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
