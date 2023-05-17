import { useStoreSelector } from '@/hooks/useStore';
import { HiChatBubbleBottomCenterText } from 'react-icons/hi2';

interface LoadListInner {
  item?: any;
  className?: string;
}

const LoadListInner = function ({
  item,
  className,
}: LoadListInner): JSX.Element {
  const { dark: isDark } = useStoreSelector((state) => state.dark);

  const styles = {
    innerBox: `w-full h-auto flex items-center relative text-center rounded-[13px] ${
      isDark
        ? 'bg-grayscale-deepdark text-white'
        : 'bg-grayscale-light text-black'
    }`,
    id: `py-[8px] px-3 w-1/12 ${
      isDark ? `text-grayscale-light` : `text-grayscale-deepdarkdeep`
    }`,

    latencyMean: `py-[8px] px-3 w-1/6 border-x-[1px] truncate ${
      isDark
        ? `text-grayscale-light border-grayscale-deepdarklight`
        : `text-grayscale-deepdarkdeep border-grayscale-deeplightlight`
    }`,
    duration: `py-[8px] px-3 w-1/6 border-x-[1px] truncate ${
      isDark
        ? `text-grayscale-light border-grayscale-deepdarklight`
        : `text-grayscale-deepdarkdeep border-grayscale-deeplightlight`
    }`,
    reqSec: `py-[8px] px-3 w-1/6 border-x-[1px] truncate ${
      isDark
        ? `text-grayscale-light border-grayscale-deepdarklight`
        : `text-grayscale-deepdarkdeep border-grayscale-deeplightlight`
    }`,
    throuthput: `py-[8px] px-3 w-1/6 border-x-[1px] truncate ${
      isDark
        ? `text-grayscale-light border-grayscale-deepdarklight`
        : `text-grayscale-deepdarkdeep border-grayscale-deeplightlight`
    }`,

    createdTime: `py-[8px] px-3 flex-1 w-1/6 min-w-0 truncate ${
      isDark ? `text-grayscale-light` : `text-grayscale-deepdarkdeep`
    }`,
    // desc: `py-[8px] px-3 flex-1 min-w-0 flex items-center gap-2 rounded-[13px] duration-[0.33s] absolute top-0 left-0 z-10 w-[140px] opacity-0 hover:w-full hover:opacity-100 ${
    //   isDark ? `bg-grayscale-deepdark` : `bg-grayscale-light`
    // } ${isDark ? `text-grayscale-light` : `text-grayscale-deepdarkdeep`}`,
    // descIcon: `text-normal ${
    //   isDark ? `text-grayscale-dark` : `text-grayscale-deeplightlight`
    // }`,
  };
  return (
    <>
      {item && (
        <div className="h-full w-full pr-2">
          <div className={`${styles['innerBox']} ${className}`}>
            <div className={`${styles['id']}`}>
              <div>{'id' in item ? item.id : item.name}</div>
              {/* <div className={`${styles['desc']}`}>
              <i>
                <HiChatBubbleBottomCenterText
                  className={`${styles['descIcon']}`}
                />
              </i>
              <p className={`truncate text-ellipsis`}>
                {'desc' in item ? item.desc : item.description}
              </p>
            </div> */}
            </div>
            <div className={`${styles['latencyMean']}`}>
              {'latencyMean' in item ? item.latencyMean : item.name}
            </div>
            <div className={`${styles['duration']}`}>
              {'duration' in item ? item.duration : item.name}
            </div>
            <div className={`${styles['reqSec']}`}>
              {'reqSec' in item ? item.reqSec : item.name}
            </div>
            <div className={`${styles['throuthput']}`}>
              {'throuthput' in item ? item.throuthput : item.name}
            </div>
            <div className={`${styles['createdTime']}`}>
              {'createdTime' in item ? item.createdTime : item.name}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoadListInner;
