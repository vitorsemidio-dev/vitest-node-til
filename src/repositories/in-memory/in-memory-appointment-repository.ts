import { areIntervalsOverlapping } from "date-fns";

import { Appointment } from "../../entities/appointment";
import { AppointmentsRepositoryProtocol } from "../appointments-repository-protocol";

export class InMemoryAppointmentsRepository
  implements AppointmentsRepositoryProtocol
{
  public items: Appointment[] = [];
  async create(appointment: Appointment): Promise<Appointment> {
    this.items.push(appointment);
    return appointment;
  }

  async findOverlappingAppointment(
    startsAt: Date,
    endsAt: Date,
  ): Promise<Appointment | null> {
    const overlappingAppointment = this.items.find((appointment) => {
      return areIntervalsOverlapping(
        { start: startsAt, end: endsAt },
        { start: appointment.startsAt, end: appointment.endsAt },
        { inclusive: true },
      );
    });
    return overlappingAppointment || null;
  }
}
