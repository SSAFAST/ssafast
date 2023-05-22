import { ApiDetailAtTestItem } from '@/hooks/queries/queries';
import { useContext, useEffect, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { UCContext, UCContextInterface } from '.';
import { Box, Input } from '@/components/common';
import { useStoreSelector } from '@/hooks/useStore';
import { HiChatBubbleBottomCenterText } from 'react-icons/hi2';

const typeList = [
  '',
  'String',
  'Integer',
  'Long',
  'Float',
  'Double',
  'Boolean',
  'MultipartFile',
  'Date',
  'LocalDateTime',
];

type UCResInnerPropsType = {
  item: ApiDetailAtTestItem;
  //   control: Control<UsecaseDetailType, any>;
  control?: any;
  formName: string;
  depth?: number;
  className?: string;
};

const UCResItemInner = function ({
  item,
  control,
  formName,
  depth = 0,
  className,
}: UCResInnerPropsType): JSX.Element {
  const { dark: isDark } = useStoreSelector((state) => state.dark);
  const {
    contextFormName,
    setContextFormName,
    contextResName,
    setContextResName,
    contextMapped,
    setContextMapped,
  } = useContext<UCContextInterface>(UCContext);
  const [mappedFormName, setMappedFormName] = useState<string>();
  const [mapped, setMapped] = useState<boolean>(false);

  const onClickResItem = (): void => {
    // console.log('안뿡');
    if (contextFormName) {
      // setMappedFormName(contextFormName);
      setContextResName(formName);
      // console.log('뿡!', formName);
    }
  };
  // console.log('req에 mapped된 formname은요', contextFormName);

  // useEffect(() => {
  //   if (!contextMapped) {
  //     setContextResName(null);
  //     console.log('contextResName 널됨');
  //   }
  // }, [contextMapped]);

  const styles = {
    innerBox: `w-full h-auto flex items-center overflow-hidden rounded-[13px] relative ${
      depth === 0
        ? isDark
          ? 'bg-grayscale-deepdark text-white'
          : 'bg-grayscale-light text-black'
        : depth === 1
        ? isDark
          ? 'bg-grayscale-deepdarkdeep'
          : 'bg-grayscale-deeplight'
        : isDark
        ? 'bg-grayscale-deepdarkdeepdeep'
        : 'bg-grayscale-dark'
    }`,
    key: `py-[8px] px-3 ${
      isDark ? `text-grayscale-light` : `text-grayscale-deepdarkdeep`
    } ${
      'w-[50%]'
      // depth === 0
      //   ? 'w-[50%]'
      //   : depth === 1
      //   ? 'w-[calc(150px-(100%-95%)/2-0.5px)]'
      //   : 'w-[calc(150px-(100%-95%)-2px)]'
    }`,
    type: `py-[8px] px-3 w-[50%] border-x-[1px] ${
      isDark
        ? `text-grayscale-light border-grayscale-deepdarklight`
        : `text-grayscale-deepdarkdeep border-grayscale-deeplightlight`
    }`,
    desc: `py-[8px] px-3 flex-1 min-w-0 flex items-center gap-2 rounded-[13px] duration-[0.33s] absolute top-0 left-0 z-10 w-[140px] opacity-0 hover:w-full hover:opacity-100 ${
      depth === 0
        ? isDark
          ? `bg-grayscale-deepdark`
          : `bg-grayscale-light`
        : depth === 1
        ? isDark
          ? `bg-grayscale-deepdarkdeep`
          : `bg-grayscale-deeplight`
        : isDark
        ? 'bg-grayscale-deepdarkdeepdeep'
        : 'bg-grayscale-dark'
    } ${isDark ? `text-grayscale-light` : `text-grayscale-deepdarkdeep`}`,
    descIcon: `text-normal ${
      isDark ? `text-grayscale-dark` : `text-grayscale-deeplightlight`
    }`,
    value: `py-[8px] px-3 flex-1 min-w-0 ${
      isDark ? `text-grayscale-light` : `text-grayscale-deepdarkdeep`
    }`,
  };

  return (
    <>
      <div
        onClick={onClickResItem}
        className={`${styles['innerBox']} ${className} flex gap-3 cursor-pointer active:bg-grayscale-deepdarkdeep`}
      >
        <div className={`${styles['key']}`}>
          <div>{item.keyName}</div>
          <div className={`${styles['desc']} active:bg-grayscale-deepdarkdeep`}>
            <i>
              <HiChatBubbleBottomCenterText
                className={`${styles['descIcon']}`}
              />
            </i>
            <p className={`truncate text-ellipsis`}>{item.desc}</p>
          </div>
        </div>
        <div className={`${styles['type']}`}>
          {typeList[item.type as number]}
        </div>
        {/* <div className={`${styles['desc']}`}>{item.desc}</div> */}
      </div>
      {mapped && (
        <Input
          // name={`${mappedFormName}.value`}
          // value={field.value}
          // onChange={field.onChange}
          className={`w-full`}
          placeholder="value"
          type="hidden"
        />
        // <Controller
        //   name={`${mappedFormName}.value`}
        //   control={control}
        //   defaultValue={formName}
        //   render={({ field, fieldState }) => {
        //     return (

        //     );
        //   }}
        // />
      )}
    </>
  );
};

export default UCResItemInner;
