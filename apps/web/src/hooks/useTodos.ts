import axios from 'axios';
import useSWR from 'swr';
import { Todo } from '../interfaces';

type Response = [
  Todo[],
  {
    isLoading: boolean;
    isError: boolean;
  }
];

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useTodos = (): Response => {
  const { data, error } = useSWR('/api/todos', fetcher);

  return [data, { isLoading: !error && !data, isError: error }];
};
