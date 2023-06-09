import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import {
  MouseEvent,
  PointerEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { RoomProvider, useOthers, useUpdatePresence } from '@y-presence/react';
import { useRouter } from 'next/router';
import { SpaceParams } from '..';
import apiRequest from '@/utils/axios';
import { WebrtcProvider } from 'y-webrtc';
import { getYjsDoc, getYjsValue, syncedStore } from '@syncedstore/core';
import WorkContainer from '@/components/work/WorkContainer';
import { useSyncedStore } from '@syncedstore/react';
import { PresenceUserData, workFigma } from '@/components/work/presence-type';
import MetaHead from '@/components/common/MetaHead';
import {
  SpaceFigma,
  useBaseUrl,
  useSpaceDetail,
  useSpaceFrames,
  useUserData,
  useUserFigmaTokens,
} from '@/hooks/queries/queries';
// import { yjsStore } from '@/utils/syncedStore';
import YjsProvider, { useYjsState } from '@/components/work/YjsProvider';
import { Awareness } from '@y-presence/client';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { useMutation } from '@tanstack/react-query';

export interface RTCSpaceData {
  figmaList: workFigma[];
  dtoList: any[];
  apiList: any[];
  SectionApiList: any[];
  useCaseList: any[];
  overloadList: any[];
  baseUrlList: string[];
}

const SpaceWorkPage = function (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();
  const spaceId = props.spaceId;
  let { state, doc, figmaY } = useYjsState();

  const { data: userFigmaTokenData } = useUserFigmaTokens();
  const { data: spaceDetailData } = useSpaceDetail(parseInt(spaceId));
  const {
    data: spaceFrameData,
    isLoading: spaceFrameDataLoading,
    isError: spaceFrameDataError,
  } = useSpaceFrames(parseInt(spaceId));
  const { data: baseUrls } = useBaseUrl(parseInt(spaceId));

  const { data: userData, isLoading } = useUserData();
  const store = useSyncedStore(state);
  const [awareness, setAwareness] = useState<Awareness>();
  useEffect(
    function () {
      let provider: WebrtcProvider;
      if (state && spaceId?.length) {
        provider = new WebrtcProvider(
          `ssafast${spaceId}`,
          getYjsDoc(state) as any,
          {
            signaling: [
              // `ws://localhost:4444`,
              // `wss://localhost:4444`,
              `wss://www.ssafast.com/ws`,
              // `wss://0.0.0.0:4444`,
              // `wss://www.ssafast.com:4444`,
              // `ws://www.ssafast.com:4444`,
              // 'wss://signaling.yjs.dev',
              // 'wss://y-webrtc-signaling-eu.herokuapp.com',
              // 'wss://y-webrtc-signaling-us.herokuapp.com',
            ], //`ws://www.ssafast.com:4444`
            filterBcConns: true,
          }
        );
        provider.connect();

        console.log('커넥트', provider.signalingConns);
        console.log('쌩 provider', provider);
        console.log('어웨어니스', provider.awareness);
        const { awareness: innerAwareness } = provider;
        setAwareness(innerAwareness);
      }

      return function () {
        console.log('디스커넥트');
        provider.disconnect();
      };
    },
    [state, spaceId]
  );

  useEffect(
    function () {
      if (!awareness && spaceFrameDataLoading) {
        return;
      }
      if (!figmaY.length && spaceFrameData) {
        figmaY.push([...spaceFrameData.figmaSections]);
      }
    },
    [awareness, spaceFrameData, baseUrls]
  );

  return (
    <>
      <MetaHead
        title={`SSAFAST: 작업 공간`}
        description={`SSAFAST: 작업하는 공간입니다.`}
        url={`/space/${spaceId}/work`}
      />
      <div className="h-full w-full overflow-hidden">
        <YjsProvider>
          {awareness && userData && (
            <RoomProvider<PresenceUserData>
              key={`RoomProvider`}
              awareness={awareness}
              initialPresence={{
                name: `${userData?.name || `나다이띱때끼야`}`,
                color: `#${Math.round(Math.random() * 0xffffff).toString(16)}`,
                step: 1,
                img: userData?.profileImg,
              }}
            >
              <WorkContainer store={state} />
            </RoomProvider>
          )}
        </YjsProvider>
      </div>
    </>
  );
};

export default SpaceWorkPage;

export const getServerSideProps: GetServerSideProps = async function (context) {
  const { spaceId } = context.params as SpaceParams;
  return {
    props: {
      spaceId: spaceId,
    },
  };
};
