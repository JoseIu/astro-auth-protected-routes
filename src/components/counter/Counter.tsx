import { actions } from 'astro:actions';
import debounce from 'lodash.debounce';
import { useState } from 'react';

interface Props {
  userId: string;
  likes: number;
}

export const Counter = ({ userId, likes }: Props) => {
  const [userLikes, setUserLikes] = useState<number>(likes);
  const [likesIncrement, setLikesIncrement] = useState<number>(1);

  const likeUser = () => {
    setLikesIncrement(prev => prev + 1);
    setUserLikes(prev => prev + 1);

    debouncedUpdateLikes({ setLikesIncrement, setUserLikes, likesIncrement, userId });
  };

  return <button onClick={likeUser}>{userLikes}</button>;
};

type DebounceProps = {
  setLikesIncrement: React.Dispatch<React.SetStateAction<number>>;
  setUserLikes: React.Dispatch<React.SetStateAction<number>>;
  likesIncrement: number;
  userId: string;
};

const debouncedUpdateLikes = debounce(
  async ({ userId, setLikesIncrement, setUserLikes, likesIncrement }: DebounceProps) => {
    console.log('a');

    const { data, error } = await actions.updateUserLike({ userId, increment: likesIncrement });
    console.log({ data, error });
    if (error) return;

    setLikesIncrement(0);
  },
  1000
);
