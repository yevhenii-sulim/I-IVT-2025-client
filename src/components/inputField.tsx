import {
  Field,
  useFormikContext,
  type FormikErrors,
  type FormikTouched,
} from 'formik';
import clsx from 'clsx';
import {useState} from 'react';

type InputFieldProps<T extends Record<string, any>> = {
  label: string;
  field: string;
  type: string;
  errors: FormikErrors<T>;
  touched: FormikTouched<T>;

  wrapperClass?: string;
  labelClass?: string;
  baseClass?: string;
  successClass?: string;
  errorClass?: string;
  errorTextClass?: string;
};

export function InputField<T extends Record<string, any>>({
  label,
  field,
  type,
  errors,
  touched,

  wrapperClass = 'flex flex-col relative',
  labelClass = 'capitalize absolute -top-6 left-2 transition-all duration-250 text-[#191930]',
  baseClass = 'border rounded-lg py-2 px-4 outline-none focus:bg-green-100/10',
  successClass = 'border-[#191930]',
  errorClass = 'border-red-500',
  errorTextClass = 'text-normal text-red-900 mt-1',
}: InputFieldProps<T>) {
  const {values} = useFormikContext<any>();
  const [isFocus, setIsFocus] = useState(false);
  const hasError = Boolean(touched[field] && errors[field]);

  const isFilled = String(values[field] || '').trim().length > 0;

  const isActive = isFilled || isFocus;

  const labelActiveStyle: React.CSSProperties = {
    top: '50%',
    transform: 'translateY(-50%)',
  };

  return (
    <div className={wrapperClass}>
      <div className='flex flex-col relative'>
        <label
          htmlFor={String(field)}
          className={labelClass}
          style={!isActive ? labelActiveStyle : undefined}
        >
          {label}
        </label>

        <Field
          id={String(field)}
          name={String(field)}
          type={type}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          value={values[field] ?? ''}
          className={clsx(baseClass, hasError ? errorClass : successClass)}
        />
      </div>

      {hasError && <p className={errorTextClass}>{String(errors[field])}</p>}
    </div>
  );
}
