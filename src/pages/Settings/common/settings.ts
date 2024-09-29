export const settingsTab = [
  { label: "Office Details", value: 0 },
  // { label: "Office Timings", value: 1 },
  // { label: "Leaves", value: 2 },
];

export interface ISettings {
  organization: IOrganization;
}

export interface IOrganization {
  location: ILocation;
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
  location?: ILocation;
  address?: string;
}

export interface ILocation {
  long: number;
  lat: number;
  address: string;
  radius?: number;
}

export interface Radius {
  id: number;
  radius: number;
  label: string;
}
export const locationRadiusLimit = [
  {
    id: 1,
    radius: 10,
    label: "10M",
  },
  {
    id: 2,
    radius: 20,
    label: "20M",
  },
  {
    id: 3,
    radius: 30,
    label: "30M",
  },
  {
    id: 4,
    radius: 50,
    label: "50M",
  },
  {
    id: 5,
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
