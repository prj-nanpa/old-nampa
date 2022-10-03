import React from "react";
import { memo, FC, ReactNode } from "react";

import { Header } from "../organisms/layouts/Header";

type Props = {
  children: ReactNode; //ReactNodeはreaturn内のタグで囲った要素
};

export const HeaderLayout: FC<Props> = memo((props: Props) => {
  const { children } = props;

  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center my-10">
        <div className="w-full max-w-4xl flex flex-col items-center gap-20">
          {children}
        </div>
      </main>
    </>
  );
});

HeaderLayout.displayName = "HeaderLayout";
