export interface inputInfo {
  username: (
    | {
        required: boolean;
        message: string;
        trigger: string;
        min?: undefined;
        max?: undefined;
      }
    | {
        min: number;
        max: number;
        message: string;
        trigger: string;
        required?: undefined;
      }
  )[];
  password: (
    | {
        required: boolean;
        message: string;
        trigger: string;
        min?: undefined;
        max?: undefined;
      }
    | {
        min: number;
        max: number;
        message: string;
        trigger: string;
        required?: undefined;
      }
  )[];
}

export class inputInfoData {
  rules: inputInfo = {
    username: [
      {
        required: true,
        message: "请输入用户名",
        trigger: "blur",
      },
      {
        min: 3,
        max: 10,
        message: "请输入用户名长度3-10个字符",
        trigger: "blur",
      },
    ],
    password: [
      {
        required: true,
        message: "请输入密码",
        trigger: "blur",
      },
      {
        min: 3,
        max: 10,
        message: "请输入密码长度3-10个字符",
        trigger: "blur",
      },
    ],
  };
}
