
import { UserPost } from '@/types/user';

export const MOCK_POSTS: UserPost[] = [
  {
    id: 'post-1',
    userId: 'user-1',
    userName: 'Jean Dupont',
    content: 'Magnifique coucher de soleil sur Santorin ! 🌅 Un moment inoubliable.',
    images: ['https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800'],
    createdAt: '2024-02-15T18:30:00Z',
    likes: 24,
    comments: 5,
  },
  {
    id: 'post-2',
    userId: 'user-1',
    userName: 'Jean Dupont',
    content: 'Qui serait partant pour un trek au Népal en octobre ? 🏔️',
    createdAt: '2024-02-10T10:00:00Z',
    likes: 12,
    comments: 8,
  },
  {
    id: 'post-3',
    userId: 'user-1',
    userName: 'Jean Dupont',
    content: 'Les temples de Kyoto sont absolument magnifiques. La culture japonaise est fascinante ! 🏯',
    images: ['https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800'],
    createdAt: '2024-02-05T14:20:00Z',
    likes: 31,
    comments: 7,
  },
];
