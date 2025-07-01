import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { AuthForm } from '@/components/auth-form';
import { ForgotPasswordSchema } from '@/schemas/auth';

export const Route = createFileRoute('/auth/forgot-password')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation('auth');
  const forgotPasswordSchema = ForgotPasswordSchema(t);

  return (
    <AuthForm
      heading={t('forgotPassword')}
      subheading={t('subheading3')}
      fields={[
        {
          id: 'email',
          type: 'email',
          label: t('email'),
          placeholder: 'you@example.com',
        },
      ]}
      submitLabel={t('sendResetLink')}
      alternateLink={{
        text: t('rememberPassword'),
        to: '/auth/login',
        label: t('goBackToLogin'),
      }}
      validationSchema={forgotPasswordSchema}
      onSubmit={() => {}}
    />
  );
}
