import { useEffect, useMemo, useState } from 'react';
import { FieldsType, HeadersType } from '../APIDocsContainer';
import ToggleableHeader from '../APIDocsContainer/ToggleableHeader';
import ApiReqItemInner from './ApiReqItemInner';
import { Controller, FieldArrayWithId, useFormContext } from 'react-hook-form';
import styles from './ReqItem.module.css';

type ReqtemPropsType = {
  fields: FieldArrayWithId[];
  formName: string;
  control?: any;
  name: string;
  item: HeadersType[] | FieldsType[];
};
const ApiReqItem = function ({
  fields,
  formName,
  name, // 그냥 이름
  item, // item
  control,
}: ReqtemPropsType): JSX.Element {
  const [isOpen, setisOpen] = useState<boolean>(true);
  const a = item?.length + 1;

  const Styles = {
    style: `${
      isOpen ? `${styles['act']} ${styles[`slide`]}` : `${styles[`slide`]}`
    }`,
  };

  const styles1 = {
    style: `${isOpen ? `h-[calc(${a}*43px)]` : 'h-[43px]'}`,
  };

  return (
    <div className={`${styles1[`style`]} w-full`}>
      <ToggleableHeader title={name} isOpen={isOpen} setIsOpen={setisOpen} />
      {/* {fields.map((iitem, idx) => {
        return <Controller 
          key={iitem.id}
          name={`${formName}.${idx}`}
          control={control}
          render={({field}) => {
            return <div
            key={item.key}
            className={`w-[87%] rounded-[13px] overflow-hidden mt-0 mb-3 mx-auto text-content ${
              isOpen ? '' : 'hidden'
            }`}
          >
            <ReqItemInner item={item} control={control} name={name} />
          </div>
          }}
        />
      })} */}
      <div className={`${Styles['style']}`}>
        {(item as HeadersType[] | FieldsType[])?.map((item, idx) => (
          <Controller
            key={`${Math.random()}`} // fields[idx].id
            name={`${formName}.${idx}`}
            control={control}
            render={({ field }) => {
              return (
                <div
                  key={`${item.keyName}-${item.type}`}
                  className={`w-[87%] rounded-[13px] overflow-hidden mt-0 mb-3 mx-auto text-content duration-[0.33s]`}
                >
                  <ApiReqItemInner
                    formName={`${formName}.${idx}`}
                    field={field}
                    item={item}
                    control={control}
                    name={name}
                  />
                </div>
              );
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ApiReqItem;
