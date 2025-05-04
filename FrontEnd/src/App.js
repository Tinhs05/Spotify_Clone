import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { DefaultLayout } from "./components/Layouts";
import { adminRoutes, clientRoutes, publicRoutes } from "./routers";
import { TrackProvider, useTrack } from "../src/components/Layouts/contexts/TrackProvider";

function App() {
  
  const user = JSON.parse(localStorage.getItem('user') || null);


  if (!user) 
  {
    return (
      <Router>
        <div className="App">
          <Routes>
            {
              publicRoutes.map((route, index) => {
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
              })
            }
          </Routes>
        </div>
      </Router>
    )
  }
  else if (user.role === 0) {
    return (
      <Router>
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
      </Router>
    )
  }
  else if (user.role === 1) {
    return (
      <Router>
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
      </Router>
    )
  }
}

export default App;