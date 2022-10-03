import React, { useState, ChangeEvent, FC, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAllTagsContext } from "../../../context/AllTagsContext";
import { useLoginUserContext } from "../../../context/LoginUserContext";
import { useEventCreateEditDelete } from "../../../hooks/api/postPutDelete/useEventCreateEditDelete";
import { useBase64ImageUp } from "../../../hooks/api/postPutDelete/useBase64ImageUp";
import { useUser } from "../../../hooks/api/get/useUser";
import { Event } from "../../../types/api/Event";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export type EventFormList = {
  event_id?: number;
  user_id: string;
  event_name: string;
  event_image: string;
  event_note: string;
  event_deadline: string;
  event_date: string;
  event_place: string;
  event_budget: number;
  event_min_guest: number;
  event_max_guest: number;
  event_tags_id: Array<number>;
};

const schema = yup.object().shape({
  event_name: yup
    .string()
    .max(18, "イベント名は18文字以下で入力してください")
    .typeError("文字列を入力してください")
    .required("イベント名の入力は必須です"),
  event_note: yup.string().typeError("文字列を入力してください"),
  event_deadline: yup
    .string()
    .typeError("文字列を入力してください")
    .required("募集締め切りの入力は必須です")
    .matches(/^\d{4}-\d{2}-\d{2}$/, {
      message: "募集締め切りの形式が不正です",
    }),
  event_date: yup
    .string()
    .typeError("文字列を入力してください")
    .required("開催日時の入力は必須です")
    .matches(/^\d{4}-\d{2}-\d{2}$/, {
      message: "開催日時の形式が不正です",
    }),
  event_place: yup
    .string()
    .max(6, "開催場所は6文字以下で入力してください")
    .typeError("文字列を入力してください")
    .required("開催場所の入力は必須です"),
  event_budget: yup
    .number()
    .typeError("数字を入力してください")
    .integer("整数を入力してください")
    .min(0, "0以上の数字を入れてください")
    .max(100000, "100000以下の数値を入力してください")
    .required("予算の入力は必須です"),
  event_min_guest: yup
    .number()
    .typeError("数字を入力してください")
    .integer("整数を入力してください")
    .min(0, "0以上の数字を入れてください")
    .max(100, "100以下の数値を入力してください")
    .required("最小募集人数の入力は必須です"),
  event_max_guest: yup
    .number()
    .typeError("数字を入力してください")
    .integer("整数を入力してください")
    .min(0, "0以上の数字を入れてください")
    .max(100, "100以下の数値を入力してください")
    .required("最大募集人数の入力は必須です"),
  event_image: yup.string(),
  event_tags_id: yup.array().of(yup.number()),
});

type Props = {
  event?: Event;
  method: string;
};

export const EventCreateEditForm: FC<Props> = (props) => {
  const navigate = useNavigate();

  // ユーザのid等の情報とタグ情報をコンテキストから取得
  const { loginUser } = useLoginUserContext();
  const { allTags } = useAllTagsContext();

  // ユーザコンテキストの更新用関数
  const { getUser } = useUser();

  const { event, method } = props;

  const { eventCreateEditDelete } = useEventCreateEditDelete();
  const { base64ImageUp } = useBase64ImageUp();

  const [base64, setBase64] = useState<string>("");

  const checkedTag: Array<number> | undefined = event?.event_tags?.map(
    (checkd_tag) => checkd_tag.tag_id
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitSuccessful, errors },
  } = useForm<EventFormList>({
    resolver: yupResolver(schema),
    defaultValues: {
      event_name: event?.event_name ?? "",
      event_note: event?.event_note ?? "",
      event_deadline: event?.event_deadline ?? "",
      event_date: event?.event_date ?? "",
      event_place: event?.event_place ?? "",
      event_budget: event?.event_budget ?? 0,
      event_min_guest: event?.event_min_guest ?? 0,
      event_max_guest: event?.event_max_guest ?? 0,
      event_image: event?.event_image ?? "",
      event_tags_id: checkedTag ?? [],
    },
  });

  useEffect(() => {
    if (isSubmitSuccessful && method === "post") navigate("/");
    if (isSubmitSuccessful && method === "put")
      navigate(`/events/event?eventid=${event?.user_id}`, {
        state: { event_id: event?.event_id },
      });
  }, [isSubmitSuccessful]);

  useEffect(() => {
    loginUser && setValue("user_id", loginUser.user_id);
    setValue("event_id", event?.event_id);
  }, [event, loginUser]);

  const onSubmit: SubmitHandler<EventFormList> = async (
    data: EventFormList
  ) => {
    console.log("onSubmit", data);
    // イベント情報を更新
    await eventCreateEditDelete(method, data);
    // データ変更後にユーザ情報を更新
    loginUser && getUser(loginUser?.user_id);
  };

  const convertToBase64 = async (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64URI: string = reader.result as string;
      const tempBase64: string = base64URI.replace(/data:.*\/.*;base64,/, "");
      console.log(tempBase64);
      setBase64(tempBase64);
    };
  };

  const [imageFlag, setImageFlag] = useState(false);
  const [tmpUrl, setTmpUrl] = useState(event?.event_image);

  const sizeLimit = 1024 * 1024 * 1; // 制限サイズ

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file.size > sizeLimit) {
      // ファイルサイズが制限以上
      alert("ファイルサイズは1MB以下にしてください");
      setValue("event_image", "");
      return;
    }
    setImageFlag(true);
    await convertToBase64(file);
  };

  useEffect(() => {
    if (imageFlag) {
      const iconURL = uploadEventImage();
      console.log(iconURL);
      setImageFlag(false);
    }
  }, [base64]);

  const uploadEventImage = async () => {
    try {
      const azureStorageURL = await base64ImageUp(base64);
      azureStorageURL
        ? setValue("event_image", azureStorageURL)
        : setValue("event_image", "");
      setTmpUrl(azureStorageURL);
      return azureStorageURL;
    } catch {
      console.log("error");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-row items-center w-full max-w-4xl flex-wrap gap-10 gap-x-0"
      >
        {method === "put" && (
          <>
            <div className="w-full flex flex-col-reverse md:flex-row md:items-end">
              <div className="w-full md:w-1/2 text-2xl md:text-3xl font-bold border-b-2 border-black">
                イベント編集画面
              </div>
            </div>
          </>
        )}

        {method === "post" && (
          <>
            <div className="w-full flex flex-col-reverse md:flex-row md:items-end">
              <div className="w-full md:w-1/2 text-2xl md:text-3xl font-bold border-b-2 border-black">
                イベント作成画面
              </div>
            </div>
          </>
        )}

        <figure className="flex items-center justify-center w-full h-auto p-4">
          <img
            src={tmpUrl ?? `${process.env.PUBLIC_URL}/images/main_1-min.png`}
            className="h-auto max-h-64 md:max-h-full md:h-full w-auto object-contain rounded-md"
            alt="画像がないよ"
          />
          <div className="h-12 w-full">
            {errors.event_image && errors.event_image.message}
          </div>
        </figure>
        <input
          type="file"
          accept="image/*"
          name="event_image"
          // readOnly
          // className="hidden"
          onChange={handleChange}
        />

        {/* 条件付きレンダリングが必要では？ */}
        {/* 選択した時点でアップロードするのはどうかな？？ */}

        <div className="w-full flex flex-col border-2 items-center rounded-md border-gray-600 gap-10 py-10 px-2">
          <div className="flex flex-col md:flex-row md:justify-around md:items-start w-full md:w-3/4 ">
            <div className="w-1/3 p-2">イベント名</div>
            <div className="w-full">
              <input
                type="text"
                placeholder="React勉強会"
                {...register("event_name", { required: true })}
                className="border-2 border-gray-600 outline-1 outline-gray-700 p-2 w-full"
              />
              <div className="h-6 w-full text-xs text-red-500">
                {errors.event_name && errors.event_name.message}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-start md:items-start w-full md:w-3/4 ">
            <div className="w-1/3 p-2">募集文章</div>
            <div className="w-full">
              <textarea
                placeholder="募集文章を入力"
                {...register("event_note")}
                className="h-52 border-2 border-gray-600 outline-1 outline-gray-700 p-2 w-full"
              />
              <div className="h-6 w-full text-xs text-red-500">
                {errors.event_note && errors.event_note.message}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-start md:items-start w-full md:w-3/4 ">
            <div className="w-1/3 p-2">募集締め切り</div>
            <div className="w-full flex flex-col">
              <div className="w-full flex flex-row items-center">
                <input
                  type="text"
                  placeholder="2020-09-06"
                  {...register("event_deadline")}
                  className="border-2 border-gray-600 outline-1 outline-gray-700 p-2"
                />
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
              <div className="h-6 w-full text-xs text-red-500">
                {errors.event_deadline && errors.event_deadline.message}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-around md:items-start w-full md:w-3/4 ">
            <div className="w-1/3 p-2">開催日時</div>
            <div className="w-full flex flex-col">
              <div className="w-full flex flex-row items-center">
                <input
                  type="text"
                  placeholder="2020-09-15"
                  {...register("event_date")}
                  className="border-2 border-gray-600 outline-1 outline-gray-700 p-2"
                />
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
              <div className="h-6 w-full text-xs text-red-500">
                {errors.event_date && errors.event_date.message}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:justify-around md:items-start w-full md:w-3/4 ">
            <div className="w-1/3 p-2">開催場所</div>
            <div className="w-full">
              <input
                type="text"
                placeholder="オンライン"
                {...register("event_place")}
                className="border-2 border-gray-600 outline-1 outline-gray-700 p-2"
              />
              <div className="h-6 w-full text-xs text-red-500">
                {errors.event_place && errors.event_place.message}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:justify-around md:items-start w-full md:w-3/4 ">
            <div className="w-1/3 p-2">予算</div>
            <div className="w-full">
              <input
                type="number"
                placeholder="0"
                {...register("event_budget")}
                className="border-2 border-gray-600 outline-1 outline-gray-700 p-2"
              />{" "}
              円以下
              <div className="h-6 w-full text-xs text-red-500">
                {errors.event_budget && errors.event_budget.message}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-around md:items-start w-full md:w-3/4 ">
            <div className="w-1/3 p-2">タグ</div>
            <div className="w-full">
              <div className="flex flex-row flex-wrap gap-y-2">
                {/* タグを保持するもの */}
                {allTags?.map(function (tag, i) {
                  return (
                    <label key={i} className="px-4">
                      {checkedTag?.includes(tag.tag_id) ? (
                        <>
                          <input
                            {...register("event_tags_id")}
                            type="checkbox"
                            defaultChecked={true}
                            value={tag.tag_id}
                          />
                          {tag.tag_value}
                        </>
                      ) : (
                        <>
                          <input
                            {...register("event_tags_id")}
                            type="checkbox"
                            defaultChecked={false}
                            value={tag.tag_id}
                          />
                          {tag.tag_value}
                        </>
                      )}
                    </label>
                  );
                })}
                {/* <div className="w-full md:w-36">
                  <div className="w-full flex flex-row items-center justify-around py-1 px-8 bg-gray-400/80 rounded-xl ring-2 ring-gray-200 hover:cursor-pointer">
                    <span className="text-sm mx-2 font-bold">編集</span>
                  </div>
                </div> */}
              </div>
              <div className="h-6 w-full text-xs text-red-500">
                {errors.event_tags_id && errors.event_tags_id.message}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-around md:items-start w-full md:w-3/4 ">
            <div className="w-1/3 p-2">募集人数</div>
            <div className="w-full">
              <div className="flex flex-row flex-wrap gap-y-2">
                <div className="w-2/5 flex flex-row items-center">
                  <input
                    type="number"
                    placeholder="2"
                    {...register("event_min_guest")}
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
                    placeholder="6"
                    {...register("event_max_guest")}
                    className="border-2 border-gray-600 outline-1 outline-gray-700 p-2 w-2/3"
                  />
                  <div className="w-1/3 text-center">人</div>
                </div>
              </div>
              <div className="h-6 w-full text-xs text-red-500">
                <div>
                  {errors.event_min_guest && errors.event_min_guest.message}
                </div>
                <div>
                  {errors.event_max_guest && errors.event_max_guest.message}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <label>
          イベント名
          <input
            defaultValue={event?.event_name}
            {...register("event_name", { required: true })}
          />
        </label>
        {errors.event_name && (
          <span style={{ color: "red" }}>イベント名は必ず入力してください</span>
        )}
        <label>
          募集文章
          <textarea
            defaultValue={event?.event_note}
            {...register("event_note")}
          />
        </label>
        <label>
          募集締め切り
          <input
            defaultValue={event?.event_deadline}
            {...register("event_deadline")}
          />
        </label>
        <label>
          開催日時
          <input defaultValue={event?.event_date} {...register("event_date")} />
        </label>
        <label>
          開催場所
          <input
            defaultValue={event?.event_place}
            {...register("event_place")}
          />
        </label>
        <label>
          予算
          <input
            defaultValue={event?.event_budget}
            {...register("event_budget")}
          />
          <span>円</span>
        </label> */}
        {/*
        <p>タグ</p>
        {allTags?.map(function (tag, i) {
          return (
            <div key={i}>
              <label>
                {checkedTag?.includes(tag.tag_id) ? (
                  <>
                    <input
                      {...register("event_tags_id")}
                      type="checkbox"
                      defaultChecked={true}
                      value={tag.tag_id}
                    />
                    {tag.tag_value}
                  </>
                ) : (
                  <>
                    <input
                      {...register("event_tags_id")}
                      type="checkbox"
                      defaultChecked={false}
                      value={tag.tag_id}
                    />
                    {tag.tag_value}
                  </>
                )}
              </label>
            </div>
          );
        })} */}
        {/* <label>
          募集人数
          <input
            defaultValue={event?.event_min_guest}
            {...register("event_min_guest")}
          />
          <span>~</span>
          <input
            defaultValue={event?.event_max_guest}
            {...register("event_max_guest")}
          />
        </label> */}

        <div className="flex flex-row items-center justify-center w-full max-w-4xl">
          <input
            type="submit"
            className="w-1/4 rounded-md flex flex-col justify-center items-center py-8 font-bold text-xl text-white border-4 border-green-500/80 bg-green-400 hover:cursor-pointer hover:bg-green-400/70 duration-500 "
          />
        </div>
      </form>
    </>
  );
};
