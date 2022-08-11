import { string } from 'prop-types';

interface stringObjType {
  [name: string]: string;
}

export const METAMASK_CODE_NAME: stringObjType = {
  '-32002': 'pending'
};

export const METAMASK_MESSAGE: stringObjType = {
  unavailable: '메타마스크를 설치해주세요.',
  pending: '이미 시도중인 연결이 있습니다. 메타마스크를 확인해주세요.'
};
