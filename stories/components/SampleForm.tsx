import * as React from 'react';
import { ReactElement } from 'react';

interface SampleFormProps {
  title?: string;
}

let instanceCounter = 0;

const SampleForm: React.FC<SampleFormProps> = (props: SampleFormProps): ReactElement => {
  // A simple per-Component instance counter
  const instanceNumRef = React.useRef(0);
  if (!instanceNumRef.current) {
    instanceCounter++;
    instanceNumRef.current = instanceCounter;
  }
  const instanceNum = instanceNumRef.current;

  const { title = `#${instanceNum}` } = props;

  React.useEffect((): (() => void) => {
    console.log(`SampleForm ${title} mounted`);
    return (): void => console.log(`SampleForm ${title} unmounted`);
  }, []);

  React.useEffect(() => {
    console.log(`SampleForm ${title} rendered`);
  });

  const [value1, setValue1] = React.useState('');

  return (
    <fieldset>
      <legend>SampleForm: {title}</legend>
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
        <p>Plain input: value is in dom state only</p>
        <input name={`value2-${instanceNum}`} />
      </label>
    </fieldset>
  );
};

export default SampleForm;
