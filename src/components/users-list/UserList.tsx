import { actions } from 'astro:actions';
import { useEffect, useState, useTransition } from 'react';
import type { User } from '../../interfaces/users.interface';
import { Counter } from '../counter/Counter';
import './user.css';

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isPending, startTransition] = useTransition();
  console.log({ isPending });
  useEffect(() => {
    const getUsers = async () => {
      const { data, error } = await actions.getUsersAction();

      if (error) return;

      setUsers(data);
    };

    startTransition(async () => {
      await getUsers();
    });
  }, [setUsers, useTransition]);

  if (isPending) return <div>Loading...</div>;
  return (
    <div className="users">
      {users.map(user => (
        <article key={user.id} className="user">
          <h2>{user.name}</h2>
          <Counter userId={user.id} likes={user.likes} />
        </article>
      ))}
    </div>
  );
};
