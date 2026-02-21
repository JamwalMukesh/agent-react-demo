import { Layout } from '@/shared/components';
import { Counter } from '@/features/counter';
import { AuthStatus } from '@/features/auth';

function App() {
  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Counter />
        <AuthStatus />
      </div>
    </Layout>
  );
}

export default App;
