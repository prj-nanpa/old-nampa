import React, { Suspense, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { SearchEventList } from "../../../types/react-hook-form/SearchEventList";
import {
  EventApi,
  useEventSearch,
} from "../../../hooks/api/get/useEventSearch";
import { useAllTagsContext } from "../../../context/AllTagsContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EventSearchResult } from "./EventSearchResult";

type Props = {
  setEvents: React.Dispatch<React.SetStateAction<EventApi | undefined>>;
  eventData?: EventApi;
  genreData?: SearchEventList;
};

// yup スキーマ定義
const schema = yup.object().shape({
  tagsid: yup
    .array()
    .of(yup.number())
    .nullable()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  budget: yup
    .number()
    .typeError("数値を入力してください")
    .integer()
    .min(0, "0以上の数字を入力してください")
    .max(100000, "100000以下の数値を入力してください")
    .nullable()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  minguest: yup
    .number()
    .typeError("数値を入力してください")
    .integer()
    .min(0, "0以上の数字を入れてください")
    .max(100, "100以下の数値を入力してください")
    .nullable()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  maxguest: yup
    .number()
    .typeError("数値を入力してください")
    .integer()
    .min(0, "0以上の数字を入れてください")
    .max(100, "100以下の数値を入力してください")
    .nullable()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  fromdate: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, { message: "検索開始日付の形式が不正です" })
    .nullable()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  todate: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, { message: "検索終了日付の形式が不正です" })
    .nullable()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
});

export const EventSerchForm = (props: Props) => {
  const { allTags } = useAllTagsContext();
  const { setEvents, genreData, eventData } = props;

  const { getSearchEvents } = useEventSearch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchEventList>({
    resolver: yupResolver(schema),
    defaultValues: {
      tagsid: [],
    },
  });

  // はじめは0ページから
  const [page, setPage] = useState(0);

  const onSubmit: SubmitHandler<SearchEventList> = async (data) => {
    console.log("onSubmit", data);
    setSearchData(data);
    setSearchState(false);
    // const eventsdata = await getSearchEvents(data);
    // setEvents(eventsdata);
  };

  // const genreEventSet = async (genreData?: SearchEventList) => {
  //   const eventsdata = await getSearchEvents(genreData);
  //   setEvents(eventsdata);
  // };

  // useEffect(() => {
  //   genreEventSet(genreData);
  // }, [genreData]);

  // 前の9件を表示する
  const onClickBack = () => {
    setPage(page - 1);
    setSearchState(false);
  };

  // 前の9件を表示する
  const onClickNext = () => {
    setPage(page + 1);
    setSearchState(false);
  };

  // 初期レンダリング時
  const [state, setState] = useState<boolean>(false);
  // 検索ボタンが押された時
  const [searchState, setSearchState] = useState<boolean>(true);
  // 検索後のデータを保存
  const [searchData, setSearchData] = useState<SearchEventList>();

  const TestComponent = () => {
    if (!state) {
      throw getSearchEvents(genreData, page).then(
        (value: EventApi | undefined) => {
          setEvents(value);
          setState(true);
        }
      );
    }
    if (!searchState) {
      throw getSearchEvents(searchData, page).then(
        (value: EventApi | undefined) => {
          setEvents(value);
          setSearchState(true);
        }
      );
    }

    return (
      <>
        <EventSearchResult events={eventData?.events} />
      </>
    );
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-3/4 m-2 p-4 gap-4 shadow-xl rounded max-w-4xl md:flex-row md:flex-wrap md:w-auto md:gap-0 md:gap-y-6 my-10"
      >
        <div className="flex flex-col justify-center w-full text-xl md:w-full gap-1">
          <div className="font-bold">タグ</div>
          <div className="flex flex-row flex-wrap gap-y-2">
            {/* タグの表示 */}
            {genreData ? (
              <>
                {/* <p>stateでタグが渡された</p> */}
                {allTags?.map((alltag) => {
                  return (
                    <>
                      {genreData.tagsid &&
                      genreData.tagsid.includes(alltag.tag_id) ? (
                        // (tag.tag_id === genreData.tagsid[0]) ? (
                        <>
                          <label key={alltag.tag_id} className="px-4">
                            <input
                              type="checkbox"
                              {...register("tagsid")}
                              value={alltag.tag_id}
                              defaultChecked={true}
                            />
                            {alltag.tag_value}
                          </label>
                        </>
                      ) : (
                        <>
                          <label key={alltag.tag_id} className="px-4">
                            <input
                              type="checkbox"
                              {...register("tagsid")}
                              value={alltag.tag_id}
                              defaultChecked={false}
                            />
                            {alltag.tag_value}
                          </label>
                        </>
                      )}
                    </>
                  );
                })}
              </>
            ) : (
              <>
                {/* <p>stateでタグが渡されてない</p> */}
                {allTags?.map((tag) => (
                  <label key={tag.tag_id} className="px-4">
                    <input
                      type="checkbox"
                      {...register("tagsid")}
                      value={tag.tag_id}
                      defaultChecked={false}
                    />
                    {tag.tag_value}
                  </label>
                ))}
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center w-full text-xl md:w-1/2 gap-1">
          <div className="font-bold">募集人数</div>
          <div className="flex flex-row flex-wrap gap-y-2">
            <div className="w-2/5 flex flex-row items-center">
              <input
                type="number"
                placeholder="0"
                {...register("minguest")}
                className="border-2 border-gray-600 outline-1 outline-gray-700 p-2 w-2/3"
              />
              <div className="w-1/3 text-center">人</div>
            </div>
            <div className="w-1/5 flex flex-row items-center justify-center text-4xl">
              ～
            </div>
            <div className="w-2/5 flex flex-row items-center">
              <input
                type="number"
                placeholder="5"
                {...register("maxguest")}
                className="border-2 border-gray-600 outline-1 outline-gray-700 p-2 w-2/3"
              />
              <div className="w-1/3 text-center">人</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center w-full text-xl md:w-1/2 gap-1">
          <div className="font-bold">予算</div>
          <div className="flex flex-row flex-wrap gap-y-2 justify-center items-center">
            <input
              type="number"
              placeholder="2000"
              {...register("budget")}
              className="border-2 border-gray-600 outline-1 outline-gray-700 p-2 w-2/3"
            />
            <div>円以下</div>
          </div>
        </div>

        <div className="flex flex-col justify-center w-full text-xl md:w-1/2 gap-1">
          <div className="font-bold">日程</div>
          <div className="flex flex-row flex-wrap gap-y-2">
            <div className="w-2/5 flex flex-row items-center">
              <input
                type="text"
                placeholder="2022-10-25"
                {...register("fromdate")}
                className="border-2 border-gray-600 outline-1 outline-gray-700 p-2 w-2/3"
              />
              <div className="w-1/3 flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="w-1/5 flex flex-row items-center justify-center text-4xl">
              ～
            </div>
            <div className="w-2/5 flex flex-row items-center">
              <input
                type="text"
                placeholder="2022-10-30"
                {...register("todate")}
                className="border-2 border-gray-600 outline-1 outline-gray-700 p-2 w-2/3"
              />
              <div className="w-1/3 flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center w-full text-xl md:items-end">
          <label className="w-full flex flex-row items-center justify-center py-4 px-8 bg-gray-300 rounded-xl ring-2 ring-gray-200 md:w-36 hover:cursor-pointer hover:bg-gray-400/70 duration-500">
            <span className="text-sm mx-2 font-bold">検索</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <input type="submit" className="hidden" />
          </label>
        </div>

        {/* フォームの入力エラー */}
        {errors.tagsid && errors.tagsid.message}
        {errors.budget && errors.budget.message}
        {errors.minguest && errors.minguest.message}
        {errors.maxguest && errors.maxguest.message}
        {errors.fromdate && errors.fromdate.message}
        {errors.todate && errors.todate.message}
      </form>

      <Suspense
        fallback={
          <div className="fixed top-0 left-0 h-screen w-screen bg-gray-400/50 flex justify-center items-center">
            <div className="animate-spin h-20 w-20 border-4 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
        }
      >
        <div className="flex flex-col gap-8">
          <TestComponent />
          <div className="flex justify-between w-full">
            {page < 1 ? (
              //ページが0ページ目以下のときボタンを無効化
              <>
                <button
                  className="form-input hover:bg-white"
                  onClick={onClickBack}
                  disabled
                >
                  前の9件
                </button>
              </>
            ) : (
              <>
                <button className="form-input" onClick={onClickBack}>
                  前の9件
                </button>
              </>
            )}
            {eventData?.event_length && (
              <p>
                {page + 1}/{Math.ceil(eventData?.event_length / 9)}
              </p>
            )}

            {eventData?.event_length &&
            Math.ceil(eventData.event_length / 9) > page + 1 ? (
              <>
                <button className="form-input" onClick={onClickNext}>
                  次の9件
                </button>
              </>
            ) : (
              <>
                <button
                  className="form-input hover:bg-white"
                  onClick={onClickNext}
                  disabled
                >
                  次の9件
                </button>
              </>
            )}
          </div>
        </div>
      </Suspense>
    </>
  );
};
