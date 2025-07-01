import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { AuthForm } from '@/components/auth-form';
import { ResetPasswordSchema } from '@/schemas/auth';

export const Route = createFileRoute('/auth/reset-password')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation('auth');
  const resetPasswordSchema = ResetPasswordSchema(t);

  return (
    <AuthForm
      heading={t('resetPassword')}
      fields={[
        {
          id: 'password',
          type: 'password',
          label: t('password'),
          tooltip: [
            t('minimumLength'),
            t('minimumUpper'),
            t('minimumLower'),
            t('minimumNumber'),
            t('minimumSymbol'),
          ],
        },
        {
          id: 'confirmPassword',
          type: 'password',
          label: t('confirmPassword'),
        },
      ]}
      submitLabel={t('save')}
      validationSchema={resetPasswordSchema}
      onSubmit={() => {}}
    />
  );
}
