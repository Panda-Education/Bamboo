import { atomWithStorage } from 'jotai/utils';
import { store } from '@/jotai/store';


export const JwtAtomSerialised = atomWithStorage('JWT-TOKEN', "",)
