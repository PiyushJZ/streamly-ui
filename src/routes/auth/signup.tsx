import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { AuthForm } from '@/components/auth-form';
import { SignupSchema } from '@/schemas/auth';

export const Route = createFileRoute('/auth/signup')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation('auth');
  const signupSchema = SignupSchema(t);

  return (
    <AuthForm
      heading={t('heading2')}
      subheading={t('subheading2')}
      fields={[
        {
          id: 'email',
          type: 'email',
          label: t('email'),
          placeholder: 'm@example.com',
        },
        {
          id: 'password',
          type: 'password',
          label: t('password'),
          showStrength: true,
        },
        {
          id: 'confirmPassword',
          type: 'password',
          label: t('confirmPassword'),
        },
      ]}
      submitLabel={t('signup')}
      showGoogleButton
      googleButtonLabel={t('signupWithGoogle')}
      appleButtonLabel={t('signupWithApple')}
      alternateLink={{
        text: t('alreadyAccount'),
        to: '/auth/login',
        label: t('login2'),
      }}
      validationSchema={signupSchema}
      onSubmit={() => {}}
    />
  );
}
