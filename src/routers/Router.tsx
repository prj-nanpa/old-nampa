import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Login } from "../components/pages/Login";
import { Home } from "../components/pages/auth/Home";
import { Layout } from "../layout/Layout";
import { MyPage } from "../components/pages/auth/MyPage";
import { NotFound } from "../components/pages/NotFound";
import { Logout } from "../components/pages/Logout";
import { LoginUserProvider } from "../context/LoginUserContext";
import { AuthRoute } from "./AuthRoute";
import { MyPageEdit } from "../components/pages/auth/MyPageEdit";
import { FirstLogin } from "../components/pages/auth/FirstLogin";
import { EventList } from "../components/pages/auth/EventList";
import { Event } from "../components/pages/auth/Event";
import { EventEdit } from "../components/pages/auth/EventEdit";
import { EventCreate } from "../components/pages/auth/EventCreate";
import { Profile } from "../components/pages/auth/Profile";
import { HeaderLayout } from "../components/templates/HeaderLayout";
import { AllTagsProvider } from "../context/AllTagsContext";
//import { Test } from "../components/pages/Test";
import { LoginRoute } from "./LoginRoute";
import { UserInfoProvider } from "../context/UserInfoContext";

export const Router = () => {
  return (
    <LoginUserProvider>
      <AllTagsProvider>
        <UserInfoProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="login"
                element={
                  <LoginRoute component={<Login />} redirect="/"></LoginRoute>
                }
              />
              <Route path="logout" element={<Logout />} />
              {/* <Route path="test" element={<Test />} /> */}
              <Route
                path="/"
                element={
                  <AuthRoute
                    component={
                      <HeaderLayout>
                        <Layout />
                      </HeaderLayout>
                    }
                    redirect="/login"
                  />
                }
              >
                <Route index element={<Home />} />
                <Route path="welcome" element={<FirstLogin />} />
                <Route path="user" element={<Layout />}>
                  <Route index element={<Profile />} />
                  <Route path="mypage" element={<Layout />}>
                    <Route index element={<MyPage />} />
                    <Route path="edit" element={<MyPageEdit />} />
                  </Route>
                </Route>
                <Route path="events" element={<Layout />}>
                  <Route index element={<EventList />} />
                  <Route path="event" element={<Layout />}>
                    <Route index element={<Event />} />
                    <Route path="create" element={<EventCreate />} />
                    <Route path="edit" element={<EventEdit />} />
                  </Route>
                </Route>
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </UserInfoProvider>
      </AllTagsProvider>
    </LoginUserProvider>
  );
};
