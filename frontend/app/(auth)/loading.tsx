import { FC } from "react";

interface LoadingProps {
  [key: string]: unknown;
}

const Loading: FC<LoadingProps> = () => {
  return <div>Loading...</div>;
};

export default Loading;
