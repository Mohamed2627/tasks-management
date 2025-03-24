import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { StyledInput, InputProps } from './StyledInput';


type ControlledInputProps<T extends FieldValues> = InputProps & {
  control: Control<T>;
  name: Path<T>;
};

const ControlledInput = <T extends FieldValues>({
  control,
  name,
  ...props
}: ControlledInputProps<T>) => {

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <StyledInput
          {...field}
          {...props}
          error={error?.message}
        />
      )}
    />
  );
};

export { ControlledInput };