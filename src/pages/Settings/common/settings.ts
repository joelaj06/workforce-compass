export const settingsTab = [
  { label: "Office Details", value: 0 },
  { label: "Office Timings", value: 1 },
  { label: "Leaves", value: 2 },
];

export interface Radius {
  id: number;
  radius: number;
  label: string;
}
export const locationRadiusLimit = [
  {
    id: 1,
    radius: 100,
    label: "100M",
  },
  {
    id: 2,
    radius: 200,
    label: "200M",
  },
  {
    id: 2,
    radius: 500,
    label: "500M",
  },
  {
    id: 2,
    radius: 10000,
    label: "1KM",
  },
];
