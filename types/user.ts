
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  memberSince: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
}

export interface UserPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  images?: string[];
  createdAt: string;
  likes: number;
  comments: number;
}

export interface UserRating {
  id: string;
  fromUserId: string;
  fromUserName: string;
  toUserId: string;
  rating: number;
  comment: string;
  tripId?: string;
  createdAt: string;
}

export interface GoodDeal {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  country: string;
  title: string;
  description: string;
  category: 'accommodation' | 'food' | 'transport' | 'activity' | 'other';
  createdAt: string;
  likes: number;
}
