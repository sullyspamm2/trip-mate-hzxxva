
export interface TravelProject {
  id: string;
  title: string;
  description: string;
  countries: string[];
  startDate?: string;
  endDate?: string;
  budget?: string;
  travelersNeeded: number;
  authorName: string;
  authorAvatar?: string;
  createdAt: string;
  tags?: string[];
}

export interface Country {
  code: string;
  name: string;
  flag: string;
}
