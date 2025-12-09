import { Status } from './status.model';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: Status;
  startDate: Date | string;
  endDate: Date | string;
  teamMembers: string[];
  tasks: string[];
}
