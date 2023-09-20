/** User interface */
export interface User {
  /** Id */
  _id?: string;

  /** Role */
  role: string;

  /** Club name */
  clubName: string;

  /** Phone number */
  phoneNumber: string;

  /** Created at */
  createdAt?: string;

  /** City */
  city?: string;

  /** Password */
  password: string;

  /** Email */
  emailAddress: string;

  /** Applications */
  applications?: any;
}
