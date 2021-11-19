import { DieType } from '../types/types';

type Props = {
  die: DieType,
  holdDice: () => void,
};

export const Die = (props: Props) => {
  const { isHeld, value } = props.die;

  const styles = {
    backgroundColor: isHeld ? '#59E391' : 'white',
  };

  return (
    <button
      type="button"
      className="die-face"
      style={styles}
      onClick={props.holdDice}
    >
      <h2 className="die-num">{value}</h2>
    </button>
  );
};
