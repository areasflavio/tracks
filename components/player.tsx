import {
  Box,
  ButtonGroup,
  Center,
  Flex,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import ReactHowler from 'react-howler';
import {
  MdOutlinePauseCircleFilled,
  MdOutlinePlayCircleFilled,
  MdOutlineRepeat,
  MdShuffle,
  MdSkipNext,
  MdSkipPrevious,
} from 'react-icons/md';
import { formatTime } from '../lib/formatters';
import { PlaylistSong, useStoreActions } from '../lib/store';

interface Props {
  activeSong: PlaylistSong;
  songs: PlaylistSong[];
}

export const Player = ({ activeSong, songs }: Props) => {
  const [playing, setPlaying] = useState(true);
  const [index, setIndex] = useState(
    songs.findIndex(s => s.id === activeSong?.id)
  );
  const [seek, setSeek] = useState(0.0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [duration, setDuration] = useState(0.0);

  const soundRef = useRef<ReactHowler>(null);
  const repeatRef = useRef(isRepeat);

  const { changeActiveSong } = useStoreActions(state => state);

  useEffect(() => {
    let timerId: number;

    if (playing && !isSeeking) {
      const f = () => {
        setSeek(soundRef.current.seek());
        timerId = requestAnimationFrame(f);
      };

      timerId = requestAnimationFrame(f);
      return () => cancelAnimationFrame(timerId);
    }

    cancelAnimationFrame(timerId);
  }, [playing, isSeeking]);

  useEffect(() => {
    changeActiveSong(songs[index]);
  }, [index, changeActiveSong, songs]);

  useEffect(() => {
    repeatRef.current = isRepeat;
  }, [isRepeat]);

  const setPlayState = (value: boolean) => {
    setPlaying(value);
  };

  const onShuffle = () => {
    setIsShuffle(state => !state);
  };

  const onRepeat = () => {
    setIsRepeat(state => !state);
  };

  const prevSong = () => {
    setIndex(state => {
      if (isRepeat) {
        setSeek(0);
        soundRef.current.seek(0);
        return state;
      }

      return state ? state - 1 : songs.length - 1;
    });
  };

  const nextSong = () => {
    setIndex(state => {
      if (isRepeat) {
        setSeek(0);
        soundRef.current.seek(0);
        return state;
      }

      if (isShuffle) {
        let next: number;

        do {
          next = Math.floor(Math.random() * songs.length);
        } while (next === state);

        return next;
      }

      return state === songs.length - 1 ? 0 : state + 1;
    });
  };

  const onEnd = () => {
    if (repeatRef.current) {
      setSeek(0);
      soundRef.current.seek(0);
    } else {
      nextSong();
    }
  };

  const onLoad = () => {
    const songDuration = soundRef.current.duration();
    setDuration(songDuration);
  };

  const onSeek = ([time]: number[]) => {
    setSeek(parseFloat(String(time)));
    soundRef.current.seek(time);
  };

  return (
    <Box>
      <Box>
        {activeSong && (
          <ReactHowler
            playing={playing}
            src={activeSong.url}
            ref={soundRef}
            onLoad={onLoad}
            onEnd={onEnd}
          />
        )}
      </Box>
      <Center color="gray.600">
        <ButtonGroup>
          <IconButton
            outline="none"
            variant="link"
            aria-label="shuffle"
            fontSize="24px"
            color={isShuffle ? 'white' : 'gray.600'}
            _hover={{ color: 'white' }}
            onClick={onShuffle}
            icon={<MdShuffle />}
          />
          <IconButton
            outline="none"
            variant="link"
            aria-label="previous"
            _hover={{ color: 'white' }}
            fontSize="24px"
            icon={<MdSkipPrevious />}
            onClick={prevSong}
          />
          {playing ? (
            <IconButton
              outline="none"
              variant="link"
              aria-label="pause"
              fontSize="40px"
              color="white"
              icon={<MdOutlinePauseCircleFilled />}
              onClick={() => setPlayState(false)}
            />
          ) : (
            <IconButton
              outline="none"
              variant="link"
              aria-label="play"
              fontSize="40px"
              color="white"
              icon={<MdOutlinePlayCircleFilled />}
              onClick={() => setPlayState(true)}
            />
          )}

          <IconButton
            outline="none"
            variant="link"
            aria-label="next"
            _hover={{ color: 'white' }}
            fontSize="24px"
            icon={<MdSkipNext />}
            onClick={nextSong}
          />
          <IconButton
            outline="none"
            variant="link"
            aria-label="repeat"
            _hover={{ color: 'white' }}
            fontSize="24px"
            color={isRepeat ? 'white' : 'gray.600'}
            onClick={onRepeat}
            icon={<MdOutlineRepeat />}
          />
        </ButtonGroup>
      </Center>

      <Box color="gray.600">
        <Flex justify="center" align="center">
          <Box width="10%">
            <Text fontSize="xs">{formatTime(seek)}</Text>
          </Box>
          <Box width="80%">
            <RangeSlider
              aria-label={['min', 'max']}
              id="player-range"
              step={0.1}
              min={0}
              max={duration ? (duration.toFixed(2) as unknown as number) : 0}
              onChange={onSeek}
              value={[seek]}
              onChangeStart={() => setIsSeeking(true)}
              onChangeEnd={() => setIsSeeking(false)}
            >
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.600" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width="10%" textAlign="right">
            <Text fontSize="xs">{formatTime(duration)}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
