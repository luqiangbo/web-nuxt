<template>
  <div class="page-login">
    <div class="main">
      <el-card>
        <el-form ref="ruleForm" :model="s_ruleForm" :rules="s_rules" label-position="top">
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="s_ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="s_ruleForm.password"></el-input>
          </el-form-item>
          <div class="submit">
            <el-button type="primary" @click="onLogin">
              登录
            </el-button>
          </div>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'PageLogin',
  data() {
    return {
      s_rules: {},
      s_ruleForm: {
        username: '', // caniuse
        password: '', // luqiangbo
      },
    }
  },
  methods: {
    to(promise) {
      return promise
        .then((data) => {
          return [null, data]
        })
        .catch((err) => [err, null])
    },
    async onLogin() {
      const [err, res] = await this.to(
        this.$auth.loginWith('local', {
          data: qs.stringify(this.s_ruleForm),
        }),
      )
      const { errorCode, errorMsg } = res.data
      if (errorCode !== 0) {
        this.$message.error(errorMsg)
        return false
      }
      this.$auth.setUser(res.data.data)
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss">
.page-login {
  display: flex;
  justify-content: center;
  align-items: center;
  .main {
    padding-top: 100px;
    width: 500px;
  }
  .submit {
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>
