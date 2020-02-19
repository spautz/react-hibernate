import * as React from 'react';
import { ReactElement } from 'react';

interface SampleFormProps {
  title: string;
}

let instanceCounter = 0;

const SampleForm: React.FC<SampleFormProps> = (props: SampleFormProps): ReactElement => {
  const { title } = props;

  // A simple per-Component instance counter
  const instanceNumRef = React.useRef(0);
  if (!instanceNumRef.current) {
    instanceCounter++;
    instanceNumRef.current = instanceCounter;
  }
  const instanceNum = instanceNumRef.current;

  const titleWithInstanceNum = `${title} (#${instanceNum})`;

  const mountTimeString = React.useRef(new Date().toUTCString()).current;
  const renderCount = ++React.useRef(0).current;

  React.useEffect((): (() => void) => {
    console.log(`SampleForm ${titleWithInstanceNum} mounted`);
    return (): void => console.log(`SampleForm ${titleWithInstanceNum} unmounted`);
  }, []);

  React.useEffect(() => {
    console.log(`SampleForm ${titleWithInstanceNum} rendered`);
  });

  const [value1, setValue1] = React.useState('');

  return (
    <fieldset>
      <legend>SampleForm: {titleWithInstanceNum}</legend>
      <p>
        Mounted at {mountTimeString}, rendered {renderCount} times.
      </p>
      <label>
        <p>Controlled input: value is in component state</p>
        <input
          name={`value1-${instanceNum}`}
          value={value1}
          onChange={(e): void => {
            setValue1(e.target.value);
          }}
        />
      </label>
      <label>
        <p>Plain input: value is in dom only</p>
        <input name={`value2-${instanceNum}`} />
      </label>
    </fieldset>
  );
};

export default SampleForm;
