
import { UserRating } from '@/types/user';

export const MOCK_RATINGS: UserRating[] = [
  {
    id: 'rating-1',
    fromUserId: 'user-2',
    fromUserName: 'Sophie Martin',
    toUserId: 'user-1',
    rating: 5,
    comment: 'Excellent compagnon de voyage ! Très organisé et toujours de bonne humeur.',
    createdAt: '2024-01-20T10:00:00Z',
  },
  {
    id: 'rating-2',
    fromUserId: 'user-3',
    fromUserName: 'Thomas Dubois',
    toUserId: 'user-1',
    rating: 5,
    comment: 'Super expérience au Japon avec Jean. Je recommande vivement !',
    createdAt: '2024-01-15T14:30:00Z',
  },
  {
    id: 'rating-3',
    fromUserId: 'user-4',
    fromUserName: 'Marie Leroy',
    toUserId: 'user-1',
    rating: 4,
    comment: 'Très bon voyage ensemble. Quelques petits désaccords mais rien de grave.',
    createdAt: '2024-01-10T09:15:00Z',
  },
];
