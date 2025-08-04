"use client";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginForm, ProFormText } from "@ant-design/pro-components";
import React from "react";
import Link from "next/link";
import { userRegisterUsingPost } from "@/api/userController";
import { message } from "antd";
import { ProForm } from "@ant-design/pro-form/lib";
import { useRouter } from "next/navigation";

/**
 * 用户注册页面
 */
const UserRegisterPage: React.FC = () => {
  const [form] = ProForm.useForm();
  const router = useRouter();

  const doSubmit = async (values: API.UserLoginRequest) => {
    try {
      const res = await userRegisterUsingPost(values);
      if (res.data) {
        message.success("注册成功");
        //前往登录页
        router.replace("/user/login");
        form.resetFields();
      }
    } catch (e: any) {
      message.error("注册失败，" + e.message);
    }
  };

  return (
    <div id={"UserRegisterPage"}>
      <LoginForm
        form={form}
        logo={<img src="/assets/logo.png" alt="logo" height={44} width={44} />}
        title="jmu-cs用户注册页面"
        subTitle="jmu-cs交流平台"
        submitter={{ searchConfig: { submitText: "注册" } }}
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
        <ProFormText.Password
          name="checkPassword"
          fieldProps={{
            size: "large",
            prefix: <LockOutlined className={"prefixIcon"} />,
          }}
          placeholder={"确认密码"}
          rules={[
            {
              required: true,
              message: "请输入确认密码！",
            },
          ]}
        />
        <div
          style={{
            marginBlockEnd: 24,
            textAlign: "right",
          }}
        >
          已有账号？
          <Link href={"/user/register"}>去登录</Link>
        </div>
      </LoginForm>
    </div>
  );
};

export default UserRegisterPage;
