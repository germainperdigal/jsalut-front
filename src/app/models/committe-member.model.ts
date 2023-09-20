/** Committee member interface */
export interface CommitteMember {
  /** Id */
  _id: string;

  /** Label */
  label: string;

  /** Subtitle */
  subtitle: string;

  /** Description */
  description: string;

  /** File name */
  fileName?: string;
}
