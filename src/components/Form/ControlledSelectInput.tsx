import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { StyledSelectInput, TSelectProps } from './StyledSelectInput';

type ControlledSelectProps<T extends FieldValues> = TSelectProps & {
  control: Control<T>;
  name: Path<T>;
};

const ControlledSelectInput = <T extends FieldValues>({
  control,
  name,
  ...props
}: ControlledSelectProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <StyledSelectInput
          {...field}
          {...props}
          error={error?.message}
          value={field.value ?? ''}
        />
      )}
    />
  );
};

export { ControlledSelectInput };