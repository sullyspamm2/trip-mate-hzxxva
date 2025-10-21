
import { User } from '@/types/user';

export const CURRENT_USER: User = {
  id: 'user-1',
  name: 'Jean Dupont',
  email: 'jean.dupont@example.com',
  bio: 'Passionné de voyages et de découvertes. Toujours prêt pour une nouvelle aventure ! 🌍✈️',
  location: 'Paris, France',
  memberSince: '2024-01-01',
  verified: true,
  rating: 4.8,
  reviewCount: 12,
};

export const MOCK_USERS: User[] = [
  CURRENT_USER,
  {
    id: 'user-2',
    name: 'Sophie Martin',
    email: 'sophie.martin@example.com',
    bio: 'Photographe voyageuse',
    location: 'Lyon, France',
    memberSince: '2023-11-15',
    verified: true,
    rating: 4.9,
    reviewCount: 18,
  },
  {
    id: 'user-3',
    name: 'Thomas Dubois',
    email: 'thomas.dubois@example.com',
    bio: 'Amateur de culture et gastronomie',
    location: 'Bordeaux, France',
    memberSince: '2023-12-01',
    verified: true,
    rating: 4.7,
    reviewCount: 9,
  },
];
