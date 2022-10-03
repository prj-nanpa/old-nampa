import React, { FC, useState, ChangeEvent, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAllTagsContext } from "../../../context/AllTagsContext";
import { useUserInfoContext } from "../../../context/UserInfoContext";
import { useUserCreateEdit } from "../../../hooks/api/postPutDelete/useUserCreateEdit";
import { useUser } from "../../../hooks/api/get/useUser";
import { useLoginUserContext } from "../../../context/LoginUserContext";
import { useBase64ImageUp } from "../../../hooks/api/postPutDelete/useBase64ImageUp";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export type UserFormEdit = {
  user_id: string;
  user_email: string;
  user_icon: string;
  user_nickname: string;
  user_coe: string;
  user_sl: string;
  user_comment: string;
  user_lineqr: string;
  user_twitterid: string;
  user_instagramid: string;
  user_facebookid: string;
  user_tags_id: Array<number>;
};

// yup スキーマ定義
export const MyPageEditSchema = yup.object().shape({
  user_nickname: yup
    .string()
    .typeError("文字列を入力してください")
    .max(15, "名前は15文字以下で入力してください")
    .required("名前の入力は必須です"),
  user_coe: yup
    .string()
    .typeError("文字列を入力してください")
    .max(15, "所属CoEは15文字以下で入力してください"),
  user_sl: yup
    .string()
    .typeError("文字列を入力してください")
    .max(15, "所属SLは15文字以下で入力してください"),
  user_comment: yup
    .string()
    .typeError("文字列を入力してください")
    .max(60, "一言自己紹介は60文字以下で入力してください"),
  user_email: yup
    .string()
    .typeError("文字列を入力してください")
    .max(35, "メールアドレスは35文字以下で入力してください")
    .email("メールアドレスの形式で入力してください")
    .required("メールアドレスの入力は必須です"),
  user_instagramid: yup
    .string()
    .typeError("文字列を入力してください")
    .max(35, "InstagramのIDは35文字以下で入力してください"),
  user_twitterid: yup
    .string()
    .typeError("文字列を入力してください")
    .max(35, "twitterのidは35文字以下で入力してください"),
  user_facebookid: yup
    .string()
    .typeError("文字列を入力してください")
    .max(35, "facebookのIDは35文字以下で入力してください"),
  user_tags_id: yup.array().of(yup.number()),
  user_icon: yup.string(),
  user_lineqr: yup.string(),
});

export const MyPageEdit: FC = () => {
  const navigate = useNavigate();

  // image upload用のhooksの定義
  const { base64ImageUp } = useBase64ImageUp();

  // ログインユーザーの情報を取得
  const { loginUser } = useLoginUserContext();
  const { allTags } = useAllTagsContext();
  const { userInfo } = useUserInfoContext();

  // ユーザー情報更新のためのhooksを定義
  const { getUser } = useUser();

  const checkedTag: Array<number | undefined> | undefined =
    userInfo?.user_tags?.map((checkd_tag) => checkd_tag.tag_id);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitSuccessful, errors },
  } = useForm<UserFormEdit>({
    resolver: yupResolver(MyPageEditSchema),
    defaultValues: {
      user_nickname: userInfo?.user_nickname ?? "",
      user_coe: userInfo?.user_coe ?? "",
      user_sl: userInfo?.user_sl ?? "",
      user_comment: userInfo?.user_comment ?? "",
      user_email: userInfo?.user_email ?? "",
      user_instagramid: userInfo?.user_instagramid ?? "",
      user_twitterid: userInfo?.user_twitterid ?? "",
      user_facebookid: userInfo?.user_facebookid ?? "",
      user_tags_id: checkedTag ?? [],
      user_icon: userInfo?.user_icon ?? "",
      user_lineqr: userInfo?.user_lineqr ?? "",
    },
  });

  userInfo.user_id && setValue("user_id", userInfo?.user_id);

  // ユーザー編集のhooksの読み込み
  const { userCreateEdit } = useUserCreateEdit();

  const onSubmit: SubmitHandler<UserFormEdit> = async (data: UserFormEdit) => {
    // const temp: User = {
    //   ...data,
    //   user_tags_id: data.user_tags_id?.map(Number),
    // };
    await userCreateEdit("put", data);
    loginUser && getUser(loginUser?.user_id);
    console.log("data", data);
  };

  const [iconFlag, setIconFlag] = useState(false);
  const [QRFlag, setQRFlag] = useState(false);

  const [tmpUrl, setTmpUrl] = useState(userInfo?.user_icon);
  const [tmpLineUrl, setTmpLineUrl] = useState(userInfo?.user_lineqr);
  const [base64, setBase64] = useState<string>("");
  const [base64QR, setBase64QR] = useState<string>("");

  const sizeLimit = 1024 * 1024 * 1; // 制限サイズ

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const iconFile = e.target.files[0];
    if (iconFile.size > sizeLimit) {
      // ファイルサイズが制限以上
      alert("ファイルサイズは1MB以下にしてください");
      setValue("user_icon", "");
      return;
    }
    setIconFlag(true);
    await convertToBase64("icon", iconFile);
  };

  useEffect(() => {
    if (iconFlag) {
      const iconURL = uploadUserIcon();
      console.log(iconURL);
      setIconFlag(false);
    }
  }, [base64]);

  const handleChangeLine = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const lineQRFile = e.target.files[0];
    if (lineQRFile.size > sizeLimit) {
      // ファイルサイズが制限以上
      alert("ファイルサイズは1MB以下にしてください");
      setValue("user_lineqr", "");
      return;
    }
    setQRFlag(true);
    await convertToBase64("qr", lineQRFile);
  };

  useEffect(() => {
    if (QRFlag) {
      const lineQRURL = uploadLineQR();
      console.log(lineQRURL);
      setQRFlag(false);
    }
  }, [base64QR]);

  const convertToBase64 = async (key: string, file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64URI: string = reader.result as string;
      const tempBase64: string = base64URI.replace(/data:.*\/.*;base64,/, "");
      //console.log(tempBase64);
      if (key === "icon") setBase64(tempBase64);
      if (key === "qr") setBase64QR(tempBase64);
    };
  };

  const uploadUserIcon = async () => {
    try {
      const azureStorageURL = await base64ImageUp(base64);
      azureStorageURL && setValue("user_icon", azureStorageURL);
      setTmpUrl(azureStorageURL);
      return azureStorageURL;
    } catch {
      console.log("error");
    }
  };

  const uploadLineQR = async () => {
    try {
      const azureStorageURL = await base64ImageUp(base64QR);
      azureStorageURL && setValue("user_lineqr", azureStorageURL);
      setTmpLineUrl(azureStorageURL);
      return azureStorageURL;
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) navigate("/user/mypage");
  }, [isSubmitSuccessful]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-3/4 m-2 px-4 gap-1 shadow-xl rounded md:w-full max-w-4xl md:flex-row md:items-start"
      >
        <div className="flex flex-col md:w-32">
          アイコン画像
          <img src={tmpUrl} className="object-contain w-auto h-auto" alt="" />
          <input
            type="file"
            accept="image/*"
            name="user_icon"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-3">
          <div className="nameToSL flex flex-col gap-2 md:w-full md:flex-row md:flex-wrap md:gap-y-0 md:gap-x-4">
            <div className="flex flex-col justify-center w-full text-xl md:w-2/5 gap-1">
              <div className="font-bold">名前</div>
              <input
                type="text"
                placeholder="たろう"
                className="border-2 border-gray-600 outline-1 outline-gray-700 p-2"
                {...register("user_nickname", { required: true })}
              />
              <div className="h-6 w-full text-xs text-red-500">
                {errors.user_nickname && errors.user_nickname.message}
              </div>
            </div>
            <div className="flex flex-col justify-center w-full text-xl md:w-2/5 gap-1">
              <div className="font-bold">本名</div>
              <div>{userInfo?.user_name}</div>
              <div className="h-6 w-full text-xs text-red-500"></div>
            </div>
            <div className="flex flex-col justify-center w-full text-xl md:w-2/5 gap-1">
              <div className="font-bold">所属CoE</div>
              <input
                type="text"
                placeholder="エンジニア・リーダーシップ"
                {...register("user_coe")}
                className="border-2 border-gray-600 outline-1 outline-gray-700 p-2"
              />
              <div className="h-6 w-full text-xs text-red-500">
                {errors.user_coe && errors.user_coe.message}
              </div>
            </div>
            <div className="flex flex-col justify-center w-full text-xl md:w-2/5 gap-1">
              <div className="font-bold">所属SL</div>
              <input
                type="text"
                placeholder="PS"
                {...register("user_sl")}
                className="border-2 border-gray-600 outline-1 outline-gray-700 p-2"
              />
              <div className="h-6 w-full text-xs text-red-500">
                {errors.user_sl && errors.user_sl.message}
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-col justify-center w-full text-xl">
              <div className="font-bold">一言自己紹介</div>
              <textarea
                placeholder="コメントを入力"
                {...register("user_comment")}
                className="h-52 border-2 border-gray-600 outline-1 outline-gray-700 p-2"
              ></textarea>
              <div className="h-6 w-full text-xs text-red-500">
                {errors.user_comment && errors.user_comment.message}
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-col justify-center w-full text-xl gap-4">
              <div className="font-bold border-b-2 border-black">
                興味のあるタグ
              </div>
              <div className="flex flex-row flex-wrap gap-y-2">
                {/* タグの部分 */}
                {allTags?.map(function (tag, i) {
                  return (
                    <label key={i} className="px-4">
                      {checkedTag?.includes(tag.tag_id) ? (
                        <>
                          <input
                            {...register("user_tags_id")}
                            type="checkbox"
                            defaultChecked={true}
                            value={tag.tag_id}
                          />
                          {tag.tag_value}
                        </>
                      ) : (
                        <>
                          <input
                            {...register("user_tags_id")}
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
                  <button className="w-full flex flex-row items-center justify-around py-1 px-8 bg-gray-400/80 rounded-xl ring-2 ring-gray-200">
                    <span className="text-sm mx-2 font-bold">編集</span>
                  </button>
                </div> */}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-2">
            <div className="w-full">
              <div className="text-xl font-bold border-b-2 border-black">
                SNS
              </div>
              <div>
                <div className="w-full flex flex-col">
                  <div className="w-full flex justify-start items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-14 w-14 stroke-gray-700"
                      viewBox="0 0 24 24"
                      fill="#FFFFFF"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <input
                      type="text"
                      placeholder="abc@sios.com"
                      {...register("user_email")}
                      className="border-2 border-gray-600 outline-1 outline-gray-700 p-2"
                      readOnly
                    />
                  </div>
                  <div className="h-6 w-full text-xs text-red-500">
                    {errors.user_email && errors.user_email.message}
                  </div>
                </div>
                <div className="w-full flex flex-col">
                  <div className="w-full flex justify-start items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-14 w-14 stroke-gray-700"
                      viewBox="0 0 50 50"
                    >
                      <path d="M 12 3 C 7.0414839 3 3 7.0414839 3 12 L 3 38 C 3 42.958516 7.0414839 47 12 47 L 38 47 C 42.958516 47 47 42.958516 47 38 L 47 12 C 47 7.0414839 42.958516 3 38 3 L 12 3 z M 12 5 L 38 5 C 41.877484 5 45 8.1225161 45 12 L 45 38 C 45 41.877484 41.877484 45 38 45 L 12 45 C 8.1225161 45 5 41.877484 5 38 L 5 12 C 5 8.1225161 8.1225161 5 12 5 z M 38 7 C 36.904545 7 36 7.9045455 36 9 L 36 12 C 36 13.095455 36.904545 14 38 14 L 41 14 C 42.095455 14 43 13.095455 43 12 L 43 9 C 43 7.9045455 42.095455 7 41 7 L 38 7 z M 38 9 L 41 9 L 41 12 L 38 12 L 38 9 z M 25 12 C 21.331661 12 18.01623 13.540914 15.648438 16 L 8 16 A 1.0001 1.0001 0 0 0 7 17 L 7 37 C 7 40.301625 9.6983746 43 13 43 L 37 43 C 40.301625 43 43 40.301625 43 37 L 43 17 A 1.0001 1.0001 0 0 0 42 16 L 34.351562 16 C 31.98377 13.540914 28.668339 12 25 12 z M 25 14 C 31.073477 14 36 18.926523 36 25 C 36 31.073477 31.073477 36 25 36 C 18.926523 36 14 31.073477 14 25 C 14 18.926523 18.926523 14 25 14 z M 25 16 A 1.0001 1.0001 0 0 0 24.589844 16.083984 C 19.831681 16.311415 16 20.186041 16 25 C 16 29.959394 20.041635 34 25 34 C 29.958365 34 34 29.959394 34 25 C 34 20.187371 30.170385 16.313404 25.414062 16.083984 A 1.0001 1.0001 0 0 0 25 16 z M 9 18 L 14.068359 18 C 12.766308 20.024088 12 22.423973 12 25 C 12 32.158523 17.841477 38 25 38 C 32.158523 38 38 32.158523 38 25 C 38 22.423973 37.233692 20.024088 35.931641 18 L 41 18 L 41 37 C 41 39.220375 39.220375 41 37 41 L 13 41 C 10.779625 41 9 39.220375 9 37 L 9 18 z M 25 18 C 28.877635 18 32 21.121394 32 25 C 32 28.878606 28.877635 32 25 32 C 21.122365 32 18 28.878606 18 25 C 18 21.121394 21.122365 18 25 18 z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="@instagram"
                      {...register("user_instagramid")}
                      className="border-2 border-gray-600 outline-1 outline-gray-700 p-2"
                    />
                  </div>
                  <div className="h-6 w-full text-xs text-red-500">
                    {errors.user_instagramid && errors.user_instagramid.message}
                  </div>
                </div>

                <div className="w-full flex flex-col">
                  <div className="w-full flex justify-start items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-14 w-14 stroke-gray-700 fill-white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22,3.999c-0.78,0.463-2.345,1.094-3.265,1.276c-0.027,0.007-0.049,0.016-0.075,0.023c-0.813-0.802-1.927-1.299-3.16-1.299 c-2.485,0-4.5,2.015-4.5,4.5c0,0.131-0.011,0.372,0,0.5c-3.353,0-5.905-1.756-7.735-4c-0.199,0.5-0.286,1.29-0.286,2.032 c0,1.401,1.095,2.777,2.8,3.63c-0.314,0.081-0.66,0.139-1.02,0.139c-0.581,0-1.196-0.153-1.759-0.617c0,0.017,0,0.033,0,0.051 c0,1.958,2.078,3.291,3.926,3.662c-0.375,0.221-1.131,0.243-1.5,0.243c-0.26,0-1.18-0.119-1.426-0.165 c0.514,1.605,2.368,2.507,4.135,2.539c-1.382,1.084-2.341,1.486-5.171,1.486H2C3.788,19.145,6.065,20,8.347,20 C15.777,20,20,14.337,20,8.999c0-0.086-0.002-0.266-0.005-0.447C19.995,8.534,20,8.517,20,8.499c0-0.027-0.008-0.053-0.008-0.08 c-0.003-0.136-0.006-0.263-0.009-0.329c0.79-0.57,1.475-1.281,2.017-2.091c-0.725,0.322-1.503,0.538-2.32,0.636 C20.514,6.135,21.699,4.943,22,3.999z M18,8.999c0,4.08-2.957,8.399-8.466,8.943C10.28,17.413,11,16.662,11,16.662 S8,14,7.775,10.522C8.81,10.838,9.888,10.999,11,10.999h2v-2.5c0-0.001,0-0.001,0-0.001C13.002,7.118,14.12,6,15.5,6 C16.881,6,18,7.119,18,8.5C18,8.5,18,8.92,18,8.999z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="@twitter"
                      {...register("user_twitterid")}
                      className="border-2 border-gray-600 outline-1 outline-gray-700 p-2"
                    />
                  </div>
                  <div className="h-6 w-full text-xs text-red-500">
                    {errors.user_twitterid && errors.user_twitterid.message}
                  </div>
                </div>

                <div className="w-full flex flex-col">
                  <div className="w-full flex justify-start items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-14 w-14 stroke-gray-700"
                      viewBox="0 0 50 50"
                      fill="#000000"
                    >
                      <path d="M 25 3 C 12.861562 3 3 12.861562 3 25 C 3 36.019135 11.127533 45.138355 21.712891 46.728516 L 22.861328 46.902344 L 22.861328 29.566406 L 17.664062 29.566406 L 17.664062 26.046875 L 22.861328 26.046875 L 22.861328 21.373047 C 22.861328 18.494965 23.551973 16.599417 24.695312 15.410156 C 25.838652 14.220896 27.528004 13.621094 29.878906 13.621094 C 31.758714 13.621094 32.490022 13.734993 33.185547 13.820312 L 33.185547 16.701172 L 30.738281 16.701172 C 29.349697 16.701172 28.210449 17.475903 27.619141 18.507812 C 27.027832 19.539724 26.84375 20.771816 26.84375 22.027344 L 26.84375 26.044922 L 32.966797 26.044922 L 32.421875 29.564453 L 26.84375 29.564453 L 26.84375 46.929688 L 27.978516 46.775391 C 38.71434 45.319366 47 36.126845 47 25 C 47 12.861562 37.138438 3 25 3 z M 25 5 C 36.057562 5 45 13.942438 45 25 C 45 34.729791 38.035799 42.731796 28.84375 44.533203 L 28.84375 31.564453 L 34.136719 31.564453 L 35.298828 24.044922 L 28.84375 24.044922 L 28.84375 22.027344 C 28.84375 20.989871 29.033574 20.060293 29.353516 19.501953 C 29.673457 18.943614 29.981865 18.701172 30.738281 18.701172 L 35.185547 18.701172 L 35.185547 12.009766 L 34.318359 11.892578 C 33.718567 11.811418 32.349197 11.621094 29.878906 11.621094 C 27.175808 11.621094 24.855567 12.357448 23.253906 14.023438 C 21.652246 15.689426 20.861328 18.170128 20.861328 21.373047 L 20.861328 24.046875 L 15.664062 24.046875 L 15.664062 31.566406 L 20.861328 31.566406 L 20.861328 44.470703 C 11.816995 42.554813 5 34.624447 5 25 C 5 13.942438 13.942438 5 25 5 z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="@facebook"
                      {...register("user_facebookid")}
                      className="border-2 border-gray-600 outline-1 outline-gray-700 p-2"
                    />
                  </div>
                  <div className="h-6 w-full text-xs text-red-500">
                    {errors.user_facebookid && errors.user_facebookid.message}
                  </div>
                </div>
              </div>
            </div>
            {/*  画像UPLOAD部分の作成 要検討 */}

            <div className="w-full flex justify-start items-center flex-col gap-2">
              <div className="w-full border-b-2 border-black text-xl font-bold text-left">
                LINEQR
              </div>
              <img
                src={tmpLineUrl}
                className="w-1/2 h-auto object-contain"
                alt=""
              />
              <input
                type="file"
                accept="image/*"
                name="user_LineQR"
                onChange={handleChangeLine}
              />
            </div>
          </div>

          <div className="w-full my-6 flex justify-end">
            <label className="w-full flex flex-row items-center justify-center py-4 px-8 bg-gray-300 rounded-xl ring-2 ring-gray-200 md:w-36 hover:bg-gray-400/70 duration-500">
              <span className="text-sm mx-2 font-bold">送信</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
              <input type="submit" className="hidden" />
            </label>
          </div>
        </div>
        {/* フォームの入力エラー */}
        {/* {errors.user_nickname && errors.user_nickname.message}
        {errors.user_coe && errors.user_coe.message}
        {errors.user_sl && errors.user_sl.message}
        {errors.user_comment && errors.user_comment.message}
        {errors.user_email && errors.user_email.message}
        {errors.user_instagramid && errors.user_instagramid.message}
        {errors.user_twitterid && errors.user_twitterid.message}
        {errors.user_facebookid && errors.user_facebookid.message}
        {errors.user_tags_id && errors.user_tags_id.message}
        {errors.user_icon && errors.user_icon.message}
        {errors.user_lineqr && errors.user_lineqr.message} */}
      </form>
      {/* <h1>個人設定</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          アイコン
          <input
            type="file"
            accept="image/*"
            name="user_icon"
            onChange={handleChange}
          />
          <img src={tmpUrl} alt="アイコン画像" />
        </label>
        <span
          style={{ cursor: "pointer", border: "solid 1px" }}
          onClick={onClickImageUserIconUp}
        >
          UpLoad
        </span>
        <label>
          <textarea
            defaultValue={userInfo?.user_icon}
            {...register("user_icon", { required: true })}
          />
        </label>
        <label>
          名前
          <input
            defaultValue={userInfo?.user_nickname}
            {...register("user_nickname", { required: true })}
          />
        </label>
        {errors.user_name && (
          <span style={{ color: "red" }}>名前は必ず入力してください</span>
        )}
        <label>
          本名
          <input value={userInfo?.user_name} readOnly />
        </label>
        <label>
          所属CoE
          <input defaultValue={userInfo?.user_coe} {...register("user_coe")} />
        </label>
        <label>
          所属SL
          <input defaultValue={userInfo?.user_sl} {...register("user_sl")} />
        </label>
        <label>
          一言自己紹介
          <textarea
            defaultValue={userInfo?.user_comment}
            {...register("user_comment")}
          />
        </label>
        <h3>タグ</h3>
        {allTags?.map(function (tag, i) {
          return (
            <div key={i}>
              <label>
                {checkedTag?.includes(tag.tag_id) ? (
                  <>
                    <input
                      {...register("user_tags_id")}
                      type="checkbox"
                      defaultChecked={true}
                      value={tag.tag_id}
                    />
                    {tag.tag_value}
                  </>
                ) : (
                  <>
                    <input
                      {...register("user_tags_id")}
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
        })}
        <h3>SNS</h3>
        <label>
          instagram
          <input
            defaultValue={userInfo?.user_instagramid}
            {...register("user_instagramid")}
          />
        </label>
        <label>
          twitter
          <input
            defaultValue={userInfo?.user_twitterid}
            {...register("user_twitterid")}
          />
        </label>
        <label>
          facebook
          <input
            defaultValue={userInfo?.user_facebookid}
            {...register("user_facebookid")}
          />
        </label>
        <label>
          LINE QRコード
          <textarea
            defaultValue={userInfo?.user_lineqr}
            {...register("user_lineqr")}
          />
        </label>

        <label>
          LINE QRコード
          <input
            type="file"
            accept="image/*"
            name="user_lineqr"
            onChange={handleChangeLine}
          />
          <img src={tmpLineUrl} alt="アイコン画像" />
        </label>
        <span
          style={{ cursor: "pointer", border: "solid 1px" }}
          onClick={onClickImageLineQRUp}
        >
          UpLoad
        </span>
        <label>
          <textarea
            defaultValue={userInfo?.user_lineqr}
            {...register("user_lineqr")}
          />
        </label>
        {isSubmitSuccessful && (
          <>
            <p>編集が完了しました</p>
          </>
        )}
        <input type="submit" />
      </form> */}
    </>
  );
};
