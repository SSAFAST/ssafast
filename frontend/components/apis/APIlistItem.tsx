import { useEffect, useMemo, useState } from 'react';
import CheckBox from '../common/CheckBox';
import UserBadge from '../common/UserBadge';
import {
  APIInfoType,
  APIListType,
  APIWritterType,
} from '../work/APIEditContainer/APIList';
import MethodBadge, { MethodBadgePropsType } from './MethodBadge';
import StatusBadge, { StatusBadgePropsType } from './StatusBadge';
import { apiType, useSectionsApi, useSpaceApis } from '@/hooks/queries/queries';
import { useRouter } from 'next/router';
import { SpaceParams } from '@/pages/space';

interface APIlistItemPropsType {
  item: apiType;
  className?: string;
  writter?: boolean;
  checkBox?: boolean;
  checked?: boolean;
  // checkedList?: (string | number)[];
  onToggleCheck?: (apiId: number | string, check: boolean) => void;
}

const APIlistItem = function ({
  item,
  className,
  writter = true,
  checkBox = false,
  checked = false,
  onToggleCheck,
}: APIlistItemPropsType): JSX.Element {
  const router = useRouter();
  const { spaceId } = router.query as SpaceParams;

  const onClickApiItem = (apiID: string | number): void => {
    if (!checkBox) {
      console.log(`${apiID}번 api : api 하나 dispatch!??`);
    }
  };
  // const { data: spaceApiList, isLoading, isError } = useSpaceApis(spaceId);
  // section Id 받아야함.
  // const {} = useSectionsApi(spaceId, sectionId, method, searchVal);

  const onClickCheckBox = () => {
    checked = !checked;
    if (checkBox && onToggleCheck) {
      // console.log('!!!!!!!!!!!!!!!!', checked);
      onToggleCheck(item.id, checked);
    }
  };

  return (
    <li
      onClick={onClickApiItem && (() => onClickApiItem(item.id))}
      className={`${className} flex items-center gap-3 h-[40px] min-h-[40px]`}
    >
      {checkBox && (
        <CheckBox isChecked={checked} onToggleCheck={onClickCheckBox} />
      )}
      <MethodBadge className="" method={item.method} />
      <p className="text-content flex-1 truncate hover:text-clip">
        {item.name}
      </p>
      <StatusBadge className="w-[70px] text-center" status={item.status} />
      {writter && <UserBadge />}
    </li>
  );
};

export default APIlistItem;
