<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" />
    <!-- /导航栏 -->

    <!-- 登录表单 -->
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        required
        clearable
        label="手机号"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        type="number"
        label="验证码"
        placeholder="请输入验证码"
        required
        :rules="userFormRules.code"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <van-count-down
          v-if="isCountDownShow"
          slot="button"
          :time="1000 * 5"
          format="ss s"
          @finish="isCountDownShow = false"
        />
        <van-button
          v-else
          slot="button"
          size="small"
          type="primary"
          round
          @click="onSendSms"
          >发送验证码</van-button
        >
        >
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
    user：{{ $store.state.user }}
  </div>
</template>

<script>
import { login, getSmsCode } from "@/api/user";

export default {
  name: "LoginIndex",
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: "18310602501",
        code: "246810",
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: "手机号格式错误",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
      isCountDownShow: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onSendSms() {
      // 1. 校验手机号
      try {
        let res = await this.$refs.loginForm.validate("mobile");
      } catch (err) {
        return console.log("验证失败", err);
      }

      // 2. 验证通过，显示倒计时
      this.isCountDownShow = true;
      // 3. 请求发送验证码
      try {
        // 接受响应成功的数据，如果接口响应失败了，那么就会进入到catch里面
        let res = await getSmsCode(this.user.mobile);
        console.log('进入try',res);
        this.$toast("发送成功");
      } catch (err) {
        console.log('进入catch',err);
        // 发送失败，关闭倒计时
        this.isCountDownShow = false;
        if (!err.response) {
          this.$toast("网络繁忙，请稍后重试"); 
          return
        }
        if (err.response?.status === 429) {
          this.$toast(err.response.data.message);
          return
        }
        console.log(44444);
      }
    },
    async onSubmit() {
      // 开始转圈圈
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: "登录中...", // 提示消息
      });
      console.log("submit", this.user);
      try {
        const {
          data: { data },
        } = await login(this.user);
        // 登录成功后把接口返回的token信息存入vuex中
        this.$store.commit("setUser", data);
        this.$toast.success("登录成功");
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail("登录失败，手机号或验证码错误");
        }
        this.$toast.fail("登录失败，手机号或验证码错误");
      }
    },
  },
};
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 162px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
