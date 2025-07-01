import { Link } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import PasswordComponent from './password';
import type { z } from 'zod';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField as ShadFormField,
} from '@/components/ui/form';

// ------------ Types ------------

interface FormField {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  tooltip?: Array<string>;
  link?: {
    text: string;
    to: string;
  };
  showStrength?: boolean;
}

interface AuthFormProps {
  heading: string;
  subheading?: string;
  fields: Array<FormField>;
  submitLabel: string;
  alternateLink?: { text: string; to: string; label: string };
  googleButtonLabel?: string;
  appleButtonLabel?: string;
  showGoogleButton?: boolean;
  validationSchema: z.ZodObject<any> | z.ZodEffects<z.ZodObject<any>>;
  onSubmit: (values: any) => void;
  className?: string;
}

// ------------ Component ------------

export function AuthForm({
  heading,
  subheading,
  fields,
  submitLabel,
  alternateLink,
  googleButtonLabel,
  appleButtonLabel,
  showGoogleButton = false,
  validationSchema,
  onSubmit,
  className,
}: AuthFormProps) {
  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: fields.reduce(
      (acc, field) => {
        acc[field.id] = '';
        return acc;
      },
      {} as Record<string, string>,
    ),
  });

  const { t } = useTranslation('auth');

  return (
    <Card className='bg-background'>
      <CardHeader className='text-center'>
        <CardTitle className='text-xl capitalize'>{heading}</CardTitle>
        {subheading ? <CardDescription>{subheading}</CardDescription> : <></>}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn('flex flex-col gap-6', className)}
          >
            <div className='grid gap-6'>
              {showGoogleButton && (
                <>
                  <Button
                    variant='outline'
                    className='w-full'
                  >
                    <img
                      src='/icons/Google.svg'
                      className='h-4 w-4'
                    />
                    {googleButtonLabel}
                  </Button>
                  <Button
                    variant='outline'
                    className='w-full'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                    >
                      <path
                        d='M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701'
                        fill='currentColor'
                      />
                    </svg>
                    {appleButtonLabel}
                  </Button>
                  <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
                    <span className='bg-background text-muted-foreground relative z-10 px-2'>
                      {t('orContinueWith')}
                    </span>
                  </div>
                </>
              )}

              {fields.map(field => (
                <ShadFormField
                  key={field.id}
                  control={form.control}
                  name={field.id}
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel className='flex items-center justify-between'>
                        <span className='flex items-center'>{field.label}</span>
                        {field.link ? (
                          <Link
                            to={field.link.to}
                            className='text-sm text-black underline underline-offset-4 dark:text-white'
                            viewTransition
                          >
                            {field.link.text}
                          </Link>
                        ) : null}
                      </FormLabel>
                      <FormControl>
                        {field.id === 'password' ? (
                          <PasswordComponent
                            showStrength={field.showStrength}
                          />
                        ) : (
                          <Input
                            type={field.type}
                            placeholder={field.placeholder}
                            {...formField}
                          />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              <Button
                type='submit'
                className='w-full'
              >
                {submitLabel}
              </Button>
            </div>

            {alternateLink && (
              <div className='text-center text-sm'>
                {alternateLink.text}{' '}
                <Link
                  to={alternateLink.to}
                  className='underline underline-offset-4'
                  viewTransition
                >
                  {alternateLink.label}
                </Link>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
