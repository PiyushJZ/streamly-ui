import { useId, useMemo, useState } from 'react';
import { CheckIcon, EyeIcon, EyeOffIcon, XIcon } from 'lucide-react';

import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';

interface PasswordProps {
  showStrength?: boolean;
}

export default function Component({ showStrength }: PasswordProps) {
  const id = useId();
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { t } = useTranslation('auth');

  const toggleVisibility = () => setIsVisible(prevState => !prevState);

  const checkStrength = (pass: string) => {
    const requirements = [
      { regex: /.{8,}/, text: t('minimumLength') },
      { regex: /[0-9]/, text: t('minimumNumber') },
      { regex: /[a-z]/, text: t('minimumLower') },
      { regex: /[A-Z]/, text: t('minimumUpper') },
      { regex: /[~!@#$%^&*\-+_=,.<>/?]/, text: t('minimumSymbol') },
    ];

    return requirements.map(req => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const strength = checkStrength(password);

  const strengthScore = useMemo(() => {
    return strength.filter(req => req.met).length;
  }, [strength]);

  const getStrengthColor = (score: number) => {
    if (score === 0) return 'bg-zinc-200 dark:bg-zinc-800';
    if (score <= 1) return 'bg-red-500';
    if (score <= 3) return 'bg-orange-500';
    if (score === 4) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  const getStrengthText = (score: number) => {
    if (score === 0) return t('enterPassword');
    if (score <= 3) return t('weakPassword');
    if (score === 4) return t('mediumPassword');
    return t('strongPassword');
  };

  return (
    <div>
      {/* Password input field with toggle visibility button */}
      <div className='*:not-first:mt-2'>
        <div className='relative'>
          <Input
            id={id}
            className='pe-9'
            placeholder='Password'
            type={isVisible ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            aria-describedby={`${id}-description`}
          />
          <button
            className='absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-zinc-500/80 outline-none transition-[color,box-shadow] hover:text-zinc-950 focus:z-10 focus-visible:border-zinc-950 focus-visible:ring-[3px] focus-visible:ring-zinc-950/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:text-zinc-400/80 dark:hover:text-zinc-50 dark:focus-visible:border-zinc-300 dark:focus-visible:ring-zinc-300/50'
            type='button'
            onClick={toggleVisibility}
            aria-label={isVisible ? 'Hide password' : 'Show password'}
            aria-pressed={isVisible}
            aria-controls='password'
          >
            {isVisible ? (
              <EyeOffIcon
                size={16}
                aria-hidden='true'
              />
            ) : (
              <EyeIcon
                size={16}
                aria-hidden='true'
              />
            )}
          </button>
        </div>
      </div>
      {showStrength ? (
        <>
          {/* Password strength indicator */}
          <div
            className='mb-4 mt-3 h-1 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800'
            role='progressbar'
            aria-valuenow={strengthScore}
            aria-valuemin={0}
            aria-valuemax={5}
            aria-label='Password strength'
          >
            <div
              className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
              style={{ width: `${(strengthScore / 5) * 100}%` }}
            ></div>
          </div>

          {/* Password strength description */}
          <p
            id={`${id}-description`}
            className='mb-2 text-sm font-medium text-zinc-950 dark:text-zinc-50'
          >
            {getStrengthText(strengthScore)}. Must contain:
          </p>

          {/* Password requirements list */}
          <ul
            className='space-y-1.5'
            aria-label='Password requirements'
          >
            {strength.map((req, index) => (
              <li
                key={index}
                className='flex items-center gap-2'
              >
                {req.met ? (
                  <CheckIcon
                    size={16}
                    className='text-emerald-500'
                    aria-hidden='true'
                  />
                ) : (
                  <XIcon
                    size={16}
                    className='text-zinc-500/80 dark:text-zinc-400/80'
                    aria-hidden='true'
                  />
                )}
                <span
                  className={`text-xs ${req.met ? 'text-emerald-600' : 'text-zinc-500 dark:text-zinc-400'}`}
                >
                  {req.text}
                  <span className='sr-only'>
                    {req.met ? '- Requirement met' : '- Requirement not met'}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
