
export interface TravelProject {
  id: string;
  title: string;
  description: string;
  countries: string[];
  startDate?: string;
  endDate?: string;
  budget?: string;
  travelersNeeded: number;
  acceptedTravelers: string[]; // Array of user IDs
  authorId: string;
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

export interface CoTravelRequest {
  id: string;
  projectId: string;
  projectTitle: string;
  requesterId: string;
  requesterName: string;
  requesterAvatar?: string;
  requesterRating: number;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface CoChat {
  id: string;
  projectId: string;
  projectTitle: string;
  participants: string[]; // Array of user IDs
  participantNames: string[];
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  message: string;
  createdAt: string;
}
