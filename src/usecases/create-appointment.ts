import { AppointmentsRepositoryProtocol } from "./../repositories/appointments-repository-protocol";
import { Appointment } from "../entities/appointment";

interface CreateAppointmentRequest {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}

type CreateAppointmentResponse = Appointment;

export class CreateAppointmentUseCase {
  constructor(private appointmentsRepository: AppointmentsRepositoryProtocol) {}

  async execute({
    customer,
    endsAt,
    startsAt,
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const appointmentOverlapping =
      await this.appointmentsRepository.findOverlappingAppointment(
        startsAt,
        endsAt,
      );

    if (appointmentOverlapping) {
      throw new Error(`Another appointment overlaps this appointment dates`);
    }

    const appointment = new Appointment({
      customer,
      endsAt,
      startsAt,
    });

    await this.appointmentsRepository.create(appointment);

    return appointment;
  }
}
