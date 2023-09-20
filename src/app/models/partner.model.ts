/** Partner interface */
export interface Partner {
  _id?: string;
  label: string;
  shortDescription: string;
  description: string;
  website?: string;
  fileName?: string;
  smallFileName?: string;
  isActive: boolean;
}
