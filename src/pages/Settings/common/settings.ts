export const settingsTab = [
  { label: "Office Details", value: 0 },
  // { label: "Office Timings", value: 1 },
  // { label: "Leaves", value: 2 },
];

export interface IOrganization {
  location: Location;
  _id: string;
  name: string;
  description: string;
  code: string;
  arrival_time: string;
  departure_time: string;
  motto: string;
  logo?: string;
  radius: Radius;
  note?: string;
  address?: string;
}

export interface IOrganizationRequestPayload {
  _id: string;
  name?: string;
  description?: string;
  note?: string;
  arrival_time?: string;
  departure_time?: string;
  motto?: string;
  logo?: string;
  radius?: Radius;
  address?: string;
}

export interface ILocation {
  long: string;
  lat: string;
}

export interface Radius {
  id: number;
  radius: number;
  label: string;
}
export const locationRadiusLimit = [
  {
    id: 1,
    radius: 50,
    label: "50M",
  },
  {
    id: 2,
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
];
