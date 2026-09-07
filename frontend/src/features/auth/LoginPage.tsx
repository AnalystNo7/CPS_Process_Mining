import { Button, Card, Checkbox, Form, Input } from 'antd';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { getErrorMessage, notifyError } from '@/lib/notify';
import { useAuthStore } from '@/stores/authStore';

interface LoginFormValues {
  username: string;
  password: string;
  use_ldap: boolean;
}

export function LoginPage() {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const from = (location.state as { from?: string } | null)?.from ?? '/projects';

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      await login(values.username, values.password, values.use_ldap);
      navigate(from, { replace: true });
    } catch (error) {
      notifyError(getErrorMessage(error, 'Неверный логин или пароль'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Card className="card login-card" styles={{ body: { padding: 28 } }}>
        <div className="login-brand">
          <h1 className="login-title">Process Mining</h1>
          <span className="login-sub">Аналитика бизнес-процессов</span>
        </div>
        <Form<LoginFormValues>
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ use_ldap: false }}
        >
          <Form.Item
            name="username"
            label="Логин"
            rules={[{ required: true, message: 'Введите логин' }]}
          >
            <Input autoFocus autoComplete="username" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Пароль"
            rules={[{ required: true, message: 'Введите пароль' }]}
          >
            <Input.Password autoComplete="current-password" />
          </Form.Item>
          <Form.Item name="use_ldap" valuePropName="checked">
            <Checkbox>Войти через LDAP/AD</Checkbox>
          </Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Войти
          </Button>
        </Form>
      </Card>
    </div>
  );
}
