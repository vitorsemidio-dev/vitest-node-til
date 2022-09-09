import { Appointment } from "../entities/appointment";

export interface AppointmentsRepositoryProtocol {
  create(appointment: Appointment): Promise<Appointment>;
  findOverlappingAppointment(
    startsAt: Date,
    endsAt: Date,
  ): Promise<Appointment | null>;
}
