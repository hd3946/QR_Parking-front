<template>
  <div>
    <h1>test</h1>
    <img :src="Kakao" />
    <img :src="sample" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      Kakao: require("@/assets/images/kakao_login_large_narrow.png"),
      sample: require("@/assets/images/sana.gif"),
    };
  },
};
</script>

<style lang="scss" scoped></style>
