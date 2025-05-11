import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import { DefaultLayout } from "./components/Layouts";
import { adminRoutes, clientRoutes, publicRoutes } from "./routers";
import { TrackProvider, useTrack } from "../src/components/Layouts/contexts/TrackProvider";

function AppWrapper() {
  const user = (() => {
    try {
      const u = JSON.parse(localStorage.getItem('user'));
      if (u && u.id) return u;
    } catch (e) {}
    return null;
  })();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user && (location.pathname === '/' || location.pathname === '')) {
      if (user.role === 0) {
        navigate('/home', { replace: true });
      } else if (user.role === 1) {
        navigate('/admin/dashboard', { replace: true });
      }
    }
  }, [user, location, navigate]);

  if (!user) {
    return (
      <div className="App">
        <Routes>
          <Route path="/*" element={(() => {
            const Page = publicRoutes[0].component;
            let Layout = DefaultLayout;
            if (publicRoutes[0].layout) {
              Layout = publicRoutes[0].layout;
            } else if (publicRoutes[0].layout === null) {
              Layout = Fragment;
            }
            return (
              <Layout>
                <Page />
              </Layout>
            );
          })()} />
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;
            if (route.layout) 
            {
              Layout = route.layout;
            }
            else if (route.layout === null) 
            {
              Layout = Fragment;
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            )
          })}
        </Routes>
      </div>
    )
  }
  else if (user.role === 0) {
    return (
      <div className="App">
        <Routes>
          {
            clientRoutes.map((route, index) => {
              const Page = route.component;
              let Layout = DefaultLayout;
              if (route.layout) {
                Layout = route.layout;
              }
              else if (route.layout === null) {
                Layout = Fragment;
              }

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              )
            })
          }
        </Routes>
      </div>
    )
  }
  else if (user.role === 1) {
    return (
      <div className="App">
        <Routes>
          {
            adminRoutes.map((route, index) => {
              const Page = route.component;
              let Layout = DefaultLayout;
              if (route.layout) {
                Layout = route.layout;
              }
              else if (route.layout === null) {
                Layout = Fragment;
              }

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              )
            })
          }
        </Routes>
      </div>
    )
  }
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}