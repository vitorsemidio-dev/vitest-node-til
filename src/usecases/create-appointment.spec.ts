import { describe, expect, it } from "vitest";

import { Appointment } from "../entities/appointment";
import { getFutureDate } from "../tests/utils/get-future-date";
import { InMemoryAppointmentsRepository } from "./../repositories/in-memory/in-memory-appointment-repository";
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

const makeSut = () => {
  const inMemoryAppointmentsRepository = new InMemoryAppointmentsRepository();
  const createAppointmentUseCase = new CreateAppointmentUseCase(
    inMemoryAppointmentsRepository,
  );
  return { createAppointmentUseCase, inMemoryAppointmentsRepository };
};

describe("Create Appointment Use Case", () => {
  it("should be able to create an Appointment", async () => {
    const { createAppointmentUseCase } = makeSut();
    const createAppointmentRequest = makeCreateAppointmentRequest();

    await expect(
      createAppointmentUseCase.execute(createAppointmentRequest),
    ).resolves.toBeInstanceOf(Appointment);
  });

  it("should not be able to create an Appointment with overlapping dates", async () => {
    const { createAppointmentUseCase } = makeSut();
    const customer = "John Doe";
    const startsAt = getFutureDate("2022-10-10");
    const endsAt = getFutureDate("2022-10-15");

    await createAppointmentUseCase.execute({
      customer,
      startsAt,
      endsAt,
    });

    await expect(
      createAppointmentUseCase.execute({
        customer,
        startsAt: getFutureDate("2022-10-14"),
        endsAt: getFutureDate("2022-10-18"),
      }),
    ).rejects.toBeInstanceOf(Error);

    await expect(
      createAppointmentUseCase.execute({
        customer,
        startsAt: getFutureDate("2022-10-08"),
        endsAt: getFutureDate("2022-10-14"),
      }),
    ).rejects.toBeInstanceOf(Error);

    await expect(
      createAppointmentUseCase.execute({
        customer,
        startsAt: getFutureDate("2022-10-12"),
        endsAt: getFutureDate("2022-10-14"),
      }),
    ).rejects.toBeInstanceOf(Error);

    await expect(
      createAppointmentUseCase.execute({
        customer,
        startsAt: getFutureDate("2022-10-05"),
        endsAt: getFutureDate("2022-10-20"),
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
