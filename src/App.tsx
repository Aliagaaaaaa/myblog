import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BlogProvider } from './context/BlogContext';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { PostPage } from './pages/PostPage';

function App() {
  return (
    <BrowserRouter>
      <BlogProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post/:id" element={<PostPage />} />
          </Routes>
        </Layout>
      </BlogProvider>
    </BrowserRouter>
  );
}

export default App;