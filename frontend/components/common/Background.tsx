import { useStoreSelector } from '@/hooks/useStore';
import { PropsWithChildren } from 'react';

const Background = function ({ children }: PropsWithChildren) {
  const { dark } = useStoreSelector((state) => state.dark);
  return (
    <main
      className={`h-full w-full duration-[0.33s] ${
        dark
          ? 'bg-theme-dark-strong text-basic-white'
          : 'bg-[#efefef] text-basic-black'
      }`}
    >
      {children}
    </main>
  );
};

export default Background;