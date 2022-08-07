import { Artist, Song } from '@prisma/client';
import {
  Action,
  action,
  createStore,
  createTypedHooks,
  StoreProvider as EasyPeasyStoreProvider,
} from 'easy-peasy';

export type PlaylistSong = Song & {
  artist: Pick<Artist, 'id' | 'name'>;
};

export interface StoreModel {
  activeSongs: PlaylistSong[];
  activeSong: PlaylistSong;
  changeActiveSongs: Action<StoreModel, PlaylistSong[]>;
  changeActiveSong: Action<StoreModel, PlaylistSong>;
}

export const store = createStore<StoreModel>({
  activeSongs: [],
  activeSong: null,
  changeActiveSongs: action((state, payload) => {
    state.activeSongs = payload;
  }),
  changeActiveSong: action((state, payload) => {
    state.activeSong = payload;
  }),
});

const typedHooks = createTypedHooks<StoreModel>();

export const { useStoreActions, useStoreDispatch, useStoreState } = typedHooks;

const StoreProviderOverride = EasyPeasyStoreProvider as any;

export const StoreProvider = ({ children }) => {
  return (
    <StoreProviderOverride store={store}>{children}</StoreProviderOverride>
  );
};
