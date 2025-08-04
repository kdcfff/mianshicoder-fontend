"use client";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginForm, ProFormText } from "@ant-design/pro-components";
import React from "react";
import Link from "next/link";
import { userLoginUsingPost } from "@/api/userController";
import { message } from "antd";
import { ProForm } from "@ant-design/pro-form/lib";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setLoginUser } from "@/stores/loginUser";
import { AppDispatch } from "@/stores";
import { AxiosResponse } from "axios";

/**
 * 用户登录页面
 */
const UserLoginPage: React.FC = () => {
  const [form] = ProForm.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const doSubmit = async (values: API.UserLoginRequest) => {
    try {
      const res = await userLoginUsingPost(values);
      if (res.data) {
        message.success("登录成功");
        // 保存用户登录状态
        // @ts-ignore
        dispatch(setLoginUser(res.data));
        router.replace("/");
        form.resetFields();
      }
    } catch (e: any) {
      message.error("登录失败，" + e.message);
    }
  };

  return (
    <div id={"userLoginPage"}>
      <LoginForm
        form={form}
        logo={<img src="/assets/logo.png" alt="logo" height={44} width={44} />}
        title="jmu-cs登录页面"
        subTitle="jmu-cs交流平台"
        onFinish={doSubmit}
      >
        <ProFormText
          name="userAccount"
          fieldProps={{
            size: "large",
            prefix: <UserOutlined className={"prefixIcon"} />,
          }}
          placeholder={"账户"}
          rules={[
            {
              required: true,
              message: "请输入账户！",
            },
          ]}
        />
        <ProFormText.Password
          name="userPassword"
          fieldProps={{
            size: "large",
            prefix: <LockOutlined className={"prefixIcon"} />,
          }}
          placeholder={"密码"}
          rules={[
            {
              required: true,
              message: "请输入密码！",
            },
          ]}
        />
        <div
          style={{
            marginBlockEnd: 24,
            textAlign: "right",
          }}
        >
          没有注册？
          <Link href={"/user/register"}>去注册</Link>
        </div>
      </LoginForm>
    </div>
  );
};

export default UserLoginPage;
