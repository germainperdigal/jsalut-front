import { CommitteMember } from './committe-member.model';

/** Committee interface */
export interface Committe {
  /** Id */
  _id: string;

  /** Label */
  label: string;

  /** Order */
  order: number;

  members: CommitteMember[];
}
