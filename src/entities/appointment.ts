export interface AppointmentProps {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}

export class Appointment {
  private props: AppointmentProps;

  get customer(): string {
    return this.props.customer;
  }

  get startsAt(): Date {
    return this.props.startsAt;
  }

  get endsAt(): Date {
    return this.props.endsAt;
  }

  constructor(props: AppointmentProps) {
    if (props.startsAt <= new Date()) {
      throw new Error(`Invalid startsAt: ${props.endsAt}`);
    }

    if (props.endsAt <= props.startsAt) {
      throw new Error(`Invalid endsAt: ${props.endsAt}`);
    }
    this.props = props;
  }
}
