import { atom } from 'jotai';

const editModal = atom(false);
const followAtom = atom(false);
const followerAtom = atom(false);
const imageAtom = atom(false);
const likeAtom = atom(false);

export { editModal, followAtom, followerAtom, imageAtom, likeAtom };
