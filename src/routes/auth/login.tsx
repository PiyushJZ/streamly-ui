import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { AuthForm } from '@/components/auth-form';
import { LoginSchema } from '@/schemas/auth';

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation('auth');
  const loginSchema = LoginSchema(t);

  return (
    <AuthForm
      heading={t('heading')}
      subheading={t('subheading')}
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
          link: {
            text: t('forgotPassword'),
            to: '/auth/forgot-password',
          },
          showStrength: false,
        },
      ]}
      submitLabel={t('login')}
      showGoogleButton
      googleButtonLabel={t('loginWithGoogle')}
      appleButtonLabel={t('loginWithApple')}
      alternateLink={{
        text: t('noAccount'),
        to: '/auth/signup',
        label: t('signup'),
      }}
      validationSchema={loginSchema}
      onSubmit={() => {}}
    />
  );
}
