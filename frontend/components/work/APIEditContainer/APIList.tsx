import APIlistItem from '@/components/apis/APIlistItem';
import { BsFolder, BsFolder2Open } from 'react-icons/bs';
import { AiOutlineMore } from 'react-icons/ai';
import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import { SpaceParams } from '@/pages/space';
import {
  SpaceApiList,
  useSectionsApi,
  useSpaceApis,
} from '@/hooks/queries/queries';
import { useUpdateCategory } from '@/hooks/queries/mutations';
import Modal from '@/components/common/Modal';
import AnimationBox from '@/components/common/AnimationBox';
import { Box, Button, Input } from '@/components/common';
import useInput from '@/hooks/useInput';

type APIListPropsType = {
  apiList: SpaceApiList;
  checkedIds?: (number | string)[];
  checkBox?: boolean;
  onToggleCheck?: (apiId: number | string, check: boolean) => void;
  selectedId?: number;
  setSelectedIdHandler?: (id: number) => void;
};

const APIList = function ({
  apiList = { apiCategories: [] },
  checkedIds = [],
  checkBox = false, // checkbox===true이면 -> figma화면이랑 api 연결중!
  onToggleCheck,
  selectedId,
  setSelectedIdHandler,
}: APIListPropsType): JSX.Element {
  const router = useRouter();
  const { spaceId } = router.query as SpaceParams;
  const [curCateIdx, setCurCateIdx] = useState<number>(0);
  const [isModal, setIsModal] = useState<boolean>(false);

  const closeModal = useCallback(function () {
    setIsModal(() => false);
  }, []);

  const openModal = useCallback(function () {
    setIsModal(() => true);
  }, []);

  const categoryRef = useRef<HTMLInputElement>(null);
  const {
    inputData: categoryInput,
    onChangeHandler: categoryChange,
    onResetHandler: categoryReset,
  } = useInput(categoryRef);

  const { data: spaceApiList, isLoading, isError } = useSpaceApis(spaceId);

  // const {data: sectionApiList} = useSectionsApi(spaceId, sectionId, selectedMethod, searchInputData)
  const { data: sectionApiList } = useSectionsApi(spaceId, 1);

  const onClickOpenCate = (cateID: string | number, cateIdx: number): void => {
    setCurCateIdx(cateIdx);
  };

  const { mutate, mutateAsync } = useUpdateCategory(parseInt(spaceId));

  const categoryUpdate = function (categoryId: number) {
    console.log(categoryInput);
    mutate({ categoryId: categoryId, categoryName: categoryInput });
    closeModal();
  };
  return (
    <>
      <ul
        className={`h-full w-full overflow-y-scroll scrollbar-hide flex flex-col items-center gap-3`}
      >
        {spaceApiList?.apiCategories?.map((cate, cateIdx) => (
          <>
            {isModal && (
              <Modal closeModal={closeModal} parentClasses="h-[50%] w-[50%]">
                <AnimationBox className="w-full h-full">
                  <Box className="flex flex-col gap-4 w-full h-full p-5 items-center justify-center">
                    <div className="text-[24px]">
                      카테고리 이름을 수정해주세요.
                    </div>
                    <div className="min-w-[220px]">
                      <Input
                        className="text-center"
                        type="text"
                        value={cate.categoryName}
                        inputref={categoryRef}
                        onChange={categoryChange}
                        placeholder="카테고리를 입력해 주세요"
                      />
                    </div>
                    <div className="flex gap-4">
                      <Button
                        className="flex items-center justify-center cursor-pointer text-center rounded-[8px]"
                        onClick={(e) => {
                          e.preventDefault();
                          categoryUpdate(cate.categoryId);
                        }}
                      >
                        생성
                      </Button>
                      <Button
                        className="cursor-pointer text-center rounded-[8px] border !border-red-500 !bg-red-500"
                        onClick={closeModal}
                      >
                        닫기
                      </Button>
                    </div>
                  </Box>
                </AnimationBox>
              </Modal>
            )}
            <li key={`${cate.categoryId}_${cateIdx}`} className={`w-full`}>
              {/* 카테고리 */}
              <div className={`mb-1 flex items-center gap-3`}>
                <div
                  className={`flex items-center gap-3 cursor-pointer`}
                  onClick={() => onClickOpenCate(cate.categoryId, cateIdx)}
                >
                  <i className={`text-[20px]`}>
                    {curCateIdx === cateIdx ? (
                      <BsFolder2Open />
                    ) : (
                      <BsFolder className={`mt-[2px]`} />
                    )}
                  </i>
                  <span>{cate.categoryName}</span>
                </div>
                <AiOutlineMore
                  className={`text-grayscale-dark hover:text-theme-white-strong`}
                  onClick={openModal}
                />
              </div>
              {/* api 목록 */}
              <ul
                className={`w-[90%] my-0 mx-auto flex flex-col items-center gap-1 duration-[0.33s] ${
                  curCateIdx === cateIdx ? '' : 'hidden'
                }`}
              >
                {cate?.apis?.map((api, apiIdx) => (
                  <APIlistItem
                    key={`${api.id}_${apiIdx}`}
                    checkBox={checkBox} // 체크박스 달고있는 list
                    checked={!!checkedIds.find((id) => id === api.id)}
                    item={api}
                    className={`w-full duration-[0.33s] hover:scale-[101%]`}
                    // checkedList={checkBox ? refinedCheckedList : undefined}
                    onToggleCheck={onToggleCheck}
                    setSelectedIdHandler={setSelectedIdHandler}
                  />
                ))}
              </ul>
            </li>
          </>
        ))}
      </ul>
    </>
  );
};

export default APIList;
